import { render, screen } from '@testing-library/react';
import React from 'react';
import { ErrorMessage } from 'src/components/error-message/ErrorMessage';

describe('<ErrorMessage />', () => {
    test('renders without crashing', () => {
        const { container } = render(
            <ErrorMessage errorMessage='' htmlRef={React.createRef()} />,
        );
        expect(container).toBeInTheDocument();
    });

    test('displays the error message when provided', () => {
        const errorMessage = 'This is an error message';
        render(
            <ErrorMessage
                errorMessage={errorMessage}
                htmlRef={React.createRef()}
            />,
        );
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('applies the correct classes when errorMessage is present', () => {
        const errorMessage = 'This is an error message';
        render(
            <ErrorMessage
                errorMessage={errorMessage}
                htmlRef={React.createRef()}
            />,
        );
        const messageElement = screen.getByText(errorMessage);
        expect(messageElement).toHaveClass(
            'rounded bg-red-200 p-2 px-4 text-red-700',
        );
        expect(messageElement).not.toHaveClass('hidden');
    });

    test('applies the hidden class when errorMessage is not present', () => {
        render(<ErrorMessage errorMessage='' htmlRef={React.createRef()} />);
        const messageElement = screen.getByRole('alert');
        expect(messageElement).toHaveClass('hidden');
    });

    test('sets the aria-live attribute to assertive', () => {
        render(<ErrorMessage errorMessage='' htmlRef={React.createRef()} />);
        const messageElement = screen.getByRole('alert');
        expect(messageElement).toHaveAttribute('aria-live', 'assertive');
    });

    test('ref is correctly assigned to the paragraph element', () => {
        const ref = React.createRef<HTMLParagraphElement>();
        render(<ErrorMessage errorMessage='Error' htmlRef={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
});
