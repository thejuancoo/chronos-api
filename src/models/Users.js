import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const User = db.define('user', {
    id_user: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name_user: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lastname_user: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email_user: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password_user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar_user: {
        type: DataTypes.STRING(100)
    }
})

export default User