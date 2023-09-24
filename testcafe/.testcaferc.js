module.exports = {
    "src": "./tests",
    "userVariables": {
        "baseUrl": "http://localhost:3000"
    },
    hooks: {
        testRun: {
            before: async ctx => {
                console.log(`before test run ctx ${JSON.stringify(ctx)}`);
                // TODO clean up / archive screenshots from prior runs if any
            },
            after: async ctx => {
                console.log(`after test run ctx ${JSON.stringify(ctx)}`);
                // TODO clean up / archive screenshots this run???
            }
        }
    }
}