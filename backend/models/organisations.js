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

Organisations.sync()
.then(()=>console.log('Organisations table created'))
.catch(err=>console.log('Organisations table failed to create', err))

module.exports = Organisations