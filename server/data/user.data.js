const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors.util');
const { readData, writeData } = require('../util/file.util');

async function createUser(data) {
    const storedData = await readData();
    const userId = generateId();
    const hashedPw = await hash(data.password, 12);
    if (!storedData.users) {
        storedData.users = [];
    }
    storedData.users.push({
        ...data,
        password: hashedPw,
        id: userId,
        tasks: [],
    });
    await writeData(storedData);
    return { id: userId, email: data.email };
}

async function addRefreshToken(userId, refreshToken) {
    const storedData = await readData();
    if (!storedData.users || storedData.users.length === 0) {
        throw new NotFoundError('Could not find any users.');
    }

    const user = storedData.users.find((u) => u.id === userId);
    if (!user) {
        throw new NotFoundError('Could not find user for email ' + email);
    }
    user.refreshToken = refreshToken;

    await writeData(storedData);
    return { id: userId, email: user.email };
}

async function getUserByEmail(email) {
    const storedData = await readData();
    if (!storedData.users || storedData.users.length === 0) {
        throw new NotFoundError('Could not find any users.');
    }

    const user = storedData.users.find((u) => u.email === email);
    if (!user) {
        throw new NotFoundError('Could not find user for email ' + email);
    }

    return user;
}

async function getUserByRefreshToken(refreshToken) {
    const storedUserData = await readData();
    if (!storedUserData.users || storedUserData.users.length === 0) {
        throw new NotFoundError('Could not find any users.');
    }

    const user = storedUserData.users.find(
        (u) => u.refreshToken === refreshToken,
    );
    if (!user) {
        throw new NotFoundError(
            'Could not find user for refresh token ' + refreshToken,
        );
    }
    return user;
}

async function removeRefreshToken(userId) {
    const storedUserData = await readData();
    if (!storedUserData.users || storedUserData.users.length === 0) {
        throw new NotFoundError('Could not find any users.');
    }

    const user = storedUserData.users.find((u) => u.id === userId);
    if (!user) {
        throw new NotFoundError(
            'Could not find user for refresh token ' + refreshToken,
        );
    }
    user.refreshToken = '';
    await writeData(storedUserData);
}

exports.createUser = createUser;
exports.getUserByEmail = getUserByEmail;
exports.getUserByRefreshToken = getUserByRefreshToken;
exports.addRefreshToken = addRefreshToken;
exports.removeRefreshToken = removeRefreshToken;
