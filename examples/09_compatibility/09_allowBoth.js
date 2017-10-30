//write a function to allow both callbacks and promises!

const fs = require('fs');
//This is our fileSize function from activity 05, but modified to allow for both methods of async handling!

//Function takes a name and a callback function. BUT, we provide a default callback of an empty function in case no callback is provided (as the case would be with a promise). This is important.
function fileSize(fileName, callback=()=>{}){
  return new Promise((resolve,reject)=>{
    if (typeof fileName !== 'string') {
      //if the file name is not a string, we have an error. Let's test and see if a callback was provided to us for use.
      if(callback.toString()==='()=>{}'){
        //if callback is our own blank function, reject the promise (while still preserving call order, of course!).
        return process.nextTick(
          reject,
          new TypeError("PROMISE = fileName must be a string!")
        );
      }else{
        //ELSE IF the callback IS PROVIDED, then run it! (and still preserve call order.) 
        return process.nextTick(
          callback,
          new TypeError("CALLBACK = fileName must be a string!")
        )
      }        
    }

//Assuming no name error, make our call to FS library (which is callback based).
    fs.stat(fileName,(err,stats)=>{
      if(err) {
        //IF error occurs, we do BOTH the reject method of promise AND run callback with the error. Remember, if we're using a promise, the callback is an empty function which runs without any effect. Allowing us to call it without throwing an error.
        reject(err);
        return callback(err);
      }
      //And on success, we also do both the resolve and callback. Once again, if we're using a promise then the callback is just empty, which allows us to run it without breaking stuff.
      resolve(stats.size);
      callback(null,stats.size);
    });
  });
};
 

//I can call it just like before. I can also error test to demonstrate the error handling is working in both cases.
fileSize("./bigBlob.txt", (err, size) => {
  if (err) throw err;
  console.log(`Size in KB: ${size/1024}`);
});

fileSize("./bigBlob.txt")
.then(size=>console.log(`Size in KB: ${size/1024}`))
.catch(err=>console.error(err));
