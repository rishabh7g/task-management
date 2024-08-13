import React from 'react';
import { Input, AriaInvalidStatus } from 'src/components/input/Input';
import { fireEvent, render, screen } from 'src/util/test.util';

const TEST_DATA = {
    label: 'Test Label',
    name: 'test-input',
};

describe('<Input />', () => {
    const setup = (props = {}) => {
        return render(
            <Input
                type={''}
                value={''}
                onChange={() => {}}
                label={TEST_DATA.label}
                name={TEST_DATA.name}
                {...props}
            />,
        );
    };

    test('renders without crashing', () => {
        const { container } = setup();
        expect(container).toBeInTheDocument();
    });

    test('displays the label correctly', () => {
        setup();
        expect(screen.getByLabelText(TEST_DATA.label)).toBeInTheDocument();
    });

    test('sets the input type correctly', () => {
        setup({ type: 'password' });
        const input = screen.getByLabelText(TEST_DATA.label);
        expect(input).toHaveAttribute('type', 'password');
    });

    test('sets the placeholder correctly', () => {
        setup({ placeholder: 'Enter text here' });
        const input = screen.getByLabelText(TEST_DATA.label);
        expect(input).toHaveAttribute('placeholder', 'Enter text here');
    });

    test('sets the required attribute', () => {
        setup({ required: true });
        const input = screen.getByLabelText(TEST_DATA.label);
        expect(input).toBeRequired();
    });

    test('sets aria-invalid attribute when error is true', () => {
        setup({ ariaInvalid: AriaInvalidStatus.TRUE });
        const input = screen.getByLabelText(TEST_DATA.label);
        expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    test('calls onChange handler', () => {
        const handleChange = jest.fn();
        setup({ onChange: handleChange });
        const input = screen.getByLabelText(TEST_DATA.label);
        fireEvent.change(input, { target: { value: 'New Value' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('calls onFocus handler', () => {
        const handleFocus = jest.fn();
        setup({ onFocus: handleFocus });
        const input = screen.getByLabelText(TEST_DATA.label);
        fireEvent.focus(input);
        expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    test('calls onBlur handler', () => {
        const handleBlur = jest.fn();
        setup({ onBlur: handleBlur });
        const input = screen.getByLabelText(TEST_DATA.label);
        fireEvent.blur(input);
        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    test('sets the value correctly', () => {
        setup({ value: 'Initial Value' });
        const input = screen.getByLabelText(TEST_DATA.label);
        expect(input).toHaveValue('Initial Value');
    });

    test('sets the id correctly', () => {
        setup({ id: 'custom-id' });
        const input = screen.getByLabelText(TEST_DATA.label);
        expect(input).toHaveAttribute('id', 'custom-id');
    });
});
