// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

let counter = 0;

function startCounter(){
    console.log(`counter: ${counter}`);
    counter++;
    setTimeout(startCounter, 1000);
}

startCounter();

