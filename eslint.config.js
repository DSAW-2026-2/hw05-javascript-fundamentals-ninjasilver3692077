module.exports = [
    {
        ignores: ["template/**"]
    },
    {
        files: ["js/**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "script"
        },
        rules: {
            "no-var": "error",
            "prefer-const": "warn",
            "no-unused-vars": "warn",
            "no-console": "off",
            "eqeqeq": "error",
            "no-eval": "error",
            "no-implied-eval": "error"
        }
    }
];
