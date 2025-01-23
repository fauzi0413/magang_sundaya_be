// Tujuan repository untuk berkomunikasi dengan DATABASE
// Boleh pakai ORM, boleh pakai RAW Query

const prisma = require("../db")

const findWarehouse = async () => {
    const warehouse = await prisma.warehouse.findMany();
    return warehouse;
};

const findWarehouseLogs = async () => {
    const warehouse_logs = await prisma.warehouse_logs.findMany();
    return warehouse_logs;
};

const findWarehouseById = async (id) => {
    const warehouse = await prisma.warehouse.findUnique({
        where:{
            id,
        },
    });

    return warehouse;
};

const insertWarehouse = async (newWarehouse) => {
    const warehouse = await prisma.warehouse.create({
        data:{
            sap_code: newWarehouse.sap_code,
            total_barang: newWarehouse.total_barang,
            status_barang: newWarehouse.status_barang,
            user: newWarehouse.user,
        },
    });

    return warehouse
};

const insertWarehouseLogs = async (newWarehouse) => {
    const last_id_data = await prisma.warehouse.aggregate({
        _max:{
            id: true
        }
    })
    console.log(last_id_data)
    const warehouse = await prisma.warehouse_logs.create({
        data:{
            id_data : last_id_data._max.id,
            sap_code: newWarehouse.sap_code,
            total_barang: newWarehouse.total_barang,
            status_barang: "Masuk",
            action: "insert",
            user: newWarehouse.user,
        },
    });

    return warehouse
};

const deleteWarehouse = async (id) => {
    await prisma.warehouse.delete({
        where:{
            id: parseInt(id),
        },
    });
};

const editWarehouse = async (warehouseId, warehouseData) => {
    const warehouse = await prisma.warehouse.update({
        where:{
            id: parseInt(warehouseId)
        },
        data:{
            total_barang: warehouseData.total_barang,
            status_barang: warehouseData.status_barang,
            user: warehouseData.user,
        }
    });

    return warehouse
}

const editWarehouseLogs = async (id, newWarehouse) => {
    
    const warehouseData = await prisma.warehouse.findFirst({
        where:{
            id,
        }
    })

    if(warehouseData.total_barang > newWarehouse.total_barang){
        newWarehouse.status_barang = "Keluar"
    }else if(warehouseData.total_barang == newWarehouse.total_barang){
        newWarehouse.status_barang = "Tetap"
    }
    else{
        newWarehouse.status_barang = "Masuk"
    }
    
    const warehouse = await prisma.warehouse_logs.create({
        data:{
            id_data: warehouseData.id,
            sap_code: warehouseData.sap_code,
            total_barang: newWarehouse.total_barang,
            status_barang: newWarehouse.status_barang,
            action: "update",
            user: newWarehouse.user,
        },
    });

    return warehouse

};

module.exports = {
    findWarehouse,
    findWarehouseById,
    insertWarehouse,
    deleteWarehouse,
    editWarehouse,

    findWarehouseLogs,
    insertWarehouseLogs,
    editWarehouseLogs,
};