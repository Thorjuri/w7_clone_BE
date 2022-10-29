'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Likes.belongsTo(models.Users, {
                foreignKey: 'userId',
                targetKey: 'userId',
                onDelete: 'CASCADE',
            });
            Likes.belongsTo(models.Posts, {
                foreignKey: 'postId',
                targetKey: 'postId',
                onDelete: 'CASCADE',
            });
        }
    }
    Likes.init(
        {
            likeId: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Likes',
            timestamps: true,
            paranoid: false,
        }
    );
    return Likes;
};
