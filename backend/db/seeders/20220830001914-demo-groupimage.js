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
          url: "https://picsum.photos/id/123/1080/720",
          preview: true
        },
        {
          groupId: 2,
          url: "https://picsum.photos/id/124/1080/720",
          preview: true
        },
        {
          groupId: 3,
          url: "https://picsum.photos/id/125/1080/720",
          preview: true
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
