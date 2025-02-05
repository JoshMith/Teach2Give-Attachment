import chalk from 'chalk';
console.log(chalk.blue("hello world"))

let name= 'josh'
console.log("My name is", name)

//object
//{} - empty object
let noData = {}
console.log(noData)
//to add data to object you use . notation
noData.name = "Joshua Mithamo" 
noData.univeersity = "Dekut" 
console.log(noData)

//Arrays
//[]
let isMarried = false
const info = ["Pauline Wangui", 22, "DEKUT", {idNumber:32467871, nationality:"Kenyan"}, isMarried]
console.log(info)
console.log("info is an ",typeof info)

//type coorcion
//String concatenation to an number becomes a string
console.log("5" + 3)//string concatenation
console.log("5"- 3);//numerical substraction
console.log(parseInt('56'))
console.log("56 has been parsed into a",typeof parseInt('56'))