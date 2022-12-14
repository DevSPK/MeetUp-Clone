"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 *
		 *
		 */
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "demo@user.io",
					username: "Demo-lition",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "Fred",
					lastName: "Flintstone"
				},
				{
					email: "user1@user.io",
					username: "FakeUser1",
					hashedPassword: bcrypt.hashSync("password2"),
					firstName: "Wilma",
					lastName: "Flintstone"
				},
				{
					email: "user2@user.io",
					username: "FakeUser2",
					hashedPassword: bcrypt.hashSync("password3"),
					firstName: "Barney",
					lastName: "Rubble"
				}
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Users", null, {});
	}
};
