const fs = require('fs').promises;
const DB_FILE_NAME = 'db.json';

async function readData() {
    try {
        const data = await fs.readFile(DB_FILE_NAME, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error reading or parsing file:', error);
    }
}

async function writeData(data) {
    await fs.writeFile(DB_FILE_NAME, JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;
