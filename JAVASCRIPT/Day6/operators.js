// 1. Check if a String is a Palindrome
// Write a function to determine if a given string is a palindrome. A palindrome is a string that reads the same forward and backward (ignoring spaces, punctuation, and case).

function isPalindrome(str){
    let cleanedStr = str.toLowerCase().replace(/[\s,-.=?]/g, '');

    let reverseStr  = cleanedStr.split('').reverse().join('')

    console.log(cleanedStr)
    console.log(reverseStr)

    return cleanedStr === reverseStr
}
console.log(isPalindrome('A man, a plan, acanal, Panama'));//true
console.log(isPalindrome('Was it a car or a cat I saw?'));//true
console.log(isPalindrome('Hello, World'))//false
console.log(isPalindrome('Sir, I demand, I am a maid named Iris.'))//true


// 2. Reverse a String
// Write a function to reverse a given string.

function reverseString(theString){
    return theString.split('').reverse().join('')
}
console.log(reverseString('my name is Joshua'));


// // 3. Find the Longest Palindromic Substring
// // Write a function to find the longest palindromic substring in a given string.

// function longestPalindromeSubstring(s){
//     return s;
// }
// console.log(longestPalindromeSubstring('babad'))
// console.log(longestPalindromeSubstring('cbbd'))



// 4. Check if Two Strings are Anagrams
// Write a function to check if two given strings are anagrams of each other. Two strings are anagrams if they contain the same characters in the same frequency but in different orders.

function areAnagrams(str1, str2){
    str1 = str1.toLowerCase().replace(/\s+/g, '');
    str2 = str2.toLowerCase().replace(/\s+/g, '');
    // return str1 +' '+ str2
    if (str1.length !== str2.length) return false;

    return str1.split('').sort().join('') === str2.split('').sort().join('');

}
console.log(areAnagrams('Listen', 'Silent'))
console.log(areAnagrams('Hello', 'World'))
console.log(areAnagrams('Dormitory', 'Dirty room')); // Output: true


// 5. Remove Duplicates from a String
// Write a function to remove duplicate characters from a string while preserving the order of the first appearance of each character.

function removeDuplicates(str){
    let result = [];
    for(let char of str){
        if (result.indexOf(char) === -1){
            result.push(char);
        }
    }
    return result.join('')
}
console.log(removeDuplicates('programming'));
console.log(removeDuplicates('hello world'));
console.log(removeDuplicates('aaaaaaa'));
console.log(removeDuplicates('abcd'));
console.log(removeDuplicates('aabbcc'))



// 6. Count Palindromes in a String
// Write a function to count how many distinct palindromes are in a given string. A palindrome is considered distinct based on its start and end position in the string.
 


