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
			"Venues",
			[
				{
					address: "123 Rock Street",
					city: "Bedrock",
					state: "Granite",
					lat: 37.7645358,
					lng: -122.4730327
				},
				{
					address: "124 Rock Street",
					city: "Bedrock",
					state: "Granite",
					lat: 37.7645358,
					lng: -122.4730327
				},
				{
					address: "125 Rock Street",
					city: "Bedrock",
					state: "Granite",
					lat: 37.7645358,
					lng: -122.4730327
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
		return queryInterface.bulkDelete(
			"Venues",
			{
				address: {
					[Op.in]: ["123 Rock Street", "124 Rock Street", "125 Rock Street"]
				}
			},
			{}
		);
	}
};
