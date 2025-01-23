const prisma = require("../db");
const { findUser, findUserLogs, findUserById, insertUser, insertUserLogs, deleteUser, editUser } = require("./user.repository");

const getAllUsers = async() => {
    const user = await findUser();
    return user;
};

const getAllUsersLogs = async() => {
    const user_logs = await findUserLogs();
    return user_logs;
};

const getUserById = async (id) =>{
    const user = await findUserById(id);

    if(!user){
        throw Error("User not found")
    }

    return user
};

const createUser = async (newUser) => {
    const user = await insertUser(newUser);

    return user
};

const loginLogs = async (loginData) => {
    const login_logs = await insertUserLogs(loginData);

    return login_logs
};

const deleteUserById = async (id) =>{
    // Untuk pengecakan data apakah ada data warehouse atau tidak sebelum didelete
    await getUserById(id);
    await deleteUser(id);
};

const editUserById = async (id, data) => {
    await getUserById(id)

    const user = await editUser(id, data);

    return user
};

module.exports = {
    getAllUsers,
    getAllUsersLogs,
    getUserById,
    createUser,
    deleteUserById,
    editUserById,
    loginLogs,
}