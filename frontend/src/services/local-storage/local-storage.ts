/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */

function set(key: string, value: any): void {
    try {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    } catch (error) {
        console.error(`Error saving to localStorage: ${error}`);
    }
}

function get<T>(key: string, initialValue: T | (() => T)): T {
    const isInitialValueFunction = typeof initialValue === 'function';
    const updatedInitialValue = isInitialValueFunction
        ? (initialValue as () => T)()
        : initialValue;

    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : updatedInitialValue;
    } catch (error) {
        console.error(`Error reading from localStorage: ${error}`);
        return updatedInitialValue;
    }
}

function remove(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing from localStorage: ${error}`);
    }
}

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
