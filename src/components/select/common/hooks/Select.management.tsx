import { useState } from 'react';

export const useSelectManagement = (
    defaultOption: string,
    handleChange: (newSelectedOption: string) => void,
) => {
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectedOption = e.target.value;
        setSelectedOption(newSelectedOption);
        handleChange(newSelectedOption);
    };
    return {
        selectedOption,
        handleSelectChange,
    };
};
