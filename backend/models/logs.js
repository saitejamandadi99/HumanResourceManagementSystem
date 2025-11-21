const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Logs = sequelize.define('Logs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    organisation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    action: {
        type: DataTypes.STRING,
    },
    meta: {
        type: DataTypes.JSONB,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

module.exports = Logs;
