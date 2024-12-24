// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

let date;
let time;

setInterval(function(){
    date = new Date();
    
    let hours = date.getHours();
    if(hours >= 12){
        hours -= 12;
        time = 'PM'
    }
    else time = 'AM'

    console.log(`${hours}:${date.getMinutes()}::${date.getSeconds()} ${time}`);
}, 1000);
