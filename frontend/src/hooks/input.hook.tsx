import { ChangeEvent, useState } from 'react';
import { LocalStorageKeys } from 'src/constant/local-storage.constant';
import { localStorageService } from 'src/services/local-storage/local-storage';

export const useInput = (key: string, initialValue: string) => {
    const [value, setValue] = useState(() =>
        localStorageService.get(key, initialValue),
    );
    const isPersistUser = localStorageService.get(
        LocalStorageKeys.IS_PERSIST_LOGIN,
        false,
    );

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (isPersistUser) localStorageService.set(key, newValue);
    };

    return [value, onChange] as const;
};
