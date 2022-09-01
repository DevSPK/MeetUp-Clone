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
	Sequelize
} = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const membership = require("../../db/models/membership");

const router = express.Router();

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

module.exports = router;
