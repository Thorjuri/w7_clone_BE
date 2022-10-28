'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Posts.hasMany(models.Likes, {
                foreignKey: 'postId',
                sourceKey: 'postId',
            });
            Posts.hasMany(models.Buckets, {
                foreignKey: 'postId',
                sourceKey: 'postId',
            });
        }
    }
    Posts.init(
        {
            postId: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            title: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            tutor: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stack: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            thumbnail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Posts',
            timestamps: true,
            paranoid: true,
        }
    );
    return Posts;
};
