module.exports = {
    collectCoverageFrom: [
        'src/**/*.ts',
        'src/**/*.tsx'
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$",
    moduleNameMapper: {
        "\\.(scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/asset.stub.js",
        '^src/(.*)': '<rootDir>/src/$1',
        '^api/(.*)': '<rootDir>/src/api/$1',
        '^classes/(.*)': '<rootDir>/src/classes/$1',
    },
    moduleFileExtensions: [ "ts", "tsx", "js", "jsx" ],
    setupFiles: [
        '<rootDir>/src/__mocks__/setup-tests.ts'
    ]
};
