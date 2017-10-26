//simple function, takes a single argument which is a callback function.
function roulette(callback){
  //choose random number between 0-5
  let unluckyNumber = Math.floor(Math.random() * 6);
  if (unluckyNumber === 0){
    //create error
    let error = new Error("Russian Roulette is a zero-sum game, and you just lost!");
    //invoke callback! Pass error as first argument. Errors will halt the program, so there is no need to bother with other arguments/params.
    callback(error); 
  }else{
    //Successful invocation! There is no error, but we want to keep the callback style and argument order consistent. Therefore we can pass null or undefined as the first argument. (usually you should stick to null)
    callback(null,"You got lucky.");
  }
};

roulette(function(err,message){
  if (err) throw err;
  console.log(message);
});