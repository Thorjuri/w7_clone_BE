'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Buckets extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Buckets.belongsTo(models.Users, {
                foreignKey: 'userId',
                targetKey: 'userId',
                onDelete: 'CASCADE',
            });
            Buckets.belongsTo(models.Posts, {
                foreignKey: 'postId',
                targetKey: 'postId',
                onDelete: 'CASCADE',
            });
        }
    }
    Buckets.init(
        {
            bucketId: {
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
            modelName: 'Buckets',
            timestamps: true,
            paranoid: false,
        }
    );
    return Buckets;
};
