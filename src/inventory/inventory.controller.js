// Layer untuk handle request, response dan validasi body

const express = require("express");
const { prisma } = require("../db");
const { getAllInventorys, getInventoryById, deleteInventoryById, createInventory, editInventoryById, getInventoryBySAP } = require('./inventory.service');

const router = express.Router();

router.get("/", async (req, res)=>{
    const inventory = await getAllInventorys();
    res.send(inventory);
});

router.get("/:id", async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const inventory = await getInventoryById(parseInt(id));
        res.send(inventory);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.post("/", async (req, res) => {
    try {
        const newInventory = req.body;
        const match = await getInventoryBySAP(newInventory.sap_code);

        if(match == null){
            const inventory = await createInventory(newInventory);
            res.send({
                message: "Success create inventory!"
            });
        }
        else{
            if(newInventory.sap_code == match.sap_code){
                return res.send("SAP Code a ready")
            }
            else{
                const inventory = await createInventory(newInventory);
                res.send({
                    message: "Success create inventory!"
                });
            }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.delete("/:Id", async (req, res) => {
    try {
        const id = req.params.Id
        await deleteInventoryById(parseInt(id));
        res.send({
            message: "Inventory delete success!"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const inventoryID = req.params.id;
        const inventoryData = req.body;
    
        if(!(inventoryData)){
            return res.status(400).send("Some field are missing");
        }
        
        if(getInventoryById(parseInt(inventoryID))){
            const inventory = await editInventoryById(parseInt(inventoryID), inventoryData);
            res.send({
                message: "Edit inventory success"
            })
        }
        else{
            return res.send("Inventory not found")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const inventoryID = req.params.id;
        const inventoryData = req.body;
        
        if(getInventoryById(parseInt(inventoryID))){
            const inventory = await editInventoryById(parseInt(inventoryID), inventoryData);
            res.send({
                message: "Edit inventory success"
            })
        }
        else{
            return res.send("Inventory not found")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;