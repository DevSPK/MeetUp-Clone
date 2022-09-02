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
	Attendance,
	EventImage,
	Sequelize
} = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const membership = require("../../db/models/membership");
const user = require("../../db/models/user");
const group = require("../../db/models/group");

const router = express.Router();

// attempt at a custom validator
// const validateGroup = [
// 	check("name")
// 		.not()
// 		.isEmpty()
// 		.isLength({ max: 60 })
// 		.withMessage("Name must be 60 characters or less"),
// 	check("about")
// 		.not()
// 		.isEmpty()
// 		.isLength({ min: 50 })
// 		.withMessage("About must be 50 characters or more"),
// 	check("type")
// 		.isIn(["Online", "In person"])
// 		.withMessage("Type must be 'Online' or 'In person'"),
// 	check("private").isBoolean().withMessage("Private must be a boolean"),
// 	check("city").not().isEmpty().withMessage("City is required"),
// 	check("state").not().isEmpty().withMessage("State is required"),
// 	handleValidationErrors
// ];

//Change the status of a membership for a group specified by id
router.put("/:groupId/membership", requireAuth, async (req, res, next) => {
	const { groupId } = req.params;

	const userId = req.user.id;

	const { memberId, status } = req.body;

	if (status === "pending") {
		res.status(400);
		return res.json({
			message: "Validations Error",
			statusCode: 400,
			errors: {
				status: "Cannot change a membership status to pending"
			}
		});
	}

	const groups = await Group.findByPk(groupId);

	if (!groups) {
		res.status(404);
		return res.json({
			message: "Group couldn't be found",
			statusCode: 404
		});
	}

	const membershipUser = await User.findByPk(userId);

	if (!membershipUser) {
		res.status(400);
		return res.json({
			message: "Validation Error",
			statusCode: 400,
			errors: {
				memberId: "User couldn't be found"
			}
		});
	}

	const membershipStatus = await Membership.findAll({
		where: { userId: memberId, groupId: groupId }
	});

	if (!membershipStatus) {
		res.status(404);
		return res.json({
			message: "Membership between the user and the group does not exits",
			statusCode: 404
		});
	}

	const membershipAuth = await Membership.findAll({
		where: { groupId: groupId, userId: userId }
	});

	if (
		status === "member" &&
		(groups.organizerId !== userId || membershipAuth.status !== "co-host")
	) {
		res.status(403);
		return res.json({
			message: "Forbidden",
			statusCode: 403
		});
	} else {
		membershipStatus.set({
			status: "member"
		});

		let data = {};

		(data = {
			groupId: membershipStatus.groupId,
			memberId: membershipStatus.userId,
			status: membershipStatus.status
		}),
			res.json(data);
	}

	if (status === "co-host" && groups.organizerId !== userId) {
		res.status(403);
		return res.json({
			message: "Forbidden",
			statusCode: 403
		});
	} else {
		membershipStatus.set({
			status: "co-host"
		});

		let data = {};

		(data = {
			groupId: membershipStatus.groupId,
			memberId: membershipStatus.userId,
			status: membershipStatus.status
		}),
			res.json(data);
	}
});

//Request a Membership for a Group based on the Group's id
router.post("/:groupId/membership", requireAuth, async (req, res, next) => {
	const { groupId } = req.params;

	const userId = req.user.id;

	// const { memberId } = req.body;

	const groups = await Group.findByPk(groupId);
	console.log(groups);

	if (!groups) {
		res.status(404);
		return res.json({
			message: "Group couldn't be found",
			statusCode: 404
		});
	}

	const checkMembership = await Membership.findOne({
		where: { groupId: groupId, userId: userId }
	});

	if (checkMembership.status === "pending") {
		res.status(400);
		return res.json({
			message: "Membership has already been requested",
			statusCode: 400
		});
	}

	if (checkMembership.userId !== userId) {
		{
			let newMembership = await Membership.create({
				userId: userId,
				groupId,
				status: "pending"
			});

			let data = {};

			(data = {
				groupId: newMembership.groupId,
				memberId: newMembership.userId,
				status: newMembership.status
			}),
				res.json(data);
		}
	}

	// if (
	// 	checkMembership.status === "member" ||
	// 	checkMembership.status === "co-host"
	// ) {
	// 	res.status(400);
	// 	return res.json({
	// 		message: "User is already a member of the group",
	// 		statusCode: 400
	// 	});
	// }
});

//  Get all Events of a Group specified by its id

router.get("/:groupId/events", async (req, res, next) => {
	const { groupId } = req.params;

	const groups = await Group.findByPk(groupId);

	if (!groups) {
		res.status(404);
		return res.json({
			message: "Group couldn't be found",
			statusCode: 404
		});
	} else {
		const events = await groups.getEvents({
			include: { model: Group },
			include: { model: Venue },

			group: ["Event.id", "Venue.id"]
		});

		// const numAttending = await Attendance.count({
		// 	where: { status: "member", eventId: events.id }
		// });

		// const EventImages = await EventImage.findAll({
		// 	where: { eventId: events.id }
		// });

		// const Venues = await Venue.findAll({
		// 	where: { id: events.venueId }
		// });

		// console.log(EventImages);

		// const data = {};

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

		res.json({ Events: events });
	}
});

// Create an Event for a Group specified by its id
router.post("/:groupId/events", requireAuth, async (req, res, next) => {
	const userId = req.user.id;
	const { groupId } = req.params;
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

	const group = await Group.findByPk(groupId);

	if (!group) {
		res.status(404);
		return res.json({
			message: "Group couldn't be found",
			statusCode: 404
		});
	}
	const membership = await Membership.findOne({ where: { groupId: groupId } });

	if (userId === group.organizerId || membership.status === "co-host") {
		const newEvent = await Event.build({
			groupId: group.id,
			venueId,
			name,
			type,
			capacity,
			price,
			description,
			startDate,
			endDate
		});

		await newEvent.createAttendance({
			status: "member",
			userId: userId,
			eventId: newEvent.id
		});

		await newEvent.save();

		res.json(newEvent);
	} else {
		res.status(403);
		return res.json({
			message: "Forbidden",
			statusCode: 403
		});
	}
});

//Create a new Venue for a Group specified by its id
router.post("/:groupId/venues", requireAuth, async (req, res, next) => {
	const userId = req.user.id;
	const { groupId } = req.params;
	const { address, city, state, lat, lng } = req.body;

	const group = await Group.findByPk(groupId);

	const membership = await Membership.findOne({ where: { groupId: groupId } });

	if (!group) {
		res.status(404);
		return res.json({
			message: "Group couldn't be found",
			statusCode: 404
		});
	}

	if (userId === group.organizerId || membership.status === "co-host") {
		const newVenue = Venue.build({
			groupId: group.id,
			address,
			city,
			state,
			lat,
			lng
		});
		await newVenue.save();
		res.json(newVenue);
	} else {
		res.status(403);
		return res.json({
			message: "Forbidden",
			statusCode: 403
		});
	}
});

// Add an Image to a Group based on the Group's id
router.post("/:groupId/images", requireAuth, async (req, res, next) => {
	const { groupId } = req.params;

	const { url, preview } = req.body;

	const groupCheck = await Group.findByPk(groupId);

	if (!groupCheck) {
		res.status(404);
		res.json({ message: "Group couldn't be found", statusCode: 404 });
	} else {
		const addImage = await GroupImage.create({
			groupId,
			url,
			preview
		});
		res.json(addImage);
	}
});

// Get all Groups joined or organized by the Current User
router.get("/current", requireAuth, async (req, res, next) => {
	const Op = Sequelize.Op;
	const userId = req.user.id;

	const user = await User.findByPk(userId);

	const groups = await user.getGroups({
		attributes: {
			include: [
				[sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],
				[sequelize.col("GroupImages.url"), "previewImage"]
			]
		},
		include: [
			{
				model: Membership,
				where: { status: ["member", "co-host"] },
				attributes: []
			},
			{
				model: GroupImage,
				attributes: []
			}
		],

		group: ["Group.id", "GroupImages.url", "Memberships.id", "Membership.id"]
	});

	res.json({ Groups: groups });
});

// edit Group
router.put("/:groupId", requireAuth, async (req, res, next) => {
	const userId = req.user.id;
	const { groupId } = req.params;
	const { name, about, type, private, city, state } = req.body;

	const group = await Group.findByPk(groupId);

	if (!group) {
		res.status(404);
		return res.json({
			message: "Group couldn't be found",
			statusCode: 404
		});
	} else if (userId !== group.organizerId) {
		res.status(403);
		return res.json({
			message: "Forbidden",
			statusCode: 403
		});
	} else {
		group.set({
			name,
			about,
			type,
			private,
			city,
			state
		});

		await group.save();

		res.json(group);
	}
});

// Get details of a Group from an id
router.get("/:groupId", async (req, res, next) => {
	const { groupId } = req.params;

	const group = await Group.findByPk(groupId, {
		include: {
			model: GroupImage,
			attributes: ["id", "url", "preview"]
		},
		include: {
			model: User,
			attributes: ["id", "firstName", "lastName"]
		},
		include: {
			model: Venue,
			attributes: ["id", "groupId", "address", "city", "state", "lat", "lng"]
		}
	});

	if (!group) {
		res.status(404),
			res.json({
				message: "Group couldn't be found",
				statusCode: 404
			});
	} else {
		const numMembers = await Membership.count({ where: { groupId: group.id } });
		const Users = await User.findAll({ where: { id: group.organizerId } });
		const GroupImages = await GroupImage.findAll({
			where: { groupId: groupId }
		});

		const data = {};

		data.group = {
			id: group.id,
			organizerId: group.organizerId,
			name: group.name,
			about: group.about,
			type: group.type,
			private: group.private,
			city: group.city,
			state: group.state,
			createdAt: group.createdAt,
			updatedAt: group.updatedAt,
			numMembers: numMembers
		};

		data.GroupImages = GroupImages;
		data.Organizer = Users;
		data.Venues = group.Venue;

		res.json(data);
	}
});

// create a group
router.post("/", requireAuth, async (req, res, next) => {
	const userId = req.user.id;

	const { name, about, type, private, city, state } = req.body;

	const newGroup = await Group.create({
		organizerId: userId,
		name,
		about,
		type,
		private,
		city,
		state
	});

	await newGroup.createMembership({
		status: "co-host",
		userId: userId
	});

	res.json(newGroup);
});

// Get all Groups
router.get("/", async (req, res) => {
	const groups = await Group.findAll({
		attributes: {
			include: [
				[sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],
				[sequelize.col("GroupImages.url"), "previewImage"]
			]
		},
		include: [
			{
				model: Membership,
				//where: { status: ["member", "co-host"] },
				attributes: []
			},
			{
				model: GroupImage,
				attributes: []
			}
		],
		raw: true,
		group: ["Group.id", "GroupImages.url"]
	});
	res.json({ Groups: groups });
});

module.exports = router;
