const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

require('./models/organisations');
require('./models/users');
require('./models/teams');
require('./models/employees');
require('./models/employee_teams');
require('./models/logs');
require('./models/associations')
app.get('/', (req, res)=>{
    res.send('Server is running in the backend')
    console.log('Server is running in the backend')
})

app.use('/api', require('./routes/authRoutes'))

app.use((error, req, res, next)=>{ //global error handling middleware
    res.status(500).json({message:error.message})
})


const sequelize = require('./db');
sequelize.sync()
  .then(() => {
    console.log('All tables synced!');
    // Now safe to start the server
    const PORT = process.env.PORT || 5000; 
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log('Table sync failed:', err);
  });
