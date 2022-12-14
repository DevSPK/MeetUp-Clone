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
					eventId: 2,
					userId: 2,
					status: "member"
				},
				{
					eventId: 3,
					userId: 3,
					status: "member"
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
		await queryInterface.bulkDelete(
			"Attendances",
			null,
			{}
		);
	}
};
