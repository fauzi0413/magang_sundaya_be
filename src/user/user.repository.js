// Tujuan repository untuk berkomunikasi dengan DATABASE
// Boleh pakai ORM, boleh pakai RAW Query

const prisma = require("../db")

const findUser = async () => {
    const user = await prisma.user.findMany();
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

const insertUser = async (newUser) => {
    const user = await prisma.user.create({
        data:{
            username: newUser.username,
            password: newUser.password,
            role: newUser.role,
            token: newUser.token,
            expired_at: newUser.expired_at,
            // created_at: newUser.created_at,
            // updated_at: newUser.updated_at,
        },
    });

    return user
};

const insertUserLogs = async (loginLogs) => {
    const login_logs = await prisma.login_logs.create({
        data:{
            username: loginLogs.username,
            timestamp: loginLogs.timestamp,
        },
    });

    return login_logs
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
            expired_at: newUser.expired_at,
            // created_at: newUser.created_at,
            updated_at: newUser.updated_at,
        }
    });

    return user
}

module.exports = {
    findUser,
    findUserLogs,
    findUserById,
    insertUser,
    insertUserLogs,
    deleteUser,
    editUser
};