const express = require("express");
const app = express();
const morgan = require("morgan")
const orderRoute = require("./route/orderRoute")
const userRoute = require("./route/userRoute")
const requisitionRoute = require("./route/requisitionRoute")
const cors = require("cors");
app.use(cors());


path = require('path')

app.use(morgan(process.env.LOG_LEVEL));
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use("/api/v2/users", userRoute);
app.use("/api/v2/orders", orderRoute);
app.use("/api/v2/requisitions", requisitionRoute);



module.exports = app;




