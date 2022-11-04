/*require("dotenv").config();
const app = require("./app");


const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})*/


require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/database");

const cors = require("cors");
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());
app.use("/", require("./routes/movies"))
app.use("/user", require("./routes/userRoutes"))
app.use("/servey", require("./routes/surveyRoutes"))

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));