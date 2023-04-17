const Sequelize = require("sequelize");

const initializeDB = async () => {
  const sequelize = new Sequelize(
    `postgres://${process.env.HYPERUSERNAME}:${process.env.PASSWORD}@${process.env.URL}:${process.env.PORT}/${process.env.DBNAME}`
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  const Task = require("./task")(sequelize);

  return { Task };
};

module.exports = {
  initializeDB,
};
