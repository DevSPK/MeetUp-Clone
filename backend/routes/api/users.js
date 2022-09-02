// backend/routes/api/users.js
const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// The validateSignup middleware is composed of the check and handleValidationErrors middleware. It checks to see if req.body.email exists and is an email, req.body.username is a minimum length of 4 and is not an email, and req.body.password is not empty and has a minimum length of 6. If at least one of the req.body values fail the check, an error will be returned as the response.

const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Please provide a username with at least 4 characters."),
	check("username").not().isEmail().withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	check("firstName")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a first name."),
	check("lastName")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a last name."),
	handleValidationErrors
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
	const { email, password, username, firstName, lastName } = req.body;
	const user = await User.signup({
		email,
		username,
		password,
		firstName,
		lastName
	});

	await setTokenCookie(res, user);

	let data = {};

	data.user = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		token: ""
	};

	return res.json(data.user);
});

module.exports = router;
