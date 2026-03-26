// Testing Things
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbname', 'username', 'password', {
  host: 'localhost', // Adjust when hosted online
  dialect: 'mysql' 
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Error connecting to DB:', err));