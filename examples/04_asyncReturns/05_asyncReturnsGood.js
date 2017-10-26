const fs = require('fs');

function fileSize(fileName, callback){
  if (typeof fileName !== 'string') {
    //process.nextTick() is used to defer the call of the callback until a later time. Allowing us to preserve the call order. Likewise, instead of just throwing a generic "ERROR", you can specify a type of error like SyntaxError, ReferenceError, or in our case TypeError.
    return process.nextTick(
      callback,
      new TypeError("fileName must be a string!")
      );
   }

  fs.stat(fileName,(err,stats)=>{
    if(err) {
      return callback(err);
    }
    callback(null,stats.size);
  });
};

console.log("runs before as expected.");
//What happens when we change './bigBlob.txt' to 1 instead? How is this different than the other example?
fileSize("./bigBlob.txt", (err, size) => {
  if (err) throw err;
  console.log(`Size in KB: ${size/1024}`);
});

console.log("should also run before because async!");