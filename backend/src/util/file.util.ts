import { promises as fs } from 'fs';

const DB_FILE_NAME = 'db.json';

export async function readData<T>(): Promise<T> {
    try {
        const data = await fs.readFile(DB_FILE_NAME, 'utf8');
        return JSON.parse(data);
    } catch (error: unknown) {
        throw new Error(
            'Error reading or parsing file: ' + (error as Error).message,
        );
    }
}

export async function writeData<T>(data: T): Promise<void> {
    await fs.writeFile(DB_FILE_NAME, JSON.stringify(data));
}
