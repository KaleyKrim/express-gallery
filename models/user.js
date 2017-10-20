//jshint esversion: 6

module.exports = function(sequelize, DataTypes){
  const user = sequelize.define('user', {
    username: { type : DataTypes.STRING, unique: true},
    password: DataTypes.STRING
  });

  user.associate = function(models) {
    user.hasMany(models.photo);
  };

  return user;
};
