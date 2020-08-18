module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: 'test/index.ts',
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  globals: {
    'ts-jest': {
      tsConfig: 'test/tsconfig.json',
    },
  },
}
