const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Teams  = sequelize.define('Teams', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    organisation_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"Organisations",
            key:'id',
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});


module.exports = Teams 