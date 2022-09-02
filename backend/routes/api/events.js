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

//Request to Attend an Event based on the Event's id

router.post("/:eventId/attendance", requireAuth, async (req, res, next) => {
	const { eventId } = req.params;

	const userId = req.user.id;

	const event = await Event.findByPk(eventId);

	if (!event) {
		res.status(404);
		return res.json({
			message: "Event couldn't be found",
			statusCode: 404
		});
	}

	const attendance = await event.createAttendance({
		status: "pending",
		userId,
		eventId
	});

	res.json(attendance);
});

// edit an event specified by its id
router.put("/:eventId", async (req, res, next) => {
	const userId = req.user.id;
	const { eventId } = req.params;
	const {
		venueId,
		name,
		type,
		capacity,
		price,
		description,
		startDate,
		endDate
	} = req.body;

	const event = await Event.findByPk(eventId);

	if (!event) {
		res.status(404);
		return res.json({
			message: "Event couldn't be found",
			statusCode: 404
		});
	}

	const venue = await Venue.findByPk(venueId);

	if (!venue) {
		res.status(404);
		return res.json({
			message: "Venue couldn't be found",
			statusCode: 404
		});
	}

	const group = await Group.findByPk(event.groupId);

	const membership = await Membership.findOne({
		where: { groupId: event.groupId }
	});

	if (userId === group.organizerId || membership.status === "co-host") {
		event.set({
			venueId,
			groupId: group.id,
			name,
			type,
			capacity,
			price,
			description,
			startDate,
			endDate
		});
		await event.save();
		res.json(event);
	} else {
		res.status(403);
		return res.json({
			message: "Forbidden",
			statusCode: 403
		});
	}
});

// Get details of an Event specified by its id
router.get("/:eventId", async (req, res, next) => {
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
router.get("/", async (req, res, next) => {
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
				//where: { status: ["member"] },
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
