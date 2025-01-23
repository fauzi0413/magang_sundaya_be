// Layer untuk handle request, response dan validasi body

const express = require("express");
const { prisma } = require("../db");
const { getAllMaterials, getMaterialById, createMaterial, deleteMaterialById, editMaterialById } = require('./material.service');

const router = express.Router();

router.get("/", async (req, res)=>{
    const material = await getAllMaterials();
    res.send(material);
});

router.get("/:id", async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const material = await getMaterialById(parseInt(id));
        res.send(material);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.post("/", async (req, res) => {
    try {
        const newMaterial = req.body;
        const material = await createMaterial(newMaterial);
        res.send({
            message: "Success create material!"
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.delete("/:Id", async (req, res) => {
    try {
        const id = req.params.Id
        await deleteMaterialById(parseInt(id));
        res.send({
            message: "Material delete success!"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const materialID = req.params.id;
        const materialData = req.body;
    
        if(!(materialData)){
            return res.status(400).send("Some field are missing");
        }
        
        if(getMaterialById(parseInt(materialID))){
            const material = await editMaterialById(parseInt(materialID), materialData);
            res.send({
                message: "Edit material success"
            })
        }
        else{
            return res.send("Material not found")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const materialID = req.params.id;
        const materialData = req.body;

        const material = await editMaterialById(parseInt(materialID), materialData);
    
        res.send({
            message: "Edit material success"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;