// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'a.txt')

fs.readFile(filePath, 'utf-8', function(err, data){
    if(err){
        console.log(err);
        return;
    }

    //split makes arr of each div
    //join joins arr to single string
    //trim trims any leading or ending spaces
    data = data.split('\n')
    .map(function(line){
        return line.split(/\s+/).join(' ').trim();
    })
    .join('\n');


    fs.writeFile(filePath, data, 'utf-8', function(err, data){
        if(err){
            console.log(err);
            return;
        }

        console.log('extra spaces removed successfully');
    })
})
