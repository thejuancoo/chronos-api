import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Portfolios = db.define('portfolios', {
    id_portfolio: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    id_notes: {
        type: DataTypes.BIGINT.UNSIGNED
    },
    id_parent: {
        type: DataTypes.BIGINT.UNSIGNED
    },
    title_portfolio: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description_portfolio: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
})

export default Portfolios