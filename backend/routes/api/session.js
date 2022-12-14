// backend/routes/api/session.js

const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth
} = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//  The validateLogin middleware is composed of the check and handleValidationErrors middleware. It checks to see whether or not req.body.credential and req.body.password are empty. If one of them is empty, then an error will be returned as the response.
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors
];

// Restore session user
router.get("/", restoreUser, (req, res) => {
  // console.log("in get api/session");
  const { user } = req;

  if (user) {
    return res.json(user.toSafeObject());
  } else return res.json(null);
});

//Get current user
//might need to reroute this using an exact path

// router.get("/", requireAuth, async (req, res, next) => {
// 	const userId = req.user.id;

// 	const user = await User.findByPk(userId);

// 	let data = {
// 		id: user.id,
// 		firstName: user.firstName,
// 		lastName: user.lastName,
// 		email: user.email
// 	};
// 	res.json(data);
// });

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
    // res.status(401);
    // return res.json({
    // 	message: "Invalid credentials",
    // 	statusCode: 401
    // });
  }

  let token = await setTokenCookie(res, user);

  let data = {};

  data.user = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: token
  };

  return res.json(data.user);
});

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
