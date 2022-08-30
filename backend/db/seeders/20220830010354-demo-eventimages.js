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
			"EventImages",
			[
				{
					eventId: 1,
					url: "localfile1",
					preview: false
				},
				{
					eventId: 2,
					url: "localfile2",
					preview: false
				},
				{
					eventId: 3,
					url: "localfile3",
					preview: false
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
		await queryInterface.bulkDelete("EventImages", null, {});
	}
};
