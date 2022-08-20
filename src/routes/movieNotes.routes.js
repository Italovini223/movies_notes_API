const {Router} = require("express");
const movieNotesControllers = require("../controllers/movieNotesControllers");

const notesRouter = Router();
const notesController = new movieNotesControllers();

