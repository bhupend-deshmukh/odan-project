const router = require("express").Router()
const { generateToken, verifyToken } = require("../auth/auth")
const knex = require("../config/db")

router.post("/:userId/documents", verifyToken, async(req, res)=>{
    const {name, documentId} = req.body
    const userId = req.params.userId
    if(!(name && documentId)) return res.status(400).json("name and documentId is missing")
    try {
        await knex("UserDocument").insert({documentId, name, userId})
        res.send("document added")
    } catch (error) {
        res.send(error.message)
    }
})


router.get("/:userId/documents", verifyToken, async(req, res)=>{
    try {
        const data = await knex("UserDocument").where({userId:req.params.userId})
        if(data.length ===0) return res.send("data with this id is not there")
        res.send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.put("/:userId", verifyToken, async(req, res)=>{
    try {
        await knex("Users").update(req.body).where({userId:req.params.userId})
        res.send("updated......")
    } catch (error) {
        res.send(error.message)
    }
})


router.get("/:userId", verifyToken, async(req, res)=>{
    try {
        const user = await knex("Users").where({userId:req.params.userId})
        const docs = await knex("UserDocument").where({userId:req.params.userId})
        res.send({
            user, docs
        })
    } catch (error) {
        
    }
})
        

module.exports = router