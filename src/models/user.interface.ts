import { sequelize } from "../dbconfig/dbconfig";
import { Model, DataTypes, Optional } from 'sequelize';

interface UserModel {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UserItem extends UserModel {
    id: BigInt;
}

interface UserCreationAttributes extends Optional<UserItem, "id"> {}
export interface User extends Model<UserItem, UserCreationAttributes>, UserItem {}

export const Users = sequelize.define<User>("User", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        field: 'eMail'
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Users'
});
