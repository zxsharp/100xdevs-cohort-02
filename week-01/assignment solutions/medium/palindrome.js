/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  
  str = str.toLowerCase();
  let start=0, end=str.length -1;
  
  while(start < end){
    
    while((str[start].charCodeAt(0) < 65 || str[start].charCodeAt(0) > 122) || (str[start].charCodeAt(0) > 90 && str[start].charCodeAt(0) < 97))
      start++;
    while((str[end].charCodeAt(0) < 65 || str[end].charCodeAt(0) > 122) || (str[end].charCodeAt(0) > 90 && str[end].charCodeAt(0) < 97))
      end--;

    if(str[start] != str[end] )
      return false;
    start++;
    end--;
  }
  return true;
}

module.exports = isPalindrome;
