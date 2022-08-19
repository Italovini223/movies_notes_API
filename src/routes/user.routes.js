const {Router} = require("express");

const UserControllers = require("../controllers/userControllers");

const userRoutes = Router();

const userControllers = new UserControllers();

userRoutes.post("/", userControllers.create);
userRoutes.put("/:user_id", userControllers.update)

module.exports = userRoutes;