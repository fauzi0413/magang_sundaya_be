// Tujuan repository untuk berkomunikasi dengan DATABASE
// Boleh pakai ORM, boleh pakai RAW Query

const prisma = require("../db")

const findCluster = async () => {
    const cluster = await prisma.cluster_detail.findMany();
    return cluster;
};

const findClusterById = async (id) => {
    const cluster = await prisma.cluster_detail.findUnique({
        where:{
            id,
        },
    });

    return cluster;
};

const insertCluster = async (newCluster) => {
    const cluster = await prisma.cluster_detail.create({
        data:newCluster,
    });

    return cluster
};

const deleteCluster = async (id) => {
    await prisma.cluster_detail.delete({
        where:{
            id: parseInt(id),
        },
    });
};

const editCluster = async (clusterID, newCluster) => {
    const cluster = await prisma.cluster_detail.update({
        where:{
            id: parseInt(clusterID)
        },
        data:newCluster
    });

    return cluster
}

module.exports = {
    findCluster,
    findClusterById,
    insertCluster,
    deleteCluster,
    editCluster,
};