const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Employees = sequelize.define('Employees', {
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
    first_name:{
        type:DataTypes.STRING(100)
    },
    
    last_name:{
        type:DataTypes.STRING(100)
    },
    email:{
        type:DataTypes.STRING,
    },
    phone:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    }
});


module.exports = Employees