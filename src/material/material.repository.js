// Tujuan repository untuk berkomunikasi dengan DATABASE
// Boleh pakai ORM, boleh pakai RAW Query

const prisma = require("../db")

const findMaterial = async () => {
    const material = await prisma.material.findMany();
    return material;
};

const findMaterialById = async (id) => {
    const material = await prisma.material.findUnique({
        where:{
            id,
        },
    });

    return material;
};

const insertMaterial = async (newMaterial) => {
    const material = await prisma.material.create({
        data:{
            sap_code : newMaterial.sap_code,
            sn_code : newMaterial.sn_code,
            status : newMaterial.status,
            user : newMaterial.user,
        },
    });

    return material
};

const deleteMaterial = async (id) => {
    await prisma.material.delete({
        where:{
            id: parseInt(id),
        },
    });
};

const editMaterial = async (materialID, newMaterial) => {
    const material = await prisma.material.update({
        where:{
            id: parseInt(materialID)
        },
        data:{
            sap_code : newMaterial.sap_code,
            sn_code : newMaterial.sn_code,
            status : newMaterial.status,
            user : newMaterial.user,
        }
    });

    return material
}

module.exports = {
    findMaterial,
    findMaterialById,
    insertMaterial,
    deleteMaterial,
    editMaterial,
};