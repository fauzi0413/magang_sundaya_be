const prisma = require("../db");
const { findCluster, insertCluster, findClusterById, deleteCluster, editCluster } = require("./cluster_detail.repository");

const getAllCluster = async() => {
    const cluster = await findCluster();
    return cluster;
};

const getClusterById = async (id) =>{
    const cluster = await findClusterById(id);

    if(!cluster){
        throw Error("Cluster not found")
    }

    return cluster
};

const createCluster = async (newCluster) => {
    const cluster = await insertCluster(newCluster);

    return cluster
};

const deleteClusterById = async (id) =>{
    // Untuk pengecakan data apakah ada data warehouse atau tidak sebelum didelete
    await getClusterById(id);
    await deleteCluster(id);
};

const editClusterById = async (id, data) => {
    await getClusterById(id)

    const cluster = await editCluster(id, data);

    return cluster
};

module.exports = {
    getAllCluster,
    getClusterById,
    createCluster,
    deleteClusterById,
    editClusterById,
}