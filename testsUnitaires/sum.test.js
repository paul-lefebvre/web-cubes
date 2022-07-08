const { sum } = require("../sum");

describe("function that returns sum two parameters", () => {
  it("should return a number", () => {
    expect(sum(5, 10)).toBe(15);
  });
});
