const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '152634', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
