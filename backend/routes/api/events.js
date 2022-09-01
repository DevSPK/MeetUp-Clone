const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser
} = require("../../utils/auth");
const {
	User,
	Group,
	sequelize,
	Membership,
	GroupImage,
	Venue,
	Event,
	EventImage,
	Attendance,
	Sequelize
} = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const membership = require("../../db/models/membership");
const attendance = require("../../db/models/attendance");

const router = express.Router();

router.post("/:eventId/images", requireAuth, async (req, res, next) => {
	const { eventId } = req.params;

	const { url, preview } = req.body;

	const event = await Event.findByPk(eventId);

	if (!event) {
		res.status(404);
		res.json({ message: "Event couldn't be found", statusCode: 404 });
	} else {
		const addImage = await EventImage.create({
			eventId,
			url,
			preview
		});
		res.json(addImage);
	}
});

router.get("/", async (req, res) => {
	const events = await Event.findAll({
		attributes: {
			include: [
				[
					sequelize.fn("COUNT", sequelize.col("Attendances.id")),
					"numAttending"
				],
				[sequelize.col("EventImages.url"), "previewImage"]
			],
			exclude: ["description", "capacity", "price", "createdAt", "updatedAt"]
		},
		include: [
			{
				model: Attendance,
				where: { status: ["member"] },
				attributes: []
			},
			{
				model: EventImage,
				attributes: []
			},
			{
				model: Group,
				attributes: ["id", "name", "city", "state"]
			},
			{ model: Venue }
		],

		group: ["Event.id", "EventImages.url", "Group.id"]
	});
	res.json({ Events: events });
});

// const numAttending = await Attendance.count({
// 	where: { status: "member" }
// });
// const EventImages = await EventImage.findAll({
// 	where: { eventId: events.id }
// });
// const data = {};

// const groups = await Group.findOne({
// 	where: { id: events.groupId }
// });

// const venues = await Venue.findOne({
// 	where: { id: events.venueId }
// });

// data.Events = {
// 	id: events.id,
// 	groupId: events.groupId,
// 	venueId: events.venueId,
// 	name: events.name,
// 	type: events.type,
// 	startDate: events.startDate,
// 	endDate: events.endDate,
// 	numAttending: numAttending,
// 	previewImage: EventImages.url,
// 	Group: {
// 		id: groups.id,
// 		name: groups.name,
// 		city: groups.city,
// 		state: groups.state
// 	},
// 	Venue: {
// 		id: venues.id,
// 		city: venues.city,
// 		state: venues.state
// 	}
// };

// res.json(data.Events);
// });

module.exports = router;
