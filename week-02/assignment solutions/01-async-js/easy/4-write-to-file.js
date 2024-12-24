// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'a.txt');

const content = '*Content written by fs.writeFile*';
fs.writeFile(filePath, content, 'utf-8', function(err, data){
    if(err){
        console.log(err);
        return;
    }
    console.log('content written successfully');
})

// Alternatively fs.appendFile