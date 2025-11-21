const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const EmployeeTeams = sequelize.define('EmployeeTeams', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Employees',
            key: 'id',
        },
        onDelete: 'CASCADE'
    },
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Teams',
            key: 'id',
        },
        onDelete: 'CASCADE'
    },
    assigned_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

EmployeeTeams.sync()
    .then(() => console.log('EmployeeTeams table created'))
    .catch(err => console.log('EmployeeTeams table failed to create', err));

module.exports = EmployeeTeams;
