const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
	User,
	Group,
	sequelize,
	Membership,
	GroupImage,
	Venue,
	Sequelize
} = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const membership = require("../../db/models/membership");

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

// Add an Image to a Group based on the Group's id
router.post("/:groupId/images", requireAuth, async (req, res, next) => {
	const { groupId } = req.params;
	console.log(groupId);

	const { url, preview } = req.body;

	const groupCheck = await Group.findByPk(groupId);
	console.log(groupCheck);
	if (!groupCheck) {
		res.status(404);
		res.json({ message: "Group couldn't be found", statusCode: 404 });
	} else {
		const addImage = await GroupImage.create({
			groupId,
			url
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

router.put("/:groupId", requireAuth, async (req, res, next) => {
	const userId = req.user.id;
	const { groupId } = req.params;
	const { name, about, type, private, city, state } = req.body;

	const group = await Group.findByPk(groupId);
	if (!group) {
		res.status(404);
		res.json({
			message: "Group couldn't be found",
			statusCode: 404
		});
	}
	if (userId !== group.organizerId) {
		res.status(403);
		res.json({
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
		group: ["Group.id", "GroupImages.url", "Memberships.id"]
	});
	res.json({ Groups: groups });
});

module.exports = router;
