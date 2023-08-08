module.exports = {
  moduleNameMapper: {
    [String.raw`\.(png|svg|jpg|jpeg|gif|css)$`]:
      "<rootDir>/__mocks__/resource.js",
  },
};
