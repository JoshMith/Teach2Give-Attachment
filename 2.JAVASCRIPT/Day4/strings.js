//JavaScript String Practice Questions 

// const { foregroundColorNames } = require("chalk");

/*
1. Check String Input 
○ Write a JavaScript function to check whether an 'input' is a string or not. 
*/
function is_string(input) {
    return typeof input === 'string';
}
console.log(is_string('w3resource')); // true 
console.log(is_string([1, 2, 4, 0])); // false 

// 2. Check Blank String 
// Write a JavaScript function to check whether a string is blank or not. 
function is_Blank(str) {
    return str.trim() === '';
}
console.log(is_Blank('')); // true 
console.log(is_Blank('abc')); // false 

// 3. String to Array of Words 
// Write a JavaScript function to split a string and convert it into an array of words.
function string_to_array(stray){
    return stray.split(' ');
}

console.log(string_to_array("Robin Singh")); // ["Robin", "Singh"] 

// 4. Extract Characters 
// ○ Write a JavaScript function to extract a specified number of characters from a string. 

function truncate_string(str, num) {
    return str.substring(0, num);
}
console.log(truncate_string("Robin Singh", 4)); // "Robi"

// 5. Abbreviate Name 
// ○ Write a JavaScript function to convert a string into abbreviated form.
function abbrev_name(name) {
    let nameArray = name.split(" ");
    if (nameArray.length > 1) {
        return nameArray[0] + " " + nameArray[1].charAt(0) + ".";
    }
    return name;
}

// Test Data
console.log(abbrev_name("Robin Singh")); // "Robin S."


// 6. Hide Email Address 
// ○ Write a JavaScript function that hides email addresses to prevent unauthorized access. 
function protect_email(email) {
    let [localPart, domainPart] = email.split("@");
    let hiddenLocalPart = localPart.slice(0, Math.min(5, localPart.length)) + '...';
    return hiddenLocalPart + "@" + domainPart;
}

// Test Data
console.log(protect_email("robin_singh@example.com")); // "robin...@example.com"

// 7. Parameterize String 
// ○ Write a JavaScript function to parameterize a string. 
function string_parameterize(location){
    return location
}
// Test Data: 
console.log(string_parameterize("Robin Singh from USA.")); // 

// 8. Capitalize First Letter 
// ○ Write a JavaScript function to capitalize the first letter of a string. 
function capitalize(str) {
    if (str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
}

// Test Data
console.log(capitalize('js string exercises')); // "Js string exercises"

function capitalize_Words(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Test Data
console.log(capitalize_Words('js string exercises day5')); // "Js String Exercises"


//10. Swap Case 
//○ Write a JavaScript function that converts uppercase letters to lowercase and vice versa. 

function swapcase(str) {
  return str.split('').map(char => {
    if (char === char.toUpperCase()) {
      return char.toLowerCase();
    } else {
      return char.toUpperCase();
    }
  }).join('');
}

//Test Data
console.log(swapcase('AaBbc')); // "aAbBC"

//11. Camelize String 
//○ Write a JavaScript function to convert a string into camel case. 

function camelize(str) {
  return str.split(' ').map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
}

//Test Data
console.log(camelize("JavaScript Exercises")); // "javaScriptExercises"

//12. Uncamelize String 
//○ Write a JavaScript function to uncamelize a string.

function uncamelize(str, separator) {
  separator = separator || ' ';
  return str.replace(/([a-z])([A-Z])/g, `$1${separator}$2`).toLowerCase();
}

console.log(uncamelize('helloWorld')); // "hello world"
console.log(uncamelize('helloWorld','-')); // "hello-world"

//13. Repeat String 
//○ Write a JavaScript function to concatenate a given string n times.

function repeat(str, times) {
  return new Array(times + 1).join(str);
}

//Test Data
console.log(repeat('Ha!', 3)); // "Ha!Ha!Ha!"

//14. Insert in String 
//○ Write a JavaScript function to insert a string within another string at a given position.

function insert(str, insertStr, position) {
  return str.slice(0, position) + insertStr + str.slice(position);
}

//Test Data
console.log(insert('We are doing some exercises.', 'JavaScript ', 18)); 
// "We are doing some JavaScript exercises."

//15. Humanize Format 
//○ Write a JavaScript function that formats a number with the correct suffix (1st, 2nd, etc.).

function humanize_format(number) {
  if (number % 100 >= 11 && number % 100 <= 13) {
    return number + 'th';
  }
  switch (number % 10) {
    case 1: return number + 'st';
    case 2: return number + 'nd';
    case 3: return number + 'rd';
    default: return number + 'th';
  }
}

//Test Data
console.log(humanize_format(301)); // "301st"
console.log(humanize_format(22));  // "22nd"
console.log(humanize_format(103)); // "103rd"
console.log(humanize_format(11));  // "11th"

//16. Truncate String with Ellipsis 
//○ Write a JavaScript function to truncate a string and append "...". Test Data:

function text_truncate(str, length, ending) {
  ending = ending || '...';
  if (str.length > length) {
    return str.substring(0, length) + ending;
  } else {
    return str;
  }
}

//Test Data
console.log(text_truncate('We are doing JS string exercises.', 15, '!!')); 
// "We are doing !!"

//17. Chop String into Chunks 
//○ Write a JavaScript function to chop a string into chunks.

function string_chop(str, size) {
  let chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

//Test Data
console.log(string_chop('w3resource', 3)); // ["w3r", "eso", "urc", "e"]

//18. Count Substring Occurrences 
//○ Write a JavaScript function to count occurrences of a substring in a string.

function countOccurrences(mainStr, subStr) {
  mainStr = mainStr.toLowerCase();
  subStr = subStr.toLowerCase();
  let count = 0;
  let pos = mainStr.indexOf(subStr);
  
  while (pos !== -1) {
    count++;
    pos = mainStr.indexOf(subStr, pos + 1);
  }
  
  return count;
}

console.log(countOccurrences("The quick brown fox jumps over the lazy dog", 'the')); 
// Output: 2

//19. Reverse Binary Representation 
//○ Write a JavaScript function that reverses the binary representation of a number and returns its decimal form.

function reverse_binary(num) {
  // Convert the number to binary and then reverse the string representation
  let reversedBinaryStr = num.toString(2).split('').reverse().join('');
  
  // Convert the reversed binary string back to a decimal number
  return parseInt(reversedBinaryStr, 2);
}

//Test Data
console.log(reverse_binary(100)); // 19

//20. Pad String to Length 
//○ Write a JavaScript function to pad a string to a specified length.

function formatted_string(pad, user_str, pad_pos) {
  if (typeof user_str === 'number') {
    user_str = user_str.toString();
  }
  if (pad_pos === 'l') {
    return (pad + user_str).slice(-pad.length);
  } else {
    return (user_str + pad).substring(0, pad.length);
  }
}

//Test Data
console.log(formatted_string('0000', 123, 'l')); // "0123"
console.log(formatted_string('0000', 123, 'r')); // "1230"
