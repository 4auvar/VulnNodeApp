var config = {
    DATABASE_HOST: process.env.DATABASE_HOST?process.env.DATABASE_HOST:"127.0.0.1",
    DATABASE_NAME: process.env.DATABASE_NAME?process.env.DATABASE_NAME:"database",
    DATABASE_USER: process.env.DATABASE_USER?process.env.DATABASE_USER:"user",
    DATABASE_PASS: process.env.DATABASE_PASS?process.env.DATABASE_PASS:"pass",
}

module.exports = config;