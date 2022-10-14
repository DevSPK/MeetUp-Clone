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
          url: "https://picsum.photos/id/223/1080/720",
          preview: true
        },
        {
          eventId: 2,
          url: "https://picsum.photos/id/224/1080/720",
          preview: true
        },
        {
          eventId: 3,
          url: "https://picsum.photos/id/225/1080/720",
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
    await queryInterface.bulkDelete("EventImages", null, {});
  }
};
