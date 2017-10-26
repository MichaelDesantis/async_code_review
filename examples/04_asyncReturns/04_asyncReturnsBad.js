const fs = require('fs');

function fileSize(fileName, callback){
  if (typeof fileName !== 'string') {
    //calling the callback here directly and giving it an error.
    return callback(new Error("fileName must be a string!"));
   }

   //fs.stat is async
  fs.stat(fileName,(err,stats)=>{
    if(err) {
      return callback(err);
    }
    //success function, return stats.size to caller
    callback(null,stats.size);
  });
};

console.log("runs before as expected.");
//What happens when we change './bigBlob.txt' to 1 instead? Why does this happen?!
fileSize('./bigBlob.txt', (err, size) => {
  if (err) throw err;
  console.log(`Size in KB: ${size/1024}`);
});

console.log("should also run before because async!");