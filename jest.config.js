module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    moduleFileExtensions: [
        "js",
        "json",
        "vue"
    ],
    transform: {
        '.*\\.js$':'babel-jest',
        "^.+\\.vue$": "@vue/vue2-jest" 
    },
    moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    },
};