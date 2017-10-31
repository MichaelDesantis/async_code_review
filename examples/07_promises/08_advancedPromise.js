//Let's look at how promises can be chained!
const anotherPromise = (message,timer)=>{
  return new Promise((resolve,reject)=>{
    if(typeof(message)!=='string'){
     setTimeout(()=>{
      throw new TypeError("THROW UNEXPECTED TYPE ERRORS!!!!");
     },timer)
    };

    setTimeout(()=>{
      //Resolved values will be caps, so we can see the difference between a resolve and a direct call from this function itself.
      resolve(message.toUpperCase());
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
//.then(anotherPromise(true,5300)) //UNCOMMENT FOR LULZ!
.then(anotherPromise("learn ",5500))
.then(anotherPromise("ES6 promises! ",6000))
.catch(err=>{throw err})

//There are two other useful promise utilities that you should know about.
// Promise.race() and Promise.all() both take an array of promises.

const p1 = anotherPromise("first",7500);
const p2 = anotherPromise("second",8000);
const p3 = anotherPromise("third",8500);

const allTheThings = Promise.all([p1,p2,p3]);

allTheThings.then((values)=>{
  console.log(values);
});
//Notice the uppercase return. Why do the above promises not do this? Are we ever doing anything with the resolved value of the other promises? Or are we executing the code from the promise function itself?

const tortise = anotherPromise("Tortise",10000);
const hare = anotherPromise("Hare",10500);
//Promise.race is similar to Promise.all, but instead of returning all the values it only returns whatever resolves first.
const raceAesop = Promise.race([tortise,hare]);

raceAesop.then((values)=>{console.log(values)});
