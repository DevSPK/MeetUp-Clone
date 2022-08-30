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
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const membership = require("../../db/models/membership");
const router = express.Router();

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
		group: ["Group.id"]
	});
	res.json({ Groups: [groups] });
});

module.exports = router;
