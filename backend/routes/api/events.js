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

// Get details of an Event specified by its id
router.get("/:eventId", async (req, res) => {
	const { eventId } = req.params;

	const event = await Event.findByPk(eventId, {
		include: {
			model: EventImage,
			attributes: ["id", "url", "preview"]
		},
		include: {
			model: Group,
			attributes: ["id", "name", "private", "city", "state"]
		},
		include: {
			model: Venue,
			attributes: ["id", "groupId", "address", "city", "state", "lat", "lng"]
		},
		group: ["Event.id", "Venue.id"]
	});

	if (!event) {
		res.status(404);
		res.json({ message: "Event couldn't be found", statusCode: 404 });
	} else {
		res.json(event);
	}
});

// Add an Image to a Event based on the Event's id
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

// Get all Events
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

		group: ["Event.id", "EventImages.url", "Group.id", "Venue.id"]
	});
	res.json({ Events: events });
});

module.exports = router;
