module.exports = {
  clearMocks: true,
  resetModules: true,
  verbose: true,
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'jsdom',
  testRegex: '/src/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: [
    "./src/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    "./node_modules",
    "./coverage",
    "./dist",
    "./bundle",
    "./esm",
  ]
};
