import React from 'react';
import { useSelectManagement } from 'src/components/select/common/hooks/Select.management';

interface SelectProps {
    label: string;
    name: string;
    options: string[];
    handleChange: (value: string) => void;
    defaultOption?: string;
}

export const Select = ({
    label,
    name,
    options,
    defaultOption = options[0],
    handleChange,
}: SelectProps) => {
    const { handleSelectChange, selectedOption } = useSelectManagement(
        defaultOption,
        handleChange,
    );

    return (
        <div className='mb-4'>
            <label
                className='block text-sm font-medium text-gray-700'
                htmlFor={name}
            >
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={selectedOption}
                onChange={handleSelectChange}
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
                aria-label={label}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};
