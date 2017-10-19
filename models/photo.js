//jshint esversion: 6

module.exports = function(sequelize, DataTypes) {
  const Photo = sequelize.define('photo', {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    tableName: 'photos'
  });

  return Photo;
};
