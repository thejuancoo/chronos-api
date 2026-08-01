import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Events = db.define('events', {
    id_event: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    title_event: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    description_event: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status_event: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

export default Events