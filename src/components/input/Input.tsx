import React, { ReactNode } from 'react';

export enum AriaInvalidStatus {
    FALSE = 'false',
    TRUE = 'true',
    GRAMMAR = 'grammar',
    SPELLING = 'spelling',
}

interface InputProps {
    label: ReactNode;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    name: string;
    autocomplete?: string;
    id?: string;
    required?: boolean;
    ariaDescribedby?: string;
    ariaInvalid?: boolean | AriaInvalidStatus | undefined;
    onFocus?: () => void;
    onBlur?: () => void;
    htmlRef?: React.RefObject<HTMLInputElement>;
    placeholder?: string;
}

export const Input = ({
    label,
    type,
    value,
    onChange,
    className = '',
    name,
    autocomplete = '',
    id = name,
    required = false,
    ariaDescribedby = '',
    ariaInvalid = undefined,
    onFocus = () => {},
    onBlur = () => {},
    htmlRef,
    placeholder = '',
}: InputProps) => {
    return (
        <div className={className}>
            <label
                className='block text-sm font-medium text-gray-700'
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                autoComplete={autocomplete}
                required={required}
                onFocus={onFocus}
                onBlur={onBlur}
                aria-describedby={ariaDescribedby}
                aria-invalid={ariaInvalid}
                aria-required={required ? true : undefined}
                ref={htmlRef}
                placeholder={placeholder}
            />
        </div>
    );
};
