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

			// Group.belongsToMany(models.User, {
			// 	through: "Membership",
			// 	otherKey: "userId",
			// 	foreignKey: "groupId"
			// });
			// Group.belongsToMany(models.Venue, {
			// 	through: "Event",
			// 	otherKey: "venueId",
			// 	foreignKey: "groupId"
			// });
			Group.belongsTo(models.User, {
				foreignKey: "organizerId"
			});
			Group.hasMany(models.Venue, {
				foreignKey: "groupId",
				onDelete: "CASCADE"
			});
			Group.hasMany(models.Membership, {
				foreignKey: "groupId",
				onDelete: "CASCADE"
			});
			Group.hasMany(models.GroupImage, {
				foreignKey: "groupId",
				onDelete: "CASCADE"
			});
			Group.hasMany(models.Event, {
				foreignKey: "groupId",
				onDelete: "CASCADE"
			});
		}
	}
	Group.init(
		{
			organizerId: DataTypes.INTEGER,
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [0, 60],
						msg: "Name must be 60 characters or less"
					}
				}
			},
			about: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					len: {
						args: [50, 1000],
						msg: "About must be 50 characters or more"
					}
				}
			},
			type: {
				type: DataTypes.ENUM("Online", "In person"),
				allowNull: false,
				validate: {
					isIn: {
						args: [["Online", "In person"]],
						msg: "Type must be 'Online' or 'In person'"
					}
				}
			},
			private: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				default: true,
				validate: {
					notEmpty: {
						args: true,
						msg: "Private must be a boolean"
					}
				}
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: "City is required"
					}
				}
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: "State is required"
					}
				}
			}
		},
		{
			sequelize,
			modelName: "Group"
		}
	);
	return Group;
};
