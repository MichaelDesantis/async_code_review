//Here is an example of the call stack. Run this snippet in your browser or node.

let d = ()=>{
  throw new Error("the callstack is shown below");
}

let c = ()=>{
  return d();
}

let b = ()=>{
  return c();
}

let a = ()=>{
  return b();
}

a();

//Here's what's happening. Function 'a' is the base of the stack, it is awaiting the values from function b, which is awaiting the value from function c, which is awaiting the value of function d. If this goes indefinitely, you have a 'stack overflow'. AKA, you've run out of available memory!

//Here is a visual guide.
      //d 
    //c
  //b
//a

//The call stack dictates the order of operations to be run. A stack is a common data structure that, much like a stack of plates, the top item or task is removed first. Last in, first out! The bottom task must have all above tasks finish running before it can run.

//Now, let's go over the event queue.

let dd = ()=>{
  throw new Error("SURPRISE!!");
}

let cc = ()=>{
  return dd();
}

let bb = ()=>{
  return cc();
}

let aa = ()=>{
  return bb();
}

console.log("I happen first!");
setTimeout(()=>{console.log("time of 2000 milliseconds")},2000);
setTimeout(()=>{console.log("time of 0 milliseconds!")},0);
setTimeout(()=>{console.log("time of 500 milliseconds")},500);
aa();


//What order will this log? Not what you were expecting was it? Let's look into why it runs in the order it does. 

//Step 1 = the "I happen first" runs. It's a direct call to a synchronous function. No surprise here.

//Step 2 = set a timeout for 2000 milliseconds. It removes this function from the call stack and places it into the 'event queue'. The event queue is where events scheduled to run at a later date are placed. This delegation of responsibility from the call stack to the event queue allows your JavaScript to continue to run. Remember! JavaScript is single threaded! If it didn't delegate the function away, it would be forced to sit and wait until the function returned a value or finished running to resume executing the rest of our code. (which in our case is a minimum of a full 2 seconds!)

//Step 3 = set a timeout for 0 milliseconds. But this doesn't run immediately! It gets added to the event queue scheduling it for later, allowing us to continue our program forward. The Event queue ONLY BEGINS TO RUN SCHEDULED FUNCTIONS WHEN THE CALL STACK IS CLEAR!

//Step 4 = set a timeout for 500 milliseconds.

//Step 5 = invoke function aa! Function aa, must await function bb and so on. Just like the previous example. Function aa is synchronous and blocking! It takes time to complete! Everything after aa is placed on hold until aa is finished running. 

//Here is a visual timeline.
  // "I happen first!" Runs immediately.
  // setTimeout of 2000 ---->>>> OFF TO THE QUEUE WITH YOU!
  // setTimeout of 0 ---->>>> OFF TO THE QUEUE WITH YOU!
  // setTimeout of 500 ---->>>> OFF TO THE QUEUE WITH YOU!
  // aa runs bb runs cc runs dd, dd throws error, error returns to cc, returns to bb, returns to aa, returns to global/window root environment.
  // "time of 0 milliseconds" <<<<---- BACK FROM THE QUEUE!
  // "time of 500 milliseconds" <<<<---- BACK FROM THE QUEUE!
  // "time of 2000 milliseconds" <<<<---- BACK FROM THE QUEUE!

// We mentioned "synchronous", "blocking", and "single threaded". Maybe this example will help.

//Here is a looooong calculation.
let omg2 = ()=>{
  let sum=0;
  //loop a ridiculous number of times.
  for(let i=0;i<1e9;i++){
    sum+=i;
  }
  //do something.
  console.log(sum);
  return sum;
};

//this function awaits omg2();
let omg = ()=>{
  let result = omg2();
  return result;
};

//Yep! JavaScript is synchronous! Because the only available thread is busy, "after" MUST wait until the omg ridiculous loop is finished. Function omg is 'blocking' "after" from running!

console.log("before");
omg();
console.log("after");





