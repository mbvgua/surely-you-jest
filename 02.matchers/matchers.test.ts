import { sum,dummyFunc } from "./matchers"

// COMMON MATCHERS
describe('common matchers',()=>{
    test('sum of 1 and 1 equals 2',()=>{
        // Act
        const num1:number = 1
        const num2:number = 1
        const result:number = 2

        // Arrange
        const expectedResult = sum(num1,num2)

        // Assert
        expect(expectedResult).toBe(result)
    })

    test('object assignment',()=>{
        // Act
        // Arrange
        // Assert
    })
})




/*
// EXACT EQUALITY
describe('test for exact equality',()=>{

    // Primitive types
    test('sum of 2 and 3 equals 5',()=>{
        // Act
        const num1:number = 2
        const num2:number = 3
        const expectedResult:number = 5

        // Arrange
        const result = sum(num1,num2)

        // Assert
        expect(result).toBe(expectedResult)
    })

    // Reference types
    test('see if arrays match',()=>{
        // Act
        const numArray:Array<number> = [1,2,3]
        const expectedResult:Array<number> = [1,2,3]

        // Assert
        // expect(numArray).toBe(expectedResult) => will fail
        expect(numArray).toEqual(expectedResult)
    })
})

// NOT
describe('test for false value',()=>{
    test('negate result ot get passing test',()=>{
        const num1: number = 1
        const num2: number = 1
        const expectedResult: number = 2
        const falseResult: number = 11

        const result:number = sum(num1,num2)

        expect(result).not.toBe(falseResult)
    })
})

// TRUTHINESS
describe('distinguish between undefined,defined,null,true and false values',()=>{
    test('see if a value is null', () => {
        const n = null

        expect(n).toBeNull()
        expect(n).toBeDefined()
        expect(n).not.toBeUndefined()
        expect(n).not.toBeTruthy()
        expect(n).toBeFalsy()
      })
      
      test('see if zero is null', () => {
        const z = 0

        expect(z).not.toBeNull()
        expect(z).toBeDefined()
        expect(z).not.toBeUndefined()
        expect(z).not.toBeTruthy()
        expect(z).toBeFalsy()
      })

})

// NUMBERS
describe('testing for numbers',()=>{
    test('greater than,less than, equal to, close to in numbers',()=>{

        expect(sum(2,3)).not.toBe(4)
        expect(sum(2,3)).toBeGreaterThan(4)
        expect(sum(2,3)).toBeGreaterThanOrEqual(4)
        expect(sum(2,3)).toBeGreaterThanOrEqual(5)
        expect(sum(2,3)).toBeLessThan(6)
        expect(sum(2,3)).toBeLessThanOrEqual(6)

        expect(sum(2,2)).toBe(4)
        expect(sum(2,2)).toEqual(4)

        expect(sum(2.5,2.5)).toBeCloseTo(5)

    })
})

// STRING MATCHING
describe('string matching',()=>{
    test('see if there is an I in team',()=>{
        expect('team').not.toMatch(/i/)
    })
})

// ARRAYS AND ITERABLES
describe('check for values in an object or iterable',()=>{

    const myBooks:Array<string | number> = [
        'The Kite runner',
        'Dont Let Me Go',
        'The Passage',
        'The Lion,The Witch and The Wardrobe',
        1984    
    ]

    test('see if i can find a specific book in my array',()=>{
        expect(myBooks).toContain(1984)
        expect(myBooks).toContain('Dont Let Me Go')
        // expect(myBooks).toContain(/Dont/) //=> test fails. must have complete word
        // expect(myBooks).toContain(/^Dont$/) //=> test fails. must have complete word
    })
})

// ERRORS THROWN
describe('testing for errors thrown',()=>{
    
    test('see if functions throws error',()=>{
        expect(()=> dummyFunc()).toThrow()
    })
    
    test('match error object thrown',()=>{
        expect(()=> dummyFunc()).toThrow(Error)
    })

    test('match exact error message thrown with string',()=>{
        expect(()=> dummyFunc()).toThrow('Oops! Wrong input')   //match exact input
        expect(()=> dummyFunc()).not.toThrow('Oopsies! Wrong input')   //match exact input
    })

    test('see if error message contains certian word with regex',()=>{
        expect(()=> dummyFunc()).toThrow(/Oops/)    //match input with regex
        expect(()=> dummyFunc()).not.toThrow(/Oopsies/)    //match input with regex
    })

    test('match exact error message thrown with regex',()=>{
        expect(()=> dummyFunc()).toThrow(/^Oops! Wrong input$/)    //match exact input with regex
        expect(()=> dummyFunc()).not.toThrow(/^Wrong input$/)    //match exact input with regex
    })
})

*/
