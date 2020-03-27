module.exports = {
  verbose: true,
  testTimeout: 10000,
  roots: ["app/javascript/src", "donut/src"],
  testEnvironment: "jest-environment-jsdom-fifteen",
  moduleDirectories: ["node_modules", "app/javascript"],
  moduleNameMapper: {
    "@advisable/donut": "<rootDir>/donut/src",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/app/javascript/src/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/app/javascript/src/__mocks__/styleMock.js",
  },
  transform: {
    "^.+\\.graphql$": "jest-transform-graphql",
    "^.+\\.(js|tsx|ts)$": "babel-jest",
  },
  coverageReporters: ["html"],
  coverageDirectory: "<rootDir>/jest-coverage",
  collectCoverageFrom: ["<rootDir>/app/javascript/src/**/*.{js,tsx,ts}"],
};
