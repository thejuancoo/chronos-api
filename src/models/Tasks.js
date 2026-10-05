import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Tasks = db.define('tasks', {
    id_task: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    id_event: {
        type: DataTypes.BIGINT.UNSIGNED
    },
    title_task: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    description_task: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_task: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    is_done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    order_index: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    time_task: {
        type: DataTypes.TIME,
        allowNull: true
    },
    status_task: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

export default Tasks