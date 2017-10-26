const fs = require('fs');

//Which is going to log first? Make your predictions!

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
  process.nextTick(()=>{
    console.log("nextTick");
  }); 
});