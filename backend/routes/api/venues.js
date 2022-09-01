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
	Sequelize
} = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const membership = require("../../db/models/membership");

const router = express.Router();

//  Edit a Venue specified by its id
router.put("/:venueId", requireAuth, async (req, res, next) => {
	const { userId } = req.user.id;
	const { venueId } = req.params;
	const { address, city, state, lat, lng } = req.body;

	const venue = await Venue.findByPk(venueId);

	if (!venue) {
		res.status(404);
		return res.json({
			message: "Venue couldn't be found",
			statusCode: 404
		});
	}

	const group = await Group.findOne({ where: { id: venue.groupId } });

	const membership = await Membership.findOne({
		where: { groupId: venue.groupId }
	});

	if (userId === group.organizerId || membership.status === "co-host") {
		venue.set({
			address,
			city,
			state,
			lat,
			lng
		});
		await venue.save();
		res.json(venue);
	} else {
		res.status(403);
		return res.json({
			message: "Forbidden",
			statusCode: 403
		});
	}
});

module.exports = router;
