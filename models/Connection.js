const Sequelize = require("sequelize");

const dialect = {
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  // cluster_name: "whole-forager-5183",
  database: process.env.DB_DATABASE_NAME,

  dialectOptions: {
    ssl: {
      ca: process.env.CA_CERTIFICATE,
    },
  },

  logging: false,
};

console.log(dialect);

let sequelize = new Sequelize(process.env.COCKROACH_DB);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully."); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err); // eslint-disable-line no-console
  });

module.exports = { sequelize };
