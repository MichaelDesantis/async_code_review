//When an async function is called, it returns a Promise. When the async function returns a value, the Promise will be resolved with the returned value.  When the async function throws an exception or some value, the Promise will be rejected with the thrown value. (This is straight out of the documentation!)

//An async function can contain an await expression, that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the async function's execution and returns the resolved value.
const https = require('https');

const newReq = url=>{
  return new Promise((resolve,reject)=>{
    https.get(url,(res)=>{
      if(res.statusCode!==200){
        const error = new Error("OH GAWD! YOU KILLED THE SERVER! SHAME ON YOU!!");
        reject(error);
        throw error;
      }else{
        resolve([res.headers["content-type"],res.connection._host,res.statusCode]);
      }
    });
  });
};

//setup for multiple requests
const users = newReq("https://jsonplaceholder.typicode.com/users");
const posts = newReq("https://jsonplaceholder.typicode.com/posts");
const todos = newReq("https://jsonplaceholder.typicode.com/todos");

//mark function as async, can now use the 'await' keywork within the function.
const allMyData = async function(){
  let allData = await Promise.all([users,posts,todos]);
  return allData;
}

//remember, allMyData is a function. You must run it to return a promise.
allMyData()
.then(data=>console.log(data))
.catch(err=>{throw err});

//Here is another example for good measure.
const slowToResolve = time=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(2);
    },time);
  });
};

const allTimers = async ()=>{
  const timerArray = await Promise.all([slowToResolve(1000),slowToResolve(1500),slowToResolve(500)]);
  return timerArray;
}

allTimers()
.then(data=>console.log(data));

//for debugging and error catching purposes. It's common to include a try-catch when using async/await.

const getJson = ()=>{
  return new Promise((resolve,reject)=>{
    https.get("https://jsonplaceholder.typicode.com/users", function(res) {
      res.on("data", function(chunk) {
        resolve(chunk);
      });
    }).on('error', function(e) {
      reject(e);
    });
  });
};

const getDatJson = async ()=>{
  try{
    let muchJson = await getJson();
    return muchJson.toString();
  }catch(err){
    console.error(err);
  }
};

getDatJson()
.then(aWildJSON=>console.log(aWildJSON))
.catch((e)=>{console.error(e)});
