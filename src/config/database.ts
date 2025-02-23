import { Sequelize } from "sequelize";

const sequelize = new Sequelize("techacademy05", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default sequelize;