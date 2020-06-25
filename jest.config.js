module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: 'test/index.tsx',
  moduleFileExtensions: ['tsx', 'ts', 'js'],
}
