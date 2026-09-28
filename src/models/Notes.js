import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const notes = db.define("notes", {
    notes_id: {
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
    id_task: {
        type: DataTypes.BIGINT.UNSIGNED
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