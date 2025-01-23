// Tujuan repository untuk berkomunikasi dengan DATABASE
// Boleh pakai ORM, boleh pakai RAW Query

const prisma = require("../db")

const findSite = async () => {
    const site_information = await prisma.site_information.findMany();
    return site_information;
};

const findSiteById = async (id) => {
    const site_information = await prisma.site_information.findUnique({
        where:{
            id,
        },
    });

    return site_information;
};

const findSiteByIdCluster = async (id) => {
    const site_information = await prisma.cluster_detail.findUnique({
        where:{
            id,
        },
    });

    return site_information;
};

const insertSite = async (newSite) => {
    const site_information = await prisma.site_information.create({
        data:{
            pr_code : newSite.pr_code,
            site_name : newSite.site_name,
            id_cluster : newSite.id_cluster,
            longitude : newSite.longitude,
            latitude : newSite.latitude,
        }
    });

    return site_information
};

const deleteSite = async (id) => {
    await prisma.site_information.delete({
        where:{
            id: parseInt(id),
        },
    });
};

const editSite = async (siteID, newSite) => {
    const site_information = await prisma.site_information.update({
        where:{
            id: parseInt(siteID)
        },
        data:{
            pr_code : newSite.pr_code,
            site_name : newSite.site_name,
            id_cluster : newSite.id_cluster,
            longitude : newSite.longitude,
            latitude : newSite.latitude,
        }
    });

    return site_information
}

module.exports = {
    findSite,
    findSiteById,
    findSiteByIdCluster,
    insertSite,
    deleteSite,
    editSite,
};