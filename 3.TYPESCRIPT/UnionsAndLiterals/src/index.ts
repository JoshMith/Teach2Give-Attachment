console.log("Unions and Literals");

// Exercise 1
export function getUsername(username: string | null) {
    if (username !== null) {
        return `User: ${username}`
    } else {
        return 'Guest'
    }
}

const result = getUsername('Alice')
console.log(result);

const result2 = getUsername(null)
console.log(result2);

// Exercise 2
export type Direction = "up" | "down" | "left" | "right";

export function move(direction: Direction, distance: number) {
    // Move the specified distance in the given direction
    console.log(`Object moved ${direction} for ${distance} kilometers`);
}
move('up', 30)
move('down', 5)

// ...........................................
// Exercise 2

// const appElement = document.getElementById('app');

// if (!appElement) {
//     throw new Error("Element with id 'app' not found");
// }

// At this point, TypeScript knows appElement is HTMLElement
// type Test = Expect<Equal<typeof appElement, HTMLElement>>;



// Narrowing
// Narrowing in TypeScript lets us take a wider type and make it narrower using runtime code.

// Narrowing with typeof
const getAlbumYear = (year: string | number) => {
    if (typeof year === 'string') {
        console.log(`The album was released in ${year.toUpperCase()}.`) // `year` is string
    } else if (typeof year === 'number') {
        console.log(`The album was released in ${year.toFixed(0)}.`) // `year` is number
    }
}
getAlbumYear(2025)
getAlbumYear("2nd,March,2024")


function validateUsername(username: string | null): boolean {
    if(username ===null){
        return false;
    }

    return username.length > 5
}

console.log(validateUsername("Joshua")); // true (length > 5)
console.log(validateUsername("John"));   // false (length <= 5)
console.log(validateUsername("abcdef")); // true (length > 5)
console.log(validateUsername(null));     // false (null case)
console.log(validateUsername(""));       // false (empty string, length = 0)
