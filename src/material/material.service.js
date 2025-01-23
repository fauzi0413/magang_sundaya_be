const prisma = require("../db");
const { findMaterial, findMaterialById, insertMaterial, deleteMaterial, editMaterial } = require("./material.repository");

const getAllMaterials = async() => {
    const material = await findMaterial();
    return material;
};

const getMaterialById = async (id) =>{
    const material = await findMaterialById(id);

    if(!material){
        throw Error("Material not found")
    }

    return material
};

const createMaterial = async (newMaterial) => {
    const material = await insertMaterial(newMaterial);

    return material
};

const deleteMaterialById = async (id) =>{
    // Untuk pengecakan data apakah ada data warehouse atau tidak sebelum didelete
    await getMaterialById(id);
    await deleteMaterial(id);
};

const editMaterialById = async (id, data) => {
    await getMaterialById(id)

    const material = await editMaterial(id, data);

    return material
};

module.exports = {
    getAllMaterials,
    getMaterialById,
    createMaterial,
    deleteMaterialById,
    editMaterialById,
}