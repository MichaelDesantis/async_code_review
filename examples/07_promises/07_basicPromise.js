const https = require('https');

//Basic example of callback-based https call
const sendReq = function(callback){
  //make web request
  https.get('https://jsonplaceholder.typicode.com/users',(res)=>{
    if(res.statusCode!==200){
      const err = new Error("OH GAWD! YOU KILLED THE SERVER! SHAME ON YOU!!");
      return callback(err);
    }
    //null first param, because no errors.
    callback(null,[res.headers.date,res.connection._host,res.statusCode]);
  });
};

//and here's how we run the callback.
sendReq(function(err,response){
  if(err) throw err;
  console.log(response);
});;

//now, let's re-format to use a promise instead!

//instantiate the promise, The promise takes a function with two arguments, resolve and reject.
const sendReqPromise =  new Promise((resolve,reject)=>{
  //make web request
  https.get('https://jsonplaceholder.typicode.com/users',(res)=>{
    if(res.statusCode!==200){
      //just throw the error, the .catch will come into play. 
      throw new Error("OH GAWD! YOU KILLED THE SERVER! SHAME ON YOU!!");
    }
    //if successful, pass the data forward.
    resolve([res.headers.date,res.connection._host,res.statusCode]);
  });
});

//Now we have nice flat vertical code that we can chain! We can chain a promise onto another promise onto another promise and so on and so forth. The .catch() placed at the end will catch any errors generated from the promise chain.
sendReqPromise
.then(function(data){console.log(data)})
.catch(function(err){throw err});

//Another example for good measure.
const calculationPromise = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve(1+1);
    }, 2000);
});

calculationPromise
.then(function(value){
    console.log('the answer is ' + value);
});  

