const prisma = require("../db");
const { findSite, findSiteById, insertSite, deleteSite, editSite, findSiteByIdCluster } = require("./site.repository");

const getAllSites = async() => {
    const site_information = await findSite();
    return site_information;
};

const getSiteById = async (id) =>{
    const site_information = await findSiteById(id);

    if(!site_information){
        throw Error("Site information not found")
    }

    return site_information
};

const getSiteByIdCluster = async (id) =>{
    const id_cluster = await findSiteByIdCluster(id);

    return id_cluster
};

const createSite = async (newSite) => {
    const site_information = await insertSite(newSite);

    return site_information
};

const deleteSiteById = async (id) =>{
    // Untuk pengecakan data apakah ada data warehouse atau tidak sebelum didelete
    await getSiteById(id);
    await deleteSite(id);
};

const editSiteById = async (id, data) => {
    await getSiteById(id)

    const site_information = await editSite(id, data);

    return site_information
};

module.exports = {
    getAllSites,
    getSiteById,
    getSiteByIdCluster,
    createSite,
    deleteSiteById,
    editSiteById,
}