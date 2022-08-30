const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Group, sequelize, Membership } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const membership = require("../../db/models/membership");
const router = express.Router();

router.get("/", async (req, res) => {
	const groups = await Group.findAll({
		attributes: {
			include: [
				[sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"]
			]
		},
		include: [
			{
				model: Membership,
				where: { status: ["member", "co-host"] },
				attributes: []
			}
		],
		group: ["Group.id"]
	});
	res.json(groups);
});

module.exports = router;
