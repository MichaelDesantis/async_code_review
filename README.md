## Asynchronous Code Review Lesson Plan

### Introduction:

This document serves as a quick reference of resources and code examples for an online review session I'm hosting on 10/30/2017 covering the use of Asynchronous Javascript. Also provides a template lesson plan in case any future intrsuctors wish to re-use this material.

Topics below should be followed in order.

### 01. What is sync and async? How does the event loop work?

* Ask students, "What is synchronous? What is asynchronous? What is the difference, and how do we tell them apart?" Wait a minute or two and have them share their responses.

* NodeJS allows both synchronous and asynchronous programming. As a rule of thumb, asynchronous functions return callbacks while synchronous ones return values.

* Give students this article to review later = http://www.discovermeteor.com/blog/understanding-sync-async-javascript-node/

* "Alright then, how does the event loop work? And how does this effect our code?" Give students another minute or two. Expect that very few students will have an answer for this one.

* Show students the diagram located here = https://stackoverflow.com/questions/31582672/what-is-the-different-between-javascript-event-loop-and-node-js-event-loop?noredirect=1&lq=1

* And if they haven't seen Phil Roberts Explanation yet, send them this video = https://www.youtube.com/watch?v=8aGhZQkoFbQ  

* Let's talk about the callstack and callback queue! Open 01_callstack.js Walk the students through!

* Callback queue =/= event loop! You should also know, the event loop in Node.js has a few minor differences than the event loop in Google Chrome. Node.js also has a slightly larger API for handling and dealing with event timing. (We'll dive into this a little later)

* The event loop is capable of so much more too, here is more reading on 'event driven' programming for later = http://nodesource.com/blog/understanding-the-nodejs-event-loop/ also https://medium.freecodecamp.org/understanding-node-js-event-driven-architecture-223292fcbc2d

### 02. Functions as arguments.

* Functions and function calls in JavaScript are interesting and very different than many other programming languages. In JavaScript, functions are considered 'first class citizens' which allows functions to be fed as arguments to other functions.

* Open 02_functionArgs.js and walk the students through it.

* Give students this article = https://medium.freecodecamp.org/javascript-callbacks-explained-using-minions-da272f4d9bcd

* Also this article = http://callbackhell.com/

### 03. The Node.js Standard, Error First Callbacks.

* In Node.js, it is considered standard practice to handle errors in asynchronous functions by returning them as the first argument to the current function's callback. If there is an error, the first parameter is passed an Error object with all the details. Otherwise, you can null the first parameter.

* These conventions allow you to structure your callbacks in a consistent manner. Here is some more reading for those interested = http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/

* Open and demo 03_errorFirst.js. Have the students explain each line of code.

### 04. Sync vs Async, make your returns consistent!

* It's important, for the sake or your program and other developers relying on your program, to keep your order of operations consistent even in the event of a failure. Open 04_asyncReturnsBad.js And demo the code while explaining the problem. Let the students try to figure out a solution for a few minutes.

* Now open 05_asyncReturnsGood.js and ask students to locate the difference and have them explain it to you. Demo how the order of operations is now the same regardless of whether or not the fileSize function fails!

* A function should ALWAYS be either sync or async. Do not give it the option to run both. Don't give your code a chance to break due to bad design! Imagine being the person trying to debug this, how would you react?

* Keep in mind, you should design your program to be as easy to debug as possible. If you must throw an error, be sure to throw the correct one. There are several types of errors that will help your end user quickly figure our where the error originated from. Take a look at these error types (under 'related pages') = https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

* Open 06_nodeTimers.js. Have the students make predictions!

* There are several timing events to choose from when writing your async code, but Remember, setImmediate and process.nextTick are NODE SPECIFIC TIMING EVENTS! If you're running your code in the browser, stick to setTimeout of 0. Here's an article on Node.js Timing Events if you want to dig deeper =  https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

* All this timing ties back into the event loop, if you want to dive deeper, here is an article for you = https://medium.com/the-node-js-collection/what-you-should-know-to-really-understand-the-node-js-event-loop-and-its-metrics-c4907b19da4c

### 07. Promises; Basic concept and example implementation.

* Callbacks, Promises, and Async/Await are all valid ways to handle async code. Callbacks (especially error-first) are Node.js convention. Promises and Async/Await are recent developments to the scene.

* Node and Chrome use Google's V8 engine, but other engines exist that may or may not support the new functionality (Especially Async/Await). If you're supporting older browsers or runtimes, make sure the native promise API is supported.

* Before promises existed natively, there were libraries created to allow promises to be used. Bluebird, RSVP, Q, and even jQuery are examples of these. Their promise API's are nearly identical.

* Why use promises? Promises are syntax sugar on callbacks. They allow for an easy-to-read, streamlined, consistent, simplified, and clean code. They allow us to avoid callback hell. 

* With promises in ES6, callback functions are handed off to another scope to be called once an event is complete. a promise is an eventual value.

  * In stage 1 (while waiting on request), it is in a state called pending.

  * A promise in stage 2 (when data is retrieved), It is now in state of ‘resolved’ or ‘fulfilled’. Promises kept successfully will result in a new promise being formed with a value returned by the previous callback.
    
  * A promise in stage 3 (error or rejection) Is in the stage (‘rejected’). No new promise is formed. However, you now have an event with which to handle an error. Promises really work the same as nested function calls, but make your code a lot easier to read.

  * One Benefit of Promises: Error Handling using a bunch of nested callbacks can get chaotic. Using Promises, we have a clear path to bubbling errors up and handling them appropriately. Moreover, the value of a Promise after it has been resolved/rejected is immutable - it will never change.

* Open 07_basicPromise.js and demo it to students.

* For interested students = More promises http://www.projectforrest.com/path/88

* Also https://github.com/DrkSephy/es6-cheatsheet

* And then https://github.com/mattdesl/promise-cookbook

* MOAR PROMISES! https://scotch.io/tutorials/javascript-promises-for-dummies

### Promise 'gotchas' and promise API in depth.

* The JavaScript try / catch mechanism cannot be used to intercept errors generated by asynchronous APIs. A common mistake for beginners is to try to use throw inside a Node.js style callback:
https://nodejs.org/dist/latest/docs/api/errors.html#errors_node_js_error_codes 

* Also worth noting, a promise resolves to a single value asynchronously. An observable can resolve or emit multiple values asynchronously over time.

* Promises cannot be canceled, our best quick workaround at this time is promise.race()

### Functions that allow both callbacks and promises

* When creating Async API’s in Node, many developers will assume you’re using the node.js standard, which is a callback based system. Now we have promises. But for the sake of compatibility, you can return both the promise resolve/reject AND the callback call to allow your program to work with either system. Just remember to provide a default value in case no callback is provided. Example at = https://github.com/jscomplete/advanced-nodejs/blob/master/3.1/async-promise.js

### util.promisify

### Async/await


### Core topics to hit:


### Additional Resources

* https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8#.2u43pq1ql

* https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9

* https://hackernoon.com/node8s-util-promisify-is-so-freakin-awesome-1d90c184bf44

* Roll your own Promisify Function = https://www.reddit.com/r/javascript/comments/76h0t1/node8s_utilpromisify_is_so_freakin_awesome/

* https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5

* https://certsimple.com/blog/debugging-and-troubleshooting-javascript-async-await

