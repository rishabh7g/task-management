import { fireEvent, render, screen } from '@testing-library/react';
import {
    PrimaryButton,
    SecondaryButton,
    TertiaryButton,
} from 'src/components/button/Button';

type Button =
    | typeof PrimaryButton
    | typeof SecondaryButton
    | typeof TertiaryButton;

export const testButtons = (Button: Button) => {
    test('renders the button with label', () => {
        render(<Button label='Click Me' onClick={() => {}} />);
        const buttonElement = screen.getByText(/click me/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test('applies the primary button styles', () => {
        render(
            <Button
                label='Click Me'
                onClick={() => {}}
                className='py-5 text-black'
            />,
        );
        const buttonElement = screen.getByText(/click me/i);
        expect(buttonElement).toHaveClass('text-black py-5');
    });

    test('calls onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button label='Click Me' onClick={handleClick} />);
        const buttonElement = screen.getByText(/click me/i);
        fireEvent.click(buttonElement);
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(2);
    });

    test('renders disabled button when disabled prop is true', () => {
        render(<Button label='Click Me' onClick={() => {}} disabled={true} />);
        const buttonElement = screen.getByText(/click me/i);
        expect(buttonElement).toBeDisabled();
    });

    test('applies disabled styles when disabled', () => {
        render(<Button label='Click Me' onClick={() => {}} disabled={true} />);
        const buttonElement = screen.getByText(/click me/i);
        expect(buttonElement).toHaveClass('opacity-50 cursor-not-allowed');
    });

    test('applies additional className', () => {
        render(
            <Button
                label='Click Me'
                onClick={() => {}}
                className='extra-class'
            />,
        );
        const buttonElement = screen.getByText(/click me/i);
        expect(buttonElement).toHaveClass('extra-class');
    });

    test('sets the aria-label attribute', () => {
        render(
            <Button
                label='Click Me'
                onClick={() => {}}
                ariaLabel='Primary button'
            />,
        );
        const buttonElement = screen.getByLabelText(/primary button/i);
        expect(buttonElement).toBeInTheDocument();
    });
};

describe('<PrimaryButton />', () => {
    testButtons(PrimaryButton);
});

describe('<SecondaryButton />', () => {
    testButtons(SecondaryButton);
});

describe('<TertiaryButton />', () => {
    testButtons(TertiaryButton);
});
