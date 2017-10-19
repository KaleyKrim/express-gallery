//jshint esversion: 6

module.exports = function(sequelize, DataTypes) {
  const Photo = sequelize.define('photo', {
    author: DataTypes.STRING,
    link: {type: DataTypes.STRING, unique: true},
    description: DataTypes.TEXT
  }, {
    tableName: 'photos'
  });

  return Photo;
};
