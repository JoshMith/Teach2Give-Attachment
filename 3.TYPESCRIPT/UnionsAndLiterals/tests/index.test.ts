import { getUsername, move } from "../src/index"; // Ensure the functions are exported from `index.ts`

describe("getUsername function", () => {
    test("should return 'User: Alice' when given 'Alice'", () => {
        expect(getUsername("Alice")).toBe("User: Alice");
    });

    test("should return 'Guest' when given null", () => {
        expect(getUsername(null)).toBe("Guest");
    });
});

describe("move function", () => {
    test("should log correct message when moving up", () => {
        console.log = jest.fn(); // Mock console.log

        move("up", 30);
        expect(console.log).toHaveBeenCalledWith("Object moved up for 30 kilometers");
    });

    test("should log correct message when moving down", () => {
        console.log = jest.fn();

        move("down", 5);
        expect(console.log).toHaveBeenCalledWith("Object moved down for 5 kilometers");
    });
});

