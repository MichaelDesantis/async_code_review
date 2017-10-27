const anotherPromise = (message,timer)=>{
  return new Promise((resolve,reject)=>{
    if(typeof(message)!=='string'){
     setTimeout(()=>{
      throw new TypeError("THROW UNEXPECTED TYPE ERRORS!!!!");
     },timer)
    };

    setTimeout(()=>{
      resolve(message);
      console.log(message);
    },timer)
  });
}

//the value of a resolved promise is another promise, as such you can chain a sequence of promise events onto each other quite easily.
anotherPromise("Hello! ",500)
.then(anotherPromise("It's ",1000))
.then(anotherPromise("Monday ",1500))
.then(anotherPromise("evening ",2000))
.then(anotherPromise("which ",2500))
.then(anotherPromise("is ",3000))
.then(anotherPromise("a ",3500))
.then(anotherPromise("great ",4000))
.then(anotherPromise("time ",4500))
.then(anotherPromise("to ",5000))
//.then(anotherPromise(true,5400)) //UNCOMMENT FOR LULZ!
.then(anotherPromise("learn ",5500))
.then(anotherPromise("ES6 promises! ",6000))
.catch(err=>{throw err})

//promise.all();
//promise.race();
