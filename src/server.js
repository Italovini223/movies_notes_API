require("express-async-errors");

const database = require("./database/sqlite");
const uploadConfig = require("./configs/upload")

const express = require('express');
const cors = require("cors");

const app = express();

const routes = require("./routes");

const appError = require("./utils/appError")

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

database();

app.use((error, request, response, next) => {
  if(error instanceof appError) {
    return response.status(error.statusCode).json({
      status: "Invalid entry",
      message: error.message
    });
  }

  console.log(error.message);

  return response.status(500).json({
    status: "Server Error",
    message: "Internal error"
  });
})



const PORT = 3333;


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});