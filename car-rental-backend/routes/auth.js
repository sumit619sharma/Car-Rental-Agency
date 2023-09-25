const express = require("express");

const { userSignUp,carAgentSignUp,logInUser } = require("../controller/auth");

const authRouter = express.Router();

authRouter.post("/customer", userSignUp);
authRouter.post("/agent", carAgentSignUp);
authRouter.post("/login", logInUser);

module.exports = authRouter;
