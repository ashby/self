module.exports = {
    collectCoverageFrom: [
        'src/**/*.ts',
        'src/**/*.tsx',
        '!**/__mocks__/**/*',
        '!**/__fixtures__/**/*',
        '!**/__tests__/**/*',
        '!**/__inventory__/**/*'
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__(tests|inventory)__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$",
    moduleNameMapper: {
        "\\.(scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/asset.stub.js",
        '^src/(.*)': '<rootDir>/src/$1',
        '^app-test-utils/(.*)': '<rootDir>/src/__mocks__/app-test-utils.ts',
        '^api/(.*)': '<rootDir>/src/api/$1',
        '^classes/(.*)': '<rootDir>/src/classes/$1',
    },
    moduleFileExtensions: [ "ts", "tsx", "js", "jsx" ],
    setupFiles: [
        '<rootDir>/src/__mocks__/setup-tests.ts'
    ]
};
