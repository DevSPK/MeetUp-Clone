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

router.get("/current", requireAuth, async (req, res, next) => {
	res.send("success");
});

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

router.post("/", requireAuth, validateGroup, async (req, res, next) => {
	const userId = req.user.id;

	const { name, about, type, private, city, state } = req.body;

	const group = await Group.create({
		organizerId: userId,
		name,
		about,
		type,
		private,
		city,
		state
	});

	res.json(group);
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
				where: { status: ["member", "co-host"] },
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
