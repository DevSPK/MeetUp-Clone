require("pg").defaults.parseInt8 = true;

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Membership extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Membership.belongsTo(models.Group, { foreignKey: "groupId" });
			Membership.belongsTo(models.User, { foreignKey: "userId" });
		}
	}
	Membership.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			userId: DataTypes.INTEGER,
			groupId: DataTypes.INTEGER,
			status: DataTypes.ENUM("pending", "member", "co-host")
		},
		{
			sequelize,
			modelName: "Membership"
		}
	);
	return Membership;
};
