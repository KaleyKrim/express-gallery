//jshint esversion: 6

module.exports = function(sequelize, DataTypes){
  const User = sequelize.define('user', {
    username: { type : DataTypes.STRING, unique: true},
    password: DataTypes.STRING
  }, {
    tableName: 'users'
  });

  return User;
};