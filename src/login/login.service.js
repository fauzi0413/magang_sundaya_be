const prisma = require("../db");
const { findUser, findUserLogs, findUserById, insertUser, insertUserLogs, deleteUser, editUser, loginByUsername } = require("./login.repository");

const loginUser = async (loginData) => {
    
    const login = await loginByUsername(loginData)
    if(!login){
        throw Error("Username not found")
    }
    // const login_logs = await insertUserLogs(loginData);

    return login
}

const loginLogs = async (loginLogs) => {
    const login_logs = await insertUserLogs(loginLogs);
    return login_logs
}

const getAllUsers = async() => {
    const user = await findUser();
    return user;
};

const getAllLoginLogs = async() => {
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
    getAllLoginLogs,
    getUserById,
    deleteUserById,
    editUserById,
    loginUser,
    loginLogs,
}