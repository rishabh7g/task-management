import classNames from 'classnames';

interface ErrorMessageProps {
    errorMessage: string | null;
    htmlRef: React.RefObject<HTMLParagraphElement>;
}

export const ErrorMessage = ({
    errorMessage = '',
    htmlRef,
}: ErrorMessageProps) => (
    <p
        ref={htmlRef}
        className={classNames('rounded bg-red-200 p-2 px-4', {
            'text-red-700': !!errorMessage,
            hidden: !errorMessage,
        })}
        role='alert'
        aria-live='assertive'
    >
        {errorMessage}
    </p>
);
