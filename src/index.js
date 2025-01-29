const express = require("express");
const dotenv = require("dotenv");
const app = express ();
const cookieParser = require("cookie-parser")

const cors = require("cors")
app.use(cors())

// import { verifyToken } from "./middleware/verifyToken";

dotenv.config();

const PORT = process.env.PORT;

// MIDDLEWARE UNTUK BACA BODY MENGGUNAKAN PARSM
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("Hello World");
});

// USER REST API
const userController = require("./user/user.controller");
app.use("/users", userController);

// LOGIN & LOGIN LOGS REST API
const loginController = require("./login/login.controller");
app.use("/login", loginController);

// INVENTORY REST API
const inventoryController = require("./inventory/inventory.controller");
app.use("/inventory", inventoryController);

// MATERIAL REST API
const materialController = require("./material/material.controller");
app.use("/materials", materialController);

// WAREHOUSE REST API
const warehouseController = require("./warehouse/warehouse.controller");
app.use("/warehouses", warehouseController);

// CLUSTER STOCK & LOGS REST API
const clusterStockController = require("./cluster stock/cluster_stock.controller");
app.use("/clusterstocks", clusterStockController);

// CLUSTER DETAIL REST API
const clusterController = require("./cluster detail/cluster_detail.controller");
app.use("/clusters", clusterController);

// SITE INFORMATION REST API
const siteController = require("./site information/site.controller");
app.use("/siteinformations", siteController);

app.listen(PORT, ()=>{
    console.log("Express API running in port : " + PORT);
});