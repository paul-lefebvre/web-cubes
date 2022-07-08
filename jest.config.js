const path = require("path");

module.exports = {
  roots: ["."],
  rootDir: ".",
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/",
  ],
  testPathIgnorePatterns: [
    path.join("tests__e2e"),
    "node_modules",
    ".next",
    "pages",
  ],
  transformIgnorePatterns: ["node_modules"],
  coverageReporters: ["html", "text-summary"],
  transform: {
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      { configFile: "./testsUnitaires/babel.config.js" },
    ],
  },
};
