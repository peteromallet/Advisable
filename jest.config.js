module.exports = {
  verbose: true,
  testTimeout: 30000,
  roots: ["app/javascript/src", "donut/src"],
  testEnvironment: "jest-environment-jsdom-sixteen",
  setupFilesAfterEnv: ["<rootDir>/app/javascript/src/testHelpers/setup.js"],
  moduleDirectories: [
    "node_modules",
    "app/javascript",
    "app/javascript/src/testHelpers",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es)"],
  moduleNameMapper: {
    "@advisable/donut": "<rootDir>/donut/src",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/app/javascript/src/__mocks__/fileMock.js",
    "\\.css$": "<rootDir>/app/javascript/src/__mocks__/styleMock.js",
  },
  transform: {
    "^.+\\.graphql$": "jest-transform-graphql",
    "^.+\\.(js|tsx|ts)$": "babel-jest",
  },
  coverageReporters: ["html"],
  coverageDirectory: "<rootDir>/jest-coverage",
  collectCoverageFrom: ["<rootDir>/app/javascript/src/**/*.{js,tsx,ts}"],
  snapshotSerializers: ["jest-styled-components"],
};
