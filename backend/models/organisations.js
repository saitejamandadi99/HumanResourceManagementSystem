const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Organisations = sequelize.define('Organisations', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    }
});


module.exports = Organisations