import { useState } from 'react';
import { LocalStorageKeys } from 'src/constant/local-storage.constant';
import { localStorageService } from 'src/services/local-storage/local-storage';

export function useToggle(key: string, initialValue: boolean) {
    const [isPersistLogin, setIsPersistLogin] = useState(() => {
        return localStorageService.get(key, initialValue);
    });

    const togglePersistLogin = () => {
        setIsPersistLogin((prev) => {
            const newValue = !prev;
            localStorageService.set(
                LocalStorageKeys.IS_PERSIST_LOGIN,
                newValue,
            );
            return newValue;
        });
    };

    return { isPersistLogin, togglePersistLogin };
}
