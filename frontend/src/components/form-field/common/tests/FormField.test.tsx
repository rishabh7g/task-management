import React from 'react';
import { FormField } from 'src/components/form-field/FormField';
import { fireEvent, render, screen } from 'src/util/test.util';

const DEFAULT_PROPS = {
    id: 'test-id',
    label: 'Test Label',
    name: 'test-name',
    type: 'text',
    value: 'test value',
    onChange: jest.fn(),
    htmlRef: { current: null },
    autocomplete: 'off',
    required: false,
    isValid: true,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    InputHelperContent: 'Helper text',
    placeholder: 'Enter text',
    isFocused: false,
};

describe('<FormField />', () => {
    it('renders the input with correct attributes', () => {
        render(<FormField {...DEFAULT_PROPS} />);
        const inputElement = screen.getByLabelText('Test Label');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('id', 'test-id');
        expect(inputElement).toHaveAttribute('name', 'test-name');
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveAttribute('value', 'test value');
        expect(inputElement).toHaveAttribute('autocomplete', 'off');
        expect(inputElement).not.toBeRequired();
        expect(inputElement).toHaveAttribute('placeholder', 'Enter text');
    });

    it('calls onChange handler when input value changes', () => {
        render(<FormField {...DEFAULT_PROPS} />);

        const inputElement = screen.getByLabelText('Test Label');
        fireEvent.change(inputElement, { target: { value: 'new value' } });
        expect(DEFAULT_PROPS.onChange).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus and onBlur handlers correctly', () => {
        render(<FormField {...DEFAULT_PROPS} />);

        const inputElement = screen.getByLabelText('Test Label');
        fireEvent.focus(inputElement);
        expect(DEFAULT_PROPS.onFocus).toHaveBeenCalledTimes(1);

        fireEvent.blur(inputElement);
        expect(DEFAULT_PROPS.onBlur).toHaveBeenCalledTimes(1);
    });

    it('renders the InputHelper with correct attributes when visible', () => {
        render(<FormField {...DEFAULT_PROPS} isFocused={true} />);

        const helperElement = screen.getByRole('alert');
        expect(helperElement).toBeInTheDocument();
        expect(helperElement).toHaveAttribute('id', 'test-id-error');
        expect(helperElement).toHaveTextContent('Helper text');
    });

    it('hides the InputHelper when not visible', () => {
        render(<FormField {...DEFAULT_PROPS} isFocused={false} />);

        const helperElement = screen.queryByRole('alert');
        expect(helperElement).toHaveClass('hidden');
    });

    it('applies the correct aria attributes for invalid state', () => {
        render(<FormField {...DEFAULT_PROPS} isValid={false} />);

        const inputElement = screen.getByLabelText('Test Label');
        expect(inputElement).toHaveAttribute(
            'aria-describedby',
            'test-id-error',
        );
    });
});
