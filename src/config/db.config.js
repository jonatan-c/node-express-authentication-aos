require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    dialect: process.env.BBDD || "mysql",
    logging: false,
    define: {
      freezeTableName: true,
    },
  }
);
const isDatabaseOn = async () => {
  try {
    await sequelize.authenticate();
    console.log("sequelize has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
isDatabaseOn();

// sequelize.sync({ force: true });

module.exports = sequelize;