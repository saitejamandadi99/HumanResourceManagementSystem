const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const Users = sequelize.define('Users', {
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
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password_hash:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,

    },
    
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    }
});


module.exports = Users