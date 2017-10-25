//You remember how parameters work right? It's just a named placeholder.

function logger(itemToLog){
  console.log(itemToLog);
};

logger(2);
logger("LumberJack");
logger(true);
//Logger doesn't care what you feed it. Within the function, they're all referred to as itemToLog anyways.

//Functions as parameters are no different!

function runArg(funcToRun){

  let exampleJson={
    name:"Michael",
    age:25,
    isProgrammer:true
  };

  funcToRun(exampleJson);
};

//We'll use these functions in a second.
function nope(someVal){
  console.log("OH NOES!");
  if(someVal.age){
    console.log(` Someone is going to be ${someVal.age+1} soon.`);
  }
}

function maxcaps(obj){
  if(obj.name){
    console.log(obj.name.toUpperCase());
  }
};

//Much like function logger, runArgs doesn't care what you feed it! It just runs whatever you feed it! 
runArg(logger);
runArg(nope);
runArg(maxcaps);

//In the runArg function, 'funcToRun' is a callback. Let's try another example to demo this.

function slowCalculation(name,callback){
  let greeting = `Hello ${name}!`;
  //running in setTimeout to emulate async behavior.
  setTimeout(()=>{
    callback(greeting); 
  },2000);

  //If demoing in browser, you can use fetch.
  /*
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(response) { return response.json(); })
    .then(function(json) {
    console.log(json);
  });
  */

};

console.log("before greeting");

slowCalculation("Mike", (response)=>{
  console.log(response);
});

console.log("after greeting");

//Note the order of operations. And remember, a callback is simply a function we provide to another function to be run at a later date. 

//On that topic, because we're passing functions to other functions (which are still functions) we can pass functions to those functions! Sometimes dealing with asynchronous code means you have a number of operations that must be run in a specific order to work correctly, but this can get out of hand very quickly. (keep in mind the below example will not run as the functions are not declared) This is called callback hell! This should be avoided!

getData(function(a){  
    getMoreData(a, function(b){
        getMoreData(b, function(c){ 
            getMoreData(c, function(d){ 
                getMoreData(d, function(e){ 
                    //etc
                });
            });
        });
    });
});
