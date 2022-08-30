"use strict";

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
		 */

		await queryInterface.bulkInsert(
			"Attendances",
			[
				{
					eventId: 1,
					userId: 1,
					status: "member"
				},
				{
					eventId: 1,
					userId: 2,
					status: "pending"
				},
				{
					eventId: 1,
					userId: 3,
					status: "waitlist"
				},
				{
					eventId: 2,
					userId: 1,
					status: "pending"
				},
				{
					eventId: 2,
					userId: 3,
					status: "waitlist"
				},
				{
					eventId: 2,
					userId: 2,
					status: "member"
				},
				{
					eventId: 3,
					userId: 3,
					status: "member"
				},
				{
					eventId: 3,
					userId: 1,
					status: "pending"
				},
				{
					eventId: 3,
					userId: 2,
					status: "waitlist"
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
		await queryInterface.bulkDelete("Attendances", null, {});
	}
};
