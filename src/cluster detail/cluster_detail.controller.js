// Layer untuk handle request, response dan validasi body

const express = require("express");
const { prisma } = require("../db");
const { getAllCluster, createCluster, getClusterById, deleteClusterById, editClusterById } = require('./cluster_detail.service');
const { getUserById } = require("../user/user.service");

const router = express.Router();

router.get("/", async (req, res)=>{
    const cluster = await getAllCluster();
    res.send(cluster);
});

router.get("/:id", async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const cluster = await getClusterById(parseInt(id));
        res.send(cluster);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.post("/", async (req, res) => {
    try {
        const newCluster = req.body;
        const cek_user = await getUserById(newCluster.userid)
        if(cek_user){
            const cluster = await createCluster(newCluster);
            res.send({
                message: "Success create cluster!"
            });
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.delete("/:Id", async (req, res) => {
    try {
        const id = req.params.Id
        await deleteClusterById(parseInt(id));
        res.send({
            message: "Cluster delete success!"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const clusterID = req.params.id;
        const clusterData = req.body;
    
        if(!(clusterData)){
            return res.status(400).send("Some field are missing");
        }
        
        if(getClusterById(parseInt(clusterID))){
            const cluster = await editClusterById(parseInt(clusterID), clusterData);
            res.send({
                message: "Edit cluster success"
            })
        }
        else{
            return res.send("cluster not found")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const clusterID = req.params.id;
        const clusterData = req.body;

        const user = await editClusterById(parseInt(clusterID), clusterData);
    
        if(getClusterById(parseInt(clusterID))){
            const cluster = await editClusterById(parseInt(clusterID), clusterData);
            res.send({
                message: "Edit cluster success"
            })
        }
        else{
            return res.send("cluster not found")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;