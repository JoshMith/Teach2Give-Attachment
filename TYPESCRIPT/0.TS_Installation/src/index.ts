console.log("Hello, TypeScript!");
console.log("I am new at Typescript. Please be kind to me!");

let names: string = "Joshua Mithamo Njeru"
names = "Golden Brown"
console.log(names);


export type Rectangle = {
    width:number;
    height:number;
}

const getRectangleArea = (rectangle: Rectangle) => {
    return rectangle.width * rectangle.height;
};

// console.log(getRectangleArea(rectangle1));

const getRectanglePerimeter = (rectangle: Rectangle) => {
    return 2 * (rectangle.width + rectangle.height);
};
