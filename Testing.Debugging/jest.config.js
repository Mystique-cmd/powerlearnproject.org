// jest.config.js
module.exports = {
    collectCoverage: true,
    projects: [
        // Backend / integration tests (Node environment)
        {
            displayName: "server",
            testEnvironment: "node",
            testEnvironmentOptions: {},
            setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
            transform: { "^.+\\.[jt]sx?$": "babel-jest" },
            transformIgnorePatterns: ["/node_modules/"],
            testMatch: ["<rootDir>/server/**/*.test.js"],
            resolver: "<rootDir>/jest.resolver.js",   // ✅ use custom resolver
            collectCoverageFrom: ["server/**/*.js", "!**/node_modules/**"],
        },

        // Frontend / React tests (jsdom environment)
        {
            displayName: "client",
            testEnvironment: "jsdom",
            testEnvironmentOptions: {},
            setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
            transform: {
                "^.+\\.[jt]sx?$": "babel-jest",
            },
            transformIgnorePatterns: ["/node_modules/"],
            testMatch: ["<rootDir>/client/src/**/*.{test,spec}.{js,jsx}"],
            collectCoverageFrom: [
                "client/src/**/*.{js,jsx}",
                "!**/node_modules/**",
            ],
        },
    ],

    // Global coverage thresholds (applied across projects)
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
};
