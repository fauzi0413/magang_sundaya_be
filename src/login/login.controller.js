// Layer untuk handle request, response dan validasi body
require('dotenv').config();
const express = require("express");
const { prisma } = require("../db");
const { loginUser, getAllLoginLogs } = require('./login.service');
const jsonwebtoken = require('jsonwebtoken');
const { updateToken, findUser } = require('./login.repository');

const router = express.Router();

router.post("/", async(req, res) => {
    try {
        const loginData = req.body
        const login = await loginUser(loginData);

        if(login.username == loginData.username){
            const userID = login.id
            const username = login.username
            const role = login.role
            
            const accessToken = jsonwebtoken.sign({userID, username, role}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '20s'
            });
            
            const refreshToken = jsonwebtoken.sign({userID, username, role}, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: '1d'
            });

            // await updateToken(userID, refreshToken)

            // res.cookie('refreshToken', refreshToken, {
            //     httpOnly: true,
            //     maxAge: 24 * 60 * 60 * 1000, //24 jam hitungan dalam milisecond
            //     // secure: true, //untuk saat di hosting
            // })

            res.json({ accessToken })

            res.status(200).send({
                message: "Login Berhasil",
                token: token,
            })
        }
        else{
            res.status(400).send("Username or password incorrect!")
        }
    } catch (error) {
        // res.status(400).send(error.message)
    }
})

router.get("/logs", async (req, res)=>{
    const login_logs = await getAllLoginLogs();
    res.send(login_logs);
});

router.get("/refreshToken", async(res, req) => {
    try {
        const refreshToken = req.cookie.refreshToken
        if((refreshToken)){
            return res.status(401)
        }
        const user = await findUser(refreshToken)
        if(!user[0]){
            return res.status(403)
        }
        jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if(error){
                res.status(403)
            }
            const userID = user[0].id
            const username = user[0].username
            const role = user[0].role
            const accessToken = jsonwebtoken.sign({
                userID,
                username,
                role
            }, process.env.ACCESS_TOKEN_SECRET, ({
                expiresIn: '15s'
            }));
            res.json({ accessToken })
        })
    } catch (error) {
        console.log(error)
    }
})

router.delete("/logout", async(req,res) => {
    const refreshToken = req.cookie.refreshToken

    if(!(refreshToken)){
        return res.status(204)
    }
    const user = await findUser(refreshToken)
    if(!user[0]){
        return res.status(204)
    }
    const userID = user[0].id
    const refreshTokenNew = null
    await updateToken(userID, refreshTokenNew)
    res.clearCookie('refreshToken')
    return res.status(200)
})

module.exports = router;