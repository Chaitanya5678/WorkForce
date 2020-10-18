const express = require("express");

const router = express.Router();

const usersController = require("../controllers/usersController");

const passport = require("passport");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);

router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);

router.get("/post-job", passport.checkAuthentication, usersController.postJob);
router.get("/apply-job", passport.checkAuthentication, usersController.applyJob);
router.get("/expert-help", passport.checkAuthentication, usersController.support);
router.post("/search", passport.checkAuthentication, usersController.searchJob);

router.post(
  "/create-job",
  passport.checkAuthentication,
  usersController.createJob
);

router.get("/sign-out", usersController.destroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

module.exports = router;
