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
			"GroupImages",
			[
				{
					groupId: 1,
					url: "localfile1",
					preview: false
				},
				{
					groupId: 2,
					url: "localfile2",
					preview: false
				},
				{
					groupId: 3,
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
		await queryInterface.bulkDelete("GroupImages", null, {});
	}
};
