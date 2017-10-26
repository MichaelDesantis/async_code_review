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

### Promises, basic concept and implementation comparison.

### Promise example and promise API in depth.

### Functions that allow both callbacks and promises

### util.promisify

### Async/await


### Core topics to hit:

* Callbacks, Promises, and Async/Await are all valid ways to handle async code. Callbacks (especially error-first) are Node.js convention. Promises and Async/Await are recent developments to the scene.

* Node and Chrome use Google's V8 engine, but other engines exist that may or may not support the new functionality.

* The JavaScript try / catch mechanism cannot be used to intercept errors generated by asynchronous APIs. A common mistake for beginners is to try to use throw inside a Node.js style callback:
https://nodejs.org/dist/latest/docs/api/errors.html#errors_node_js_error_codes 

* When creating Async API’s in Node, many developers will assume you’re using the node.js standard, which is a callback based system. Now we have promises. But for the sake of compatibility, you can return both the promise resolve/reject AND the callback call to allow your program to work with either system. Just remember to provide a default value in case no callback is provided. Example at = https://github.com/jscomplete/advanced-nodejs/blob/master/3.1/async-promise.js

* Also worth noting, a promise resolves to a single value asynchronously. An observable can resolve or emit multiple values asynchronously over time.

### Additional Resources

* https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8#.2u43pq1ql

* https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9

* https://hackernoon.com/node8s-util-promisify-is-so-freakin-awesome-1d90c184bf44

* Roll your own Promisify Function = https://www.reddit.com/r/javascript/comments/76h0t1/node8s_utilpromisify_is_so_freakin_awesome/

* https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5

* https://certsimple.com/blog/debugging-and-troubleshooting-javascript-async-await

* More promises http://www.projectforrest.com/path/88

* https://github.com/DrkSephy/es6-cheatsheet

* https://github.com/mattdesl/promise-cookbook

* https://scotch.io/tutorials/javascript-promises-for-dummies

* https://jsonplaceholder.typicode.com/

