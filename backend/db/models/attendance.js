"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Attendance extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Attendance.belongsTo(models.Event, {
				foreignKey: "eventId",
				onDelete: "CASCADE"
			});
			Attendance.belongsTo(models.User, {
				foreignKey: "userId",
				onDelete: "CASCADE"
			});
		}
	}
	Attendance.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			eventId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			status: DataTypes.ENUM(
				"member",
				"waitlist",
				"pending"
			)
		},
		{
			sequelize,
			modelName: "Attendance"
		}
	);
	return Attendance;
};
