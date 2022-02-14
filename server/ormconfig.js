module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production" ? "all" : "error",
  entities:
    process.env.NODE_ENV !== "production" ? ["src/entity/**/*.ts"] : ["dist/entity/**/*.js"],
  cli: {
    entitiesDir: "src/entity",
  },
};
