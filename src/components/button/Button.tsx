import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    onClick?: () => void;
    className?: string;
}

const Button = ({
    label,
    onClick,
    type = 'button',
    className = '',
    disabled = false,
    ...props
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames(
                'rounded',
                {
                    'cursor-not-allowed opacity-50': disabled,
                },
                className,
            )}
            disabled={disabled}
            aria-label={label}
            {...props}
        >
            {label}
        </button>
    );
};

export default Button;

export const PrimaryButton = ({
    label,
    onClick,
    type,
    className,
    disabled,
}: ButtonProps) => {
    return (
        <Button
            label={label}
            onClick={onClick}
            type={type}
            className={classNames(
                'bg-blue-500 px-4 py-2 text-white hover:bg-blue-700',
                {
                    'bg-gray-500 text-white hover:bg-gray-500': disabled,
                },
                className,
            )}
            disabled={disabled}
        />
    );
};

export const SecondaryButton = ({
    label,
    onClick,
    type,
    className,
    disabled,
}: ButtonProps) => {
    return (
        <Button
            label={label}
            onClick={onClick}
            type={type}
            className={classNames(
                'border border-blue-500 bg-white px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white',
                className,
                {
                    'border-gray-500 text-gray-600 hover:border-gray-500':
                        disabled,
                },
            )}
            disabled={disabled}
        />
    );
};

export const TertiaryButton = ({
    label,
    onClick,
    type,
    className,
    disabled,
}: ButtonProps) => {
    return (
        <Button
            label={label}
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={classNames(
                'px-0 py-1 text-blue-500 hover:underline hover:underline-offset-4',
                {
                    'cursor-not-allowed text-gray-500 hover:no-underline':
                        disabled,
                },
                className,
            )}
        />
    );
};
