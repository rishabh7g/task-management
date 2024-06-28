import { hash } from 'bcryptjs';
import { v4 as generateId } from 'uuid';
import { StoredData, Task, User } from 'src/types/data.types';
import { NotFoundError } from 'src/util/errors.util';
import { readData, writeData } from 'src/util/file.util';

export async function createUser(data: {
    email: string;
    password: string;
}): Promise<{ id: string; email: string }> {
    const userId = generateId();
    const hashedPw = await hash(data.password, 12);

    const user: User = {
        ...data,
        password: hashedPw,
        id: userId,
        tasks: [],
        roles: ['user'],
    };

    await _updateUser(user);
    return { id: userId, email: data.email };
}

export async function addRefreshToken(
    userId: string,
    refreshToken: string,
): Promise<{ id: string; email: string }> {
    const user = await getUserById(userId);
    if (!user) {
        throw new NotFoundError('Could not find user for ID ' + userId);
    }
    user.refreshToken = refreshToken;

    await _updateUser(user);
    return { id: userId, email: user.email };
}

export async function addNewTask(task: Task, userId?: string) {
    const user = await getUserById(userId);
    if (!user) {
        throw new NotFoundError('Could not find user for ID ' + userId);
    }
    user.tasks.push(task);

    await _updateUser(user);
}

export async function updateExistingTask(task: Task, userId?: string) {
    const user = await getUserById(userId);
    if (!user) {
        throw new NotFoundError('Could not find user for ID ' + userId);
    }
    const index = user.tasks.findIndex((t) => t.id === task.id);
    if (index < 0) {
        throw new NotFoundError('Could not find task for ID ' + task.id);
    }
    user.tasks[index] = task;

    await _updateUser(user);
}

export async function removeTask(taskId: string, userId?: string) {
    const user = await getUserById(userId);
    if (!user) {
        throw new NotFoundError('Could not find user for ID ' + userId);
    }
    const index = user.tasks.findIndex((t) => t.id === taskId);
    if (index < 0) {
        throw new NotFoundError('Could not find task for ID ' + taskId);
    }
    user.tasks.splice(index, 1);

    await _updateUser(user);
}

export async function getUserById(userId?: string): Promise<User | undefined> {
    const isUserIdNotProvided = !userId;
    if (isUserIdNotProvided) {
        return undefined;
    }
    const storedData = await initializeData();
    const user = storedData.users.find((u) => u.id === userId);
    return user;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const storedData = await initializeData();

    const user = storedData.users.find((u) => u.email === email);
    return user;
}

export async function getUserByRefreshToken(
    refreshToken: string,
): Promise<User> {
    const storedData = await initializeData();

    const user = storedData.users.find((u) => u.refreshToken === refreshToken);
    if (!user) {
        throw new NotFoundError(
            'Could not find user for refresh token ' + refreshToken,
        );
    }
    return user;
}

export async function eraseRefreshToken(userId: string): Promise<void> {
    const user = await getUserById(userId);
    if (!user) {
        throw new NotFoundError('Could not find user for ID ' + userId);
    }
    user.refreshToken = '';
    await _updateUser(user);
}

async function _updateUser(user: User) {
    const storedData = await initializeData();

    const isUsersFieldNotExists = !storedData.users;
    const isUsersEmmpty = storedData.users.length === 0;
    if (isUsersFieldNotExists || isUsersEmmpty) {
        storedData.users = [user];
    } else {
        const index = storedData.users.findIndex((u) => u.id === user.id);
        const isUserNotFound = index < 0;
        if (isUserNotFound) {
            storedData.users.push(user);
        }
        storedData.users[index] = user;
    }

    await writeData(storedData);
}

async function initializeData() {
    const storedData = await readData<StoredData>();
    const isUsersFieldNotExists = !storedData.users;
    const isUsersEmmpty = storedData.users && storedData.users.length === 0;
    if (isUsersFieldNotExists || isUsersEmmpty) {
        const storedData = { users: [] };
        await writeData(storedData);
        return storedData;
    } else {
        return storedData;
    }
}
