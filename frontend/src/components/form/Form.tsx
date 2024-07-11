import React from 'react';

interface FormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
    children: React.ReactNode;
}

export const Form = ({ onSubmit, className, children }: FormProps) => {
    return (
        <form
            aria-label='form'
            onSubmit={onSubmit}
            className={className}
            aria-live='polite'
        >
            {children}
        </form>
    );
};
