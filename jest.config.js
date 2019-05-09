module.exports = {
  verbose: true,
  roots: ["app/javascript/src"],
  moduleDirectories: ["node_modules", "app/javascript"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/app/javascript/src/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/app/javascript/src/__mocks__/styleMock.js",
  },
  transform: {
    "^.+\\.graphql$": "jest-transform-graphql",
    "^.+\\.(js|tsx|ts)$": "babel-jest",
  },
};
