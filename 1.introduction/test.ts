import {describe, expect, test} from '@jest/globals';
import { sum } from './sum';
import { subtract } from './subtract';


describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('subtract module', () => {
  test('adds 3 - 2 to equal 1', () => {
    expect(subtract(3,2)).toBe(1);
  });
});

describe('failing sum module', () => {
  test('adds 3 + 2 not to equal 1', () => {
    expect(sum(3,2)).not.toBe(1);
  });
});

describe('failing subtract module', () => {
  test('adds 3 - 2 not to equal 2', () => {
    expect(sum(3,2)).not.toBe(2);
  });
});