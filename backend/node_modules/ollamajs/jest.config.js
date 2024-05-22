// jest.config.js
module.exports = {
    transform: {
      "^.+\\.mjs$": "babel-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|mjs)$",
    moduleFileExtensions: ["js", "mjs"],
    // ...other configurations
  };
  