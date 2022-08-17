const express = require('express');
const app = express();

const routes = require("./routes");


const PORT = 3333;

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});