import { fireEvent, render, screen } from '@testing-library/react';
import {
    CheckboxInput,
    CheckboxValue,
} from 'src/components/checkbox-input/CheckboxInput';

describe('<CheckboxInput />', () => {
    test('renders with the correct label', () => {
        render(
            <CheckboxInput
                label='Test checkbox'
                name='test'
                value={CheckboxValue.Unchecked}
                onChange={() => {}}
            />,
        );
        expect(screen.getByLabelText(/test checkbox/i)).toBeInTheDocument();
    });

    test('is unchecked by default', () => {
        render(
            <CheckboxInput
                label='Test checkbox'
                name='test'
                value={CheckboxValue.Unchecked}
                onChange={() => {}}
            />,
        );
        const checkboxElement = screen.getByRole('checkbox');
        expect(checkboxElement).not.toBeChecked();
    });

    test('calls onChange when clicked', () => {
        const handleChange = jest.fn();
        render(
            <CheckboxInput
                label='Test checkbox'
                name='test'
                value={CheckboxValue.Unchecked}
                onChange={handleChange}
            />,
        );
        fireEvent.click(screen.getByRole('checkbox'));
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('is checked when value is Checked', () => {
        render(
            <CheckboxInput
                label='Test checkbox'
                name='test'
                value={CheckboxValue.Checked}
                onChange={() => {}}
            />,
        );
        expect(screen.getByRole('checkbox')).toBeChecked();
    });
});

test('Render <CheckboxInput />', () => {
    render(
        <CheckboxInput
            label='Test checkbox'
            name='test'
            value={CheckboxValue.Unchecked}
            onChange={() => {}}
        />,
    );
});
