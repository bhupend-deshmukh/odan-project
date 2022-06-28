const router = require("express").Router()
const { generateToken, verifyToken } = require("../auth/auth")
const knex = require("../config/db")

router.post("/register", async (req, res) => {
    const { name, email, dob, isAdmin = false, password } = req.body
    if (!(name && email && dob && password)) {
        return res.status(400).send("please fill all the inputs")
    }
    try {
        const user = await knex("Users").insert({
            name, email, dob, isAdmin, password
        })
        res.status(201).json({ status: "success", msg: "user created" })
    } catch (error) {
        res.status(500).json({
            status: "failed", error: error.message
        })
    }
})


router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!(email && password)) return res.status(400).send("email and password is required")
    try {
        const user = await knex("Users").where({ email, password });
        if (user.length === 0) {
            return res.status(400).json({
                status: "error", msg: "user does not exist"
            })
        }
        const token = generateToken(user[0].userId)
        res.cookie("token", token).send("login success")
    } catch (error) {

    }
})



module.exports = router