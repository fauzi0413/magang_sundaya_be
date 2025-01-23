// Tujuan repository untuk berkomunikasi dengan DATABASE
// Boleh pakai ORM, boleh pakai RAW Query

const prisma = require("../db")

const findClusterStock = async () => {
    const cluster_stock = await prisma.cluster_stock.findMany();
    return cluster_stock;
};

const findClusterStockLogs = async () => {
    const cluster_stock_logs = await prisma.cluster_stock_logs.findMany();
    return cluster_stock_logs;
};

const findClusterStockById = async (id) => {
    const cluster_stock = await prisma.cluster_stock.findUnique({
        where:{
            id,
        },
    });

    return cluster_stock;
};

const insertClusterStock = async (newClusterStock) => {
    const cluster_stock = await prisma.cluster_stock.create({
        data:{
            id_cluster: newClusterStock.id_cluster,
            total_site: newClusterStock.total_site,
            sap_code: newClusterStock.sap_code,
            total: newClusterStock.total,
            status_barang: newClusterStock.status_barang,
            user: newClusterStock.user,
        },
    });

    return cluster_stock
};

const insertClusterStockLogs = async (newClusterStock) => {
    const last_id_data = await prisma.cluster_stock.aggregate({
        _max:{
            id: true
        }
    })
    const cluster_stock_logs = await prisma.cluster_stock_logs.create({
        data:{
            id_data : last_id_data._max.id,
            id_cluster: newClusterStock.id_cluster,
            total_site: newClusterStock.total_site,
            sap_code: newClusterStock.sap_code,
            total: newClusterStock.total,
            status_barang: "Masuk",
            action: "insert",
            user: newClusterStock.user,
        },
    });

    return cluster_stock_logs
};

const deleteClusterStock = async (id) => {
    await prisma.cluster_stock.delete({
        where:{
            id: parseInt(id),
        },
    });
};

const editClusterStock = async (clusterstockId, clusterstockData) => {
    const cluster_stock = await prisma.cluster_stock.update({
        where:{
            id: parseInt(clusterstockId)
        },
        data:{
            id_cluster: clusterstockData.id_cluster,
            total_site: clusterstockData.total_site,
            sap_code: clusterstockData.sap_code,
            total: clusterstockData.total,
            status_barang: clusterstockData.status_barang,
            user: clusterstockData.user,
        }
    });

    return cluster_stock
}

const editClusterStockLogs = async (id, newClusterStock) => {
    const cluster_stock = await prisma.cluster_stock.findFirst({
        where:{
            id,
        }
    })

    if(cluster_stock.total > newClusterStock.total){
        newClusterStock.status_barang = "Keluar"
    }else if(cluster_stock.total == newClusterStock.total){
        newClusterStock.status_barang = "Tetap"
    }
    else{
        newClusterStock.status_barang = "Masuk"
    }

    const cluster_stock_logs = await prisma.cluster_stock_logs.create({
        data:{
            id_data : cluster_stock.id,
            id_cluster: newClusterStock.id_cluster,
            total_site: newClusterStock.total_site,
            sap_code: newClusterStock.sap_code,
            total: newClusterStock.total,
            status_barang: newClusterStock.status_barang,
            action: "update",
            user: newClusterStock.user,
        },
    });
    return cluster_stock_logs
}

module.exports = {
    findClusterStock,
    findClusterStockById,
    insertClusterStock,
    deleteClusterStock,
    editClusterStock,

    findClusterStockLogs,
    insertClusterStockLogs,
    editClusterStockLogs,
};