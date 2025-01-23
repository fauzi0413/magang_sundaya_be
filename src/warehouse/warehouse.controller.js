// Layer untuk handle request, response dan validasi body

const express = require("express");
const { prisma } = require("../db");
const { getAllWarehouses, getWarehouseById, createWarehouse, deleteWarehouseById, editWarehouseById, getAllWarehousesLogs } = require('./warehouse.service');

const router = express.Router();

router.get("/", async (req, res)=>{
    const warehouse = await getAllWarehouses();
    res.send(warehouse);
});

router.get("/logs", async (req, res)=>{
    const warehouse_logs = await getAllWarehousesLogs();
    res.send(warehouse_logs);
});

router.get("/:id", async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const warehouse = await getWarehouseById(id);
        res.send(warehouse);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.post("/", async (req, res) => {
    try {
        const newWarehouse = req.body;
        const warehouse = await createWarehouse(newWarehouse);
        res.send({
            message: "Success create warehouse!"
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.delete("/:Id", async (req, res) => {
    try {
        const id = req.params.Id
        await deleteWarehouseById(parseInt(id));
        res.send({
            message: "Warehouse delete success!"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const warehouseId = req.params.id;
        const warehouseData = req.body;
    
        if(!(warehouseData)){
            return res.status(400).send("Some field are missing");
        }
        
        const warehouse = await editWarehouseById(parseInt(warehouseId), warehouseData);
    
        res.send({
            message: "Edit warehouse success"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const warehouseId = req.params.id;
        const warehouseData = req.body;

        const warehouse = await editWarehouseById(parseInt(warehouseId), warehouseData);

        res.send({
            message: "Edit warehouse success"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;