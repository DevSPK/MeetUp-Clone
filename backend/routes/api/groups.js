const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
	User,
	Group,
	sequelize,
	Membership,
	GroupImage,
	Sequelize
} = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const membership = require("../../db/models/membership");

const router = express.Router();

const validateGroup = [
	check("name")
		.not()
		.isEmpty()
		.isLength({ max: 60 })
		.withMessage("Name must be 60 characters or less"),
	check("about")
		.not()
		.isEmpty()
		.isLength({ min: 50 })
		.withMessage("About must be 50 characters or more"),
	check("type")
		.isIn(["Online", "In person"])
		.withMessage("Type must be 'Online' or 'In person'"),
	check("private").isBoolean().withMessage("Private must be a boolean"),
	check("city").not().isEmpty().withMessage("City is required"),
	check("state").not().isEmpty().withMessage("State is required"),
	handleValidationErrors
];

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

router.get("/current", requireAuth, async (req, res, next) => {
	const Op = Sequelize.Op;
	const userId = req.user.id;

	const user = await User.findByPk(userId);

	//console.log(user);
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

		group: ["Group.id", "GroupImages.url", "Memberships.id"]
	});

	res.json({ Groups: groups });
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
