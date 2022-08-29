"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Group extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Group.belongsTo(models.User, { foreignKey: "organizerId" });
			Group.hasMany(models.Venue, { foreignKey: "groupId" });
		}
	}
	Group.init(
		{
			organizerId: DataTypes.INTEGER,
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [0, 60]
				}
			},
			about: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					len: [50, 1000]
				}
			},
			type: {
				type: DataTypes.ENUM,
				allowNull: false
			},
			private: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				default: true
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: "Group"
		}
	);
	return Group;
};
