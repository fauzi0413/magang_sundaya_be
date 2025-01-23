// Layer untuk handle request, response dan validasi body

const express = require("express");
const { prisma } = require("../db");
const { getAllClusterStock, createClusterStock, deleteClusterStockById, editClusterStockById, getClusterStockById, getAllClusterStockLogs } = require('./cluster_stock.service');

const router = express.Router();

router.get("/", async (req, res)=>{
    const cluster_stock = await getAllClusterStock();
    res.send(cluster_stock);
});

router.get("/logs", async (req, res)=>{
    const cluster_stock_logs = await getAllClusterStockLogs();
    res.send(cluster_stock_logs);
});

router.get("/:id", async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const cluster_stock = await getClusterStockById(parseInt(id));
        res.send(cluster_stock);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.post("/", async (req, res) => {
    try {
        const newClusterStock = req.body;
        const cluster_stock = await createClusterStock(newClusterStock);
        res.send({
            message: "Success create cluster stock!"
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        await deleteClusterStockById(parseInt(id));
        res.send({
            message: "Cluster Stock delete success!"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const clusterstockId = req.params.id;
        const clusterstockData = req.body;
    
        if(!(
            clusterstockData.id_cluster &&
            clusterstockData.total_site && 
            clusterstockData.sap_code && 
            clusterstockData.total && 
            clusterstockData.status_barang &&
            clusterstockData.user
        )){
            return res.status(400).send("Some field are missing");
        }
        
        const cluster_stock = await editClusterStockById(parseInt(clusterstockId), clusterstockData);
    
        res.send({
            message: "Edit cluster stock success"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const clusterstockId = req.params.id;
        const clusterstockData = req.body;

        const cluster_stock = await editClusterStockById(parseInt(clusterstockId), clusterstockData);

        res.send({
            message: "Edit cluster stock success"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;