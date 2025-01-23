const prisma = require("../db");
const { findClusterStock, findClusterStockById, insertClusterStock, findClusterStockLogs, insertClusterStockLogs, editClusterStock, editClusterStockLogs } = require("./cluster_stock.repository");

const getAllClusterStock = async() => {
    const cluster_stock = await findClusterStock();
    return cluster_stock;
};

const getAllClusterStockLogs = async() => {
    const cluster_stock_logs = await findClusterStockLogs();
    return cluster_stock_logs;
};

const getClusterStockById = async (id) =>{
    const warehouse = await findClusterStockById(id);

    if(!warehouse){
        throw Error("Cluster stock not found")
    }

    return warehouse
};

const createClusterStock = async (newClusterStock) => {
    const cluster_stock = await insertClusterStock(newClusterStock);
    const cluster_stock_logs = await insertClusterStockLogs(newClusterStock);
    return cluster_stock, cluster_stock_logs;
};

const deleteClusterStockById = async (id) =>{
    // Untuk pengecakan data apakah ada data warehouse atau tidak sebelum didelete
    await getClusterStockById(id);
    await deleteClusterStockById(id);
};

const editClusterStockById = async (id, data) => {
    await getClusterStockById(id)

    const cluster_stock_logs = await editClusterStockLogs(id, data);
    const cluster_stock = await editClusterStock(id, data);

    return cluster_stock, cluster_stock_logs;
};

module.exports = {
    getAllClusterStock,
    getClusterStockById,
    createClusterStock,
    deleteClusterStockById,
    editClusterStockById,

    getAllClusterStockLogs,
}