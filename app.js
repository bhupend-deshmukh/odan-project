const express = require("express");
const app = express();

const knex = require("./config/db")

app.use(express.json())

app.use("/auth", require("./routers/auth.routers"))
app.use("/users", require("./routers/users.routers"))


app.listen(4000)
