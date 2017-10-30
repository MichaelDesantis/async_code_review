//Promisify functions!

const https = require('https');
//You may remember this basic example of callback-based https call from 07.
const sendReq = function(callback){
  https.get('https://jsonplaceholder.typicode.com/users',(res)=>{
    if(res.statusCode!==200){
      const err = new Error("OH GAWD! YOU KILLED THE SERVER! SHAME ON YOU!!");
      return callback(err);
    }
    callback(null,[res.headers.date,res.connection._host,res.statusCode]);
  });
};

//Here is a promisify function. It returns a function that, when run, returns a promise instead of a callback. It's a little difficult to read.
function promisify(functionToPromisify) {
  return function() {
    //create shallow copy of arguments passed to the function and apply them to a new array
    const args = Array.prototype.slice.call(arguments);
    //return new promise as the result of promisify function.
    return new Promise((resolve, reject) => {
      //create an error-first callback function
      const callbackFunction = function(err, result) {
        //ternary operator, use promise methods of resolve/reject to handle
        err ? reject(err) : resolve(result);
      };
      //push the callback function as last argument to 'args'. Callback should always be the last argument 
      args.push(callbackFunction);
      //Apply our arguments to original function.
      functionToPromisify.apply(undefined, args);
    });
  }
}

//sendPromiseReq is now equal to a function that will return a promise to be resolved/rejected with the values given from the internal callbackFunction.
const sendPromiseReq = promisify(sendReq);

sendPromiseReq()
.then(data=>console.log(data))
.catch(err=>console.error(err));

//Now, there's actually a better way to do this! Promisifying functions happens with enough regularity that Node now includes it in the util library.
const util = require('util');  
const sendUtilPromise = util.promisify(sendReq);
sendUtilPromise()
.then(data=>console.log(data))
.catch(err=>console.error(err));
//The nice thing about the node version is that it is much more robust and included more descriptive error messages and such. Likewise, you can guarantee consistency between your code and that of other developers. (as opposed to having everyone use different home-rolled promisify functions.) 
