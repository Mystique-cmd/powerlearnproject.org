// __tests__/calculateTax.test.js
const calculateTax = require("../utils/calculateTax");

test("calculates tax correctly", () => {
  expect(calculateTax(100, 0.2)).toBe(20);
});
