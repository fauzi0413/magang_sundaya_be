// Layer untuk handle request, response dan validasi body

const express = require("express");
const { prisma } = require("../db");
const { getAllUsers, getAllUsersLogs, createUser, deleteUserById, editUserById, getUserById } = require('./user.service');

const router = express.Router();

router.get("/", async (req, res)=>{
    const user = await getAllUsers();
    res.send(user);
});

router.get("/logs", async (req, res)=>{
    const login_logs = await getAllUsersLogs();
    res.send(login_logs);
});

router.get("/:id", async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const user = await getUserById(parseInt(id));
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.post("/", async (req, res) => {
    try {
        const newUser = req.body;
        const user = await createUser(newUser);
        res.send({
            message: "Success create user!"
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.delete("/:Id", async (req, res) => {
    try {
        const id = req.params.Id
        await deleteUserById(parseInt(id));
        res.send({
            message: "User delete success!"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const userID = req.params.id;
        const userData = req.body;
    
        if(!(
            userData.username && 
            userData.password && 
            userData.role && 
            userData.token
        )){
            return res.status(400).send("Some field are missing");
        }
        
        if(getUserById(parseInt(userID))){
            const user = await editUserById(parseInt(userID), userData);
            res.send({
                message: "Edit user success"
            })
        }
        else{
            return res.send("User not found")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const userID = req.params.id;
        const userData = req.body;

        const user = await editUserById(parseInt(userID), userData);
    
        res.send({
            message: "Edit user success"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;