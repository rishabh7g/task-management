import React from 'react';

export enum CheckboxValue {
    Checked = 'checked',
    Partial = 'partial',
    Unchecked = 'unchecked',
}

interface CheckboxInputProps {
    name: string;
    label: string;
    value: CheckboxValue;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
    name,
    label,
    value,
    onChange,
}) => {
    // Determine the checked state based on the value
    const isChecked = value === CheckboxValue.Checked;
    const isIndeterminate = value === CheckboxValue.Partial;

    // Ref to set indeterminate state on the checkbox
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = isIndeterminate;
        }
    }, [isIndeterminate]);

    return (
        <div className='mt-4 flex items-center'>
            <input
                id={name}
                name={name}
                type='checkbox'
                className='h-4 w-4'
                checked={isChecked}
                onChange={onChange}
                ref={checkboxRef}
                aria-checked={isIndeterminate ? 'mixed' : isChecked}
            />
            <label htmlFor={name} className='ml-2 text-sm text-gray-600'>
                {label}
            </label>
        </div>
    );
};
