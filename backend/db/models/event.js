"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Event extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// Event.belongsToMany(models.User, {
			// 	through: "Attendance",
			// 	otherKey: "userId",
			// 	foreignKey: "eventId"
			// });
			Event.belongsTo(models.Group, { foreignKey: "groupId" });
			Event.belongsTo(models.Venue, { foreignKey: "venueId" });
			Event.hasMany(models.EventImage, {
				foreignKey: "eventId",
				onDelete: "CASCADE"
			});
			Event.hasMany(models.Attendance, {
				foreignKey: "eventId",
				onDelete: "CASCADE"
			});
		}
	}
	Event.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			venueId: DataTypes.INTEGER,
			groupId: DataTypes.INTEGER,
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [5, 60]
				}
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			type: { type: DataTypes.ENUM("In person", "Online") },
			capacity: { type: DataTypes.INTEGER },
			price: { type: DataTypes.DECIMAL(10, 2) },
			startDate: {
				type: DataTypes.DATE,
				validate: { isDate: true }
			},
			endDate: { type: DataTypes.DATE, validate: { isDate: true } }
		},
		{
			sequelize,
			modelName: "Event"
		}
	);
	return Event;
};
