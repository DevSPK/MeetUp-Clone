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
			"Groups",
			[
				{
					organizerId: 1,
					name: "Bedrock Bowlers",
					about:
						"et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo odio aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus",
					type: "In person",
					private: true,
					city: "Bedrock",
					state: "Granite"
				},
				{
					organizerId: 2,
					name: "Dinosaur Lovers",
					about:
						"et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo odio aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus",
					type: "Online",
					private: true,
					city: "Bedrock",
					state: "Granite"
				},
				{
					organizerId: 3,
					name: "Rock Carving Enthusiasts",
					about:
						"et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo odio aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus",
					type: "In person",
					private: false,
					city: "Bedrock",
					state: "Granite"
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
		return queryInterface.bulkDelete("Groups", null, {});
	}
};
