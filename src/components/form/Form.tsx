interface FormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
    children: React.ReactNode;
}

const Form = ({ onSubmit, className, children }: FormProps) => {
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

export default Form;
