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


// 3. Find the Longest Palindromic Substring
// Write a function to find the longest palindromic substring in a given string.

function longestPalindromeSubstring(s) {
    if (s.length <= 1) return s; // If string length is 1, it's already a palindrome

    let start = 0, maxLength = 0;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return [left + 1, right - left - 1]; // New start index and length
    }

    for (let i = 0; i < s.length; i++) {
        let [start1, len1] = expandAroundCenter(i, i);      // Odd-length palindrome
        let [start2, len2] = expandAroundCenter(i, i + 1);  // Even-length palindrome

        if (len1 > maxLength) {
            start = start1;
            maxLength = len1;
        }
        if (len2 > maxLength) {
            start = start2;
            maxLength = len2;
        }
    }

    return s.substring(start, start + maxLength);
}

// Test cases
console.log(longestPalindromeSubstring('babad')); // Output: "bab" or "aba"
console.log(longestPalindromeSubstring('cbbd'));  // Output: "bb"
console.log(longestPalindromeSubstring('racecar')); // Output: "racecar"
console.log(longestPalindromeSubstring('abcdefg')); // Output: "a"


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
 
function countPalindromes(s) {
    let count = 0;
    let seen = new Set(); // To track distinct palindromes based on start and end index

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            let palindrome = s.substring(left, right + 1);
            if (!seen.has(`${left}-${right}`)) {
                seen.add(`${left}-${right}`);
                count++;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // Odd-length palindromes (single character center)
        expandAroundCenter(i, i + 1); // Even-length palindromes (two-character center)
    }

    return count;
}


console.log(countPalindromes('ababa'))
console.log(countPalindromes('racecar'))
console.log(countPalindromes('aabb'))
console.log(countPalindromes('a'))
console.log(countPalindromes('abc'))

// Explanation:
// Expand Around Center Approach:
// We treat each character (odd-length) and each pair of adjacent characters (even-length) as potential centers.
// We expand outward while characters match.
// Tracking Distinct Palindromes:
// We use a Set (seen) to ensure each palindrome's start and end indices are unique.
// If a palindrome with a given start and end position has not been counted before, we add it to the set and increment the count.
// Time Complexity:
// O(n²) in the worst case (for each center, we expand up to n).
// Space Complexity: O(n²) for storing distinct palindromes.


// 7. Longest Common Prefix
// Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.

function longestCommonPrefix(strs) {
    if (strs.length === 0) return ""; // Edge case: Empty array

    strs.sort(); // Sort the array lexicographically

    let first = strs[0]; // First string (smallest lexicographically)
    let last = strs[strs.length - 1]; // Last string (largest lexicographically)
    let i = 0;

    while (i < first.length && first[i] === last[i]) {
        i++;
    }

    return first.substring(0, i);
}

// Test cases
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // Output: ""
console.log(longestCommonPrefix(["interspecies", "interstellar", "interstate"])); // Output: "inters"
console.log(longestCommonPrefix(["prefix", "prefixes", "preform"])); // Output: "pref"
console.log(longestCommonPrefix(['apple', 'banana', 'cherry'])); // Output: ""



// 8. Case Insensitive Palindrome
// Modify the palindrome function to be case insensitive, meaning it should ignore upper and lower case differences when checking for a palindrome.
function iscaseInsensitivePalindrome(str) {
    // Convert to lowercase and remove non-alphanumeric characters
    let cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Reverse the string
    let reverseStr = cleanStr.split('').reverse().join('');
    
    // Compare original and reversed strings
    return cleanStr === reverseStr;
}

// Test cases
console.log(iscaseInsensitivePalindrome('Aba')); // true
console.log(iscaseInsensitivePalindrome('Racecar')); // true
console.log(iscaseInsensitivePalindrome('Palindrome')); // false
console.log(iscaseInsensitivePalindrome('Madam')); // true
console.log(iscaseInsensitivePalindrome('Hello')); // false