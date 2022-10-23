const {Router} = require("express");
const multer = require("multer");

const UserControllers = require("../controllers/userControllers");
const UserAvatarController = require("../controllers/userAvatarController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const uploadConfig = require("../configs/upload");

const userRoutes = Router();

const userControllers = new UserControllers();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.MULTER);

userRoutes.post("/", userControllers.create);
userRoutes.put("/", ensureAuthenticated,  userControllers.update);
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);
userRoutes.delete("/", ensureAuthenticated,  userControllers.delete);


module.exports = userRoutes;