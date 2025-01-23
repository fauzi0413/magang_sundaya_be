// Layer untuk handle request, response dan validasi body

const express = require("express");
const { prisma } = require("../db");
const { getAllSites, getSiteById, getSiteByIdCluster, createSite, deleteSiteById, editSiteById } = require('./site.service');

const router = express.Router();

router.get("/", async (req, res)=>{
    const site_information = await getAllSites();
    res.send(site_information);
});

router.get("/:id", async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const site_information = await getSiteById(parseInt(id));
        res.send(site_information);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.post("/", async (req, res) => {
    try {
        const newSite = req.body;
        const id_cluster = await getSiteByIdCluster(parseInt(newSite.id_cluster));
        
        if(!(newSite.id_cluster == id_cluster.id)){
            return res.send("Cluster not found")
        }
        else{
            const site_information = await createSite(newSite);
            res.send({
                message: "Success create site information!"
            });
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.delete("/:Id", async (req, res) => {
    try {
        const id = req.params.Id
        await deleteSiteById(parseInt(id));
        res.send({
            message: "Site information delete success!"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const siteID = req.params.id;
        const siteData = req.body;
    
        if(!(siteData)){
            return res.status(400).send("Some field are missing");
        }
        
        if(getSiteById(parseInt(siteID))){
            const inventory = await editSiteById(parseInt(siteID), siteData);
            res.send({
                message: "Edit site information success"
            })
        }
        else{
            return res.send("Site information not found")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const siteID = req.params.id;
        const siteData = req.body;
        
        if(getSiteById(parseInt(siteID))){
            const inventory = await editSiteById(parseInt(siteID), siteData);
            res.send({
                message: "Edit site information success"
            })
        }
        else{
            return res.send("Site information not found")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;