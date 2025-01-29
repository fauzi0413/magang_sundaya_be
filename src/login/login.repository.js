// Tujuan repository untuk berkomunikasi dengan DATABASE
// Boleh pakai ORM, boleh pakai RAW Query

const prisma = require("../db")

const loginByUsername = async (loginData) => {
    const username = await prisma.user.findFirst({
        where:{
            username: loginData.username,
            password: loginData.password,
        },
    });
    return username
}

const insertUserLogs = async (loginLogs) => {
    const login_logs = await prisma.login_logs.create({
        data:{
            username: loginLogs.username,
            action: loginLogs.action,
        },
    });

    return login_logs
};

const findUser = async (refreshToken) => {
    const user = await prisma.user.findMany({
        where:{
            token: refreshToken
        }
    });
    return user;
};

const findUserLogs = async () => {
    const login_logs = await prisma.login_logs.findMany();
    return login_logs;
};

const findUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where:{
            id,
        },
    });

    return user;
};

const deleteUser = async (id) => {
    await prisma.user.delete({
        where:{
            id: parseInt(id),
        },
    });
};

const editUser = async (userID, newUser) => {
    const user = await prisma.user.update({
        where:{
            id: parseInt(userID)
        },
        data:{
            username: newUser.username,
            password: newUser.password,
            role: newUser.role,
            token: newUser.token,
            // expired_at: newUser.expired_at,
            // created_at: newUser.created_at,
            updated_at: newUser.updated_at,
        }
    });

    return user
}

const updateToken = async(userID, refreshToken) => {
    const token = await prisma.user.update({
        where: {
            id: userID,
        },
        data: {
            token: refreshToken,
        }
    })
    return token
}

module.exports = {
    findUser,
    findUserLogs,
    findUserById,
    insertUserLogs,
    deleteUser,
    editUser,
    loginByUsername,
    updateToken,
};