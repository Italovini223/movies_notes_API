const {Router} = require("express");

const UserControllers = require("../controllers/userControllers");

const userRoutes = Router();

const userControllers = new UserControllers();

userRoutes.post("/", userControllers.create);

module.exports = userRoutes;