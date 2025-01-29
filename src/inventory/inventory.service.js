const prisma = require("../db");
const { findInventory, findInventoryById, insertInvetory, editInvetory, findInventoryBySAP, deleteInventory } = require("./inventory.repository");

const getAllInventorys = async() => {
    const inventory = await findInventory();
    return inventory;
};

const getInventoryById = async (id) =>{
    const inventory = await findInventoryById(id);

    if(!inventory){
        throw Error("Inventory not found")
    }

    return inventory
};

const getInventoryBySAP = async (sap_code) =>{
    const inventory = await findInventoryBySAP(sap_code);

    // if(inventory == null){
    //     console.log(inventory)
    //     throw Error("Inventory not found")
    // }

    return inventory
};

const createInventory = async (newInventory) => {
    const inventory = await insertInvetory(newInventory);

    return inventory
};

const deleteInventoryById = async (id) =>{
    // Untuk pengecakan data apakah ada data warehouse atau tidak sebelum didelete
    await getInventoryById(id);
    await deleteInventory(id);
};

const editInventoryById = async (id, data) => {
    await getInvetoryById(id)

    const inventory = await editInvetory(id, data);

    return inventory
};

module.exports = {
    getAllInventorys,
    getInventoryById,
    getInventoryBySAP,
    createInventory,
    deleteInventoryById,
    editInventoryById,
}