import { describe,expect,test } from '@jest/globals'
import { divide, subtract, sum } from './app'


describe('math functions module',()=>{
    // the test suite for all math functions

    test('adds 1 and 2 to equal 3',()=>{
        // Arrange ->list inputs required by function
        const num1:number = 1
        const num2:number = 2
        const expectedResult:number = 3

        // Act -> call the method
        const result = sum(num1,num2)

        // Assert -> test against what you expect
        expect(result).toBe(expectedResult)
    })

    test('subtract 3 from 5 to equal 2',()=>{
        // Arrange
        const num1:number = 5
        const num2:number = 3
        const expectedResult:number = 2

        // Act
        const result = subtract(num1,num2)

        // Assert
        expect(result).toBe(expectedResult)
    })

    test('divide 6 by 2 to equal 3',()=>{
        // Arrange
        const num1:number = 6
        const num2:number = 2
        const expectedResult:number = 3

        // Act
        const result = divide(num1,num2)

        // Assert
        expect(result).toBe(expectedResult)
    })
})