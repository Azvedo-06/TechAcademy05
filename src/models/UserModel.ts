import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";               

// Definir os atributos do modelo User
interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    cpf: string;
}

// Tipagem para criação de usuários (id é opcional, pois o Sequelize gera automaticamente)
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class UserModel extends Model<UserAttributes, UserCreationAttributes>{
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public cpf!: string;
};

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "UserModel",
        tableName: "users",
    }
);

export default UserModel;