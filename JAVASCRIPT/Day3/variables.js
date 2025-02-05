console.log("My Assignment")

//1. Declaring Variables
//Declare a variable age using let and assign it the value 25. 
let age = 25
console.log(age) // Output: 25

//Declare a variable schoolName using const and assign it "Greenwood High". 
const schoolName = "Greenwood High"
console.log(schoolName) // Output: Greenwood High

//Declare an empty array called studentsList. 
let studentsList = []
console.log(studentsList) // Output: []

//What is the difference between let, const, and var when declaring variables?
//'var' is used for function-scoped variables.
//'let' is used for block-scoped variables that may need to be reassigned
//'const' is used for block-scoped variables that should not be reassigned

/* 
2. Naming Conventions 
Which of the following variable names is invalid? 
let $price = 100; 
let 1stPlace = "John"; 
let _score = 89; 
let userName = "Alice"; 
*/
//let 1stPlace = "John" is invalid


/*
Why is the following variable name incorrect? 
const #taxRate = 0.16; 
*/
/*
The variable name #taxRate is incorrect because JavaScript does not allow special characters like # at the beginning of variable names (except for private fields in classes).
*/
// Rewrite this variable name to follow best practices: 
// let MyvariableNAME = "JavaScript"; 
// let myVariableName = "JavaScript";

// 3. Identifying Data Types 
// What will be the output of the following?
console.log(typeof "Hello"); //string
console.log(typeof 99); //number
console.log(typeof true); //boolean
console.log(typeof undefined); //undefined

// Identify the data types in this array: 
let data = ["Kenya", 34, false, { country: "USA" }, null]; 
//"Kenya" : string
// 34 : number 
// false : boolean 
// { country: "USA"} : object 
// null : object 

// How do you define a BigInt in JavaScript? Provide an example. 
let bigNumber = 9007199254740991n; // Notice the 'n' at the end
console.log(bigNumber); // Output: 9007199254740991n
//OR
let bigNum = BigInt(9007199254740991);
console.log(bigNum); // Output: 9007199254740991n

// 4. Objects & Arrays 
// Create an object person with properties name, age, and city. 
let person = {
    name: "Josh",
    age: 25,
    city: "Nairobi"
};
console.log(person);

// Add a new property email to the person object.
person.email = "josh@example.com";
console.log(person);

// Declare an array fruits with three fruit names. 
let fruits = ["Apple", "Banana", "Mango"];
console.log(fruits);

// Access the second item in the fruits array. 
console.log(fruits[1]); // Output: "Banana"

// 5. Type Coercion 
// What will be the output of the following? 
console.log("5" + 2); 
console.log("5" - 2);

// Convert the string "100" into a number.
let num = Number("100");
console.log(num); // Output: 100
//OR
let numb = parseInt("100");
console.log(numb); // Output: 100
//OR
let number = parseFloat("100");
console.log(number); // Output: 100
//OR
let _num = +"100";
console.log(_num); // Output: 100

// Convert the number 50 into a string. 
let str = String(50);
console.log(str); // Output: "50"
//OR
let _str = (50).toString();
console.log(_str); // Output: "50"
//OR
let $str = 50 + "";
console.log($str); // Output: "50"

// What will be the result of this operation? 
console.log(5 + true); // Output: 6



