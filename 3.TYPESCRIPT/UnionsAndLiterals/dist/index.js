"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsername = getUsername;
exports.move = move;
console.log("Unions and Literals");
// Exercise 1
function getUsername(username) {
    if (username !== null) {
        return `User: ${username}`;
    }
    else {
        return 'Guest';
    }
}
const result = getUsername('Alice');
console.log(result);
const result2 = getUsername(null);
console.log(result2);
function move(direction, distance) {
    // Move the specified distance in the given direction
    console.log(`Object moved ${direction} for ${distance} kilometers`);
}
move('up', 30);
move('down', 5);
// ...........................................
// Exercise 2
const appElement = document.getElementById('app');
if (!appElement) {
    throw new Error("Element with id 'app' not found");
}
// At this point, TypeScript knows appElement is HTMLElement
// type Test = Expect<Equal<typeof appElement, HTMLElement>>;
