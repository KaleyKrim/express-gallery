//jshint esversion: 6

module.exports = function(sequelize, DataTypes) {
  const photo = sequelize.define('photo', {
    author: DataTypes.STRING,
    link: {type: DataTypes.STRING, unique: true},
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  });
  photo.associate = function(models){
    photo.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });
  };

  return photo;
};
