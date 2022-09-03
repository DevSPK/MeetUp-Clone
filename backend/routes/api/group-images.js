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

router.delete("/:imageId", requireAuth, async (req, res, next) => {
	const { imageId } = req.params;

	const image = await GroupImage.findByPk(imageId);

	if (!image) {
		res.status(404);
		return res.json({
			message: "Group Image couldn't be found",
			statusCode: 404
		});
	} else {
		await image.destroy();

		res.status(200);
		return res.json({ message: "Successfully deleted", statusCode: 200 });
	}
});

module.exports = router;
