import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const notes = db.define("notes", {
    id_notes: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title_note: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content_note: {
        type: DataTypes.TEXT('long')
    }

})

export default notes