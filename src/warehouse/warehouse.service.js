const prisma = require("../db");
const { findWarehouse, findWarehouseById, insertWarehouse, editWarehouse, findWarehouseLogs, insertWarehouseLogs, editWarehouseLogs, deleteWarehouse } = require("./warehouse.repository");

const getAllWarehouses = async() => {
    const warehouses = await findWarehouse();
    return warehouses;
};

const getAllWarehousesLogs = async() => {
    const warehouses_logs = await findWarehouseLogs();
    return warehouses_logs;
};

const getWarehouseById = async (id) =>{
    const warehouse = await findWarehouseById(id);

    if(!warehouse){
        throw Error("Warehouse not found")
    }

    return warehouse
};

const createWarehouse = async (newWarehouse) => {
    const warehouse = await insertWarehouse(newWarehouse);
    const warehouse_logs = await insertWarehouseLogs(newWarehouse);

    return warehouse, warehouse_logs
};

const deleteWarehouseById = async (id) =>{
    // Untuk pengecakan data apakah ada data warehouse atau tidak sebelum didelete
    await getWarehouseById(id);
    await deleteWarehouse(id);
};

const editWarehouseById = async (id, data) => {
    await getWarehouseById(id)

    const warehouse_logs = await editWarehouseLogs(id, data);
    const warehouse = await editWarehouse(id, data);

    return warehouse, warehouse_logs
};

module.exports = {
    getAllWarehouses,
    getWarehouseById,
    createWarehouse,
    deleteWarehouseById,
    editWarehouseById,

    getAllWarehousesLogs,
}