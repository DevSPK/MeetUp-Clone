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
const {
	check,
	validationResult
} = require("express-validator");
const {
	handleValidationErrors
} = require("../../utils/validation");
const membership = require("../../db/models/membership");
const attendance = require("../../db/models/attendance");

const router = express.Router();

// Change the status of an attendance for an event specified by id
router.put(
	"/:eventId/attendance",
	requireAuth,
	async (req, res, next) => {
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

		const attendance = await Attendance.findOne({
			where: {
				eventId: eventId,
				status: "pending",
				userId: userId
			}
		});

		attendance.set({
			status: "member"
		});
		await attendance.save();

		let data = {};

		data.attendance = {
			id: attendance.id,
			eventId: attendance.eventId,
			userId: attendance.userId,
			status: attendance.status
		};

		res.json(data.attendance);
	}
);

//Request to Attend an Event based on the Event's id

router.post(
	"/:eventId/attendance",
	requireAuth,
	async (req, res, next) => {
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

		const newAttendance = await Attendance.findByPk(
			attendance.id,
			{
				attributes: ["eventId", "userId", "status"]
			}
		);

		res.json(newAttendance);
	}
);

//Get all Attendees of an Event specified by its id

router.get(
	"/:eventId/attendees",
	async (req, res, next) => {
		const { eventId } = req.params;

		const event = await Event.findByPk(eventId);

		if (!event) {
			res.status(404);
			return res.json({
				message: "Event couldn't be found",
				statusCode: 404
			});
		}

		const attendance = await Attendance.findOne({
			where: { eventId: eventId }
		});

		const user = await User.findByPk(attendance.userId);

		let data = {};

		data.Attendees = [
			{
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				Attendance: {
					status: attendance.status
				}
			}
		];

		res.json(data);
	}
);

// Delete attendance to an event specified by id
router.delete(
	"/:eventId/attendance",
	requireAuth,
	async (req, res, next) => {
		const { eventId } = req.params;

		const event = await Event.findByPk(eventId);

		if (!event) {
			res.status(404);
			return res.json({
				message: "Event couldn't be found",
				statusCode: 404
			});
		}

		const attendance = await Attendance.findOne({
			where: { eventId: eventId }
		});

		if (!attendance) {
			res.status(404);
			return res.json({
				message: "Attendance does not exist for this User",
				statusCode: 404
			});
		} else {
			await attendance.destroy();

			res.status(200);
			return res.json({
				message:
					"Successfully deleted attendance from event"
			});
		}
	}
);

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

	if (
		userId === group.organizerId ||
		membership.status === "co-host"
	) {
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

		const newEvent = await Event.findByPk(eventId, {
			attributes: [
				"id",
				"groupId",
				"venueId",
				"name",
				"type",
				"capacity",
				"price",
				"description",
				"startDate",
				"endDate"
			]
		});
		res.json(newEvent);
	} else {
		res.status(403);
		return res.json({
			message: "Forbidden",
			statusCode: 403
		});
	}
});

//  Delete an Event specified by its id

router.delete(
	"/:eventId",
	requireAuth,
	async (req, res, next) => {
		const { eventId } = req.params;

		const event = await Event.findByPk(eventId);

		if (event) {
			await event.destroy();
			res.status(200);
			return res.json({
				message: "Successfully deleted",
				statusCode: 200
			});
		}

		if (!event) {
			res.status(404);
			return res.json({
				message: "Event couldn't be found",
				statusCode: 404
			});
		}
		// const eventImages = await EventImage.findOne({ where: { eventId: eventId } });

		// if (eventImages) {
		// 	await eventImages.destroy();
		// 	await event.destroy();
		// 	res.status(200);
		// 	return res.json({
		// 		message: "Successfully deleted",
		// 		statusCode: 200
		// 	});
		// }
	}
);

// Get details of an Event specified by its id
router.get("/:eventId", async (req, res, next) => {
	const { eventId } = req.params;

	// const event = await Event.findByPk(eventId, {
	// 	include: {
	// 		model: EventImage,
	// 		attributes: ["id", "url", "preview"]
	// 	},
	// 	include: {
	// 		model: Group,
	// 		attributes: ["id", "name", "private", "city", "state"]
	// 	},
	// 	include: {
	// 		model: Venue,
	// 		attributes: ["id", "groupId", "address", "city", "state", "lat", "lng"]
	// 	},
	// 	group: ["Event.id", "Venue.id"]
	// });

	const eventCheck = await Event.findByPk(eventId);

	if (!eventCheck) {
		res.status(404);
		return res.json({
			message: "Event couldn't be found",
			statusCode: 404
		});
	} else {
		const events = await Event.findByPk(eventId, {
			attributes: {
				include: [
					[
						sequelize.fn(
							"COUNT",
							sequelize.col("Attendances.id")
						),
						"numAttending"
					]
				],
				exclude: ["createdAt", "updatedAt"]
			},
			include: [
				{
					model: Attendance,
					//where: { status: ["member"] },
					attributes: []
				},
				{
					model: Group,
					attributes: [
						"id",
						"name",
						"private",
						"city",
						"state"
					]
				},
				{
					model: Venue,
					attributes: [
						"id",
						"address",
						"city",
						"state",
						"lat",
						"lng"
					]
				},
				{
					model: EventImage,
					attributes: ["id", "url", "preview"]
				}
			],

			group: [
				"Event.id",
				"EventImages.id",
				"EventImages.url",
				"Group.id",
				"Venue.id"
			]
		});

		res.json(events);
	}
});

// Add an Image to a Event based on the Event's id
router.post(
	"/:eventId/images",
	requireAuth,
	async (req, res, next) => {
		const { eventId } = req.params;

		const { url, preview } = req.body;

		const event = await Event.findByPk(eventId);

		if (!event) {
			res.status(404);
			res.json({
				message: "Event couldn't be found",
				statusCode: 404
			});
		} else {
			const addImage = await EventImage.create({
				eventId,
				url,
				preview
			});

			const image = await EventImage.findByPk(addImage.id, {
				attributes: ["id", "url", "preview"]
			});
			res.json(image);
		}
	}
);

// Get all Events
router.get("/", async (req, res, next) => {
	const events = await Event.findAll({
		attributes: {
			include: [
				[
					sequelize.fn(
						"COUNT",
						sequelize.col("Attendances.id")
					),
					"numAttending"
				],
				[sequelize.col("EventImages.url"), "previewImage"]
			],
			exclude: [
				"description",
				"capacity",
				"price",
				"createdAt",
				"updatedAt"
			]
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
			{
				model: Venue,
				attributes: ["id", "city", "state"]
			}
		],

		group: [
			"Event.id",
			"EventImages.url",
			"Group.id",
			"Venue.id"
		]
	});
	res.json({ Events: events });
});

module.exports = router;
