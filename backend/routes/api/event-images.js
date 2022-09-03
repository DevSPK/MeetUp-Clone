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
	res.send("success");
});

module.exports = router;
