const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS,
    {host: process.env.DB_HOST, dialect: 'postgres'}
)
 //test connection 
 sequelize.authenticate()
    .then(()=>console.log('Database connection success!'))
    .catch(err=>console.log('Database connection is failure',err))


module.exports = sequelize