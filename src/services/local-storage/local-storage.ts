/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/**
 * Sets a value for the given key in localStorage.
 * @param key The key under which to store the value.
 * @param value The value to store, will be stringified.
 */
function set(key: string, value: any): void {
    try {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    } catch (error) {
        console.error(`Error saving to localStorage: ${error}`);
    }
}

/**
 * Retrieves the value for the given key from localStorage.
 * @param key The key whose value to retrieve.
 * @returns The parsed value from localStorage, or null if not found or on error.
 */
function get<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error reading from localStorage: ${error}`);
        return null;
    }
}

/**
 * Removes the value for the given key from localStorage.
 * @param key The key whose value to remove.
 */
function remove(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing from localStorage: ${error}`);
    }
}

/**
 * Clears all values stored in localStorage.
 */
function clear(): void {
    try {
        localStorage.clear();
    } catch (error) {
        console.error(`Error clearing localStorage: ${error}`);
    }
}

export const localStorageService = {
    set,
    get,
    removeItem: remove,
    clear,
};
