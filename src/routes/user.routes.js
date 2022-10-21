const {Router} = require("express");

const UserControllers = require("../controllers/userControllers");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const userRoutes = Router();

const userControllers = new UserControllers();

userRoutes.post("/", userControllers.create);
userRoutes.put("/", ensureAuthenticated,  userControllers.update);
userRoutes.delete("/", ensureAuthenticated,  userControllers.delete);

module.exports = userRoutes;