global.alert = jest.fn(); 

import { checkForName } from "../src/client/js/nameChecker"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the nameChecker functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the checkForName() function", () => {
        expect(checkForName("Picard")).toBe(true);
        expect(checkForName("Janeway")).toBe(true);
        expect(checkForName("Kirk")).toBe(true);
        expect(checkForName("Archer")).toBe(true);
        expect(checkForName("Georgiou")).toBe(true);
    })

    test("Testing the checkForName() function", () => {
        expect(checkForName("Miral")).toBe(false);
        expect(checkForName("Ahmad")).toBe(false);
        expect(checkForName("who's that?")).toBe(false);
    })
});