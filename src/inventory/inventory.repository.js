// Tujuan repository untuk berkomunikasi dengan DATABASE
// Boleh pakai ORM, boleh pakai RAW Query

const prisma = require("../db")

const findInventory = async () => {
    const inventory = await prisma.inventory.findMany();
    return inventory;
};

const findInventoryById = async (id) => {
    const inventory = await prisma.inventory.findUnique({
        where:{
            id,
        },
    });

    return inventory;
};

const findInventoryBySAP = async (newSAP) => {
    const inventory = await prisma.inventory.findFirst({
        where:{
            sap_code: newSAP
        },
    });

    return inventory;
};

const insertInvetory = async (newInventory) => {
    const inventory = await prisma.inventory.create({
        data:{
            sap_code : newInventory.sap_code,
            name : newInventory.name,
            status : "show",
            description : newInventory.description,
            min_stock : newInventory.min_stock,
            user : newInventory.user,
        }
    });

    return inventory
};

const deleteInventory = async (id) => {
    await prisma.inventory.delete({
        where:{
            id: parseInt(id),
        },
    });
};

const editInvetory = async (inventoryID, newInventory) => {
    const inventory = await prisma.inventory.update({
        where:{
            id: parseInt(inventoryID)
        },
        data:{
            // sap_code : newInventory.sap_code,
            name : newInventory.name,
            status : newInventory.status,
            description : newInventory.description,
            min_stock : newInventory.min_stock,
            user : newInventory.user,
        }
    });

    return inventory
}

module.exports = {
    findInventory,
    findInventoryById,
    findInventoryBySAP,
    insertInvetory,
    deleteInventory,
    editInvetory,
};