import { fireEvent, render, screen } from '@testing-library/react';
import {
    CheckboxInput,
    CheckboxValue,
} from 'src/components/checkbox-input/CheckboxInput';

describe('<CheckboxInput />', () => {
    test('renders without crashing', () => {
        const { container } = render(
            <CheckboxInput
                name='test-checkbox'
                label='Test Checkbox'
                value={CheckboxValue.Unchecked}
                onChange={() => {}}
            />,
        );
        expect(container).toBeInTheDocument();
    });

    test('displays the label correctly', () => {
        render(
            <CheckboxInput
                name='test-checkbox'
                label='Test Checkbox'
                value={CheckboxValue.Unchecked}
                onChange={() => {}}
            />,
        );
        expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
    });

    test('renders the checkbox as unchecked', () => {
        render(
            <CheckboxInput
                name='test-checkbox'
                label='Test Checkbox'
                value={CheckboxValue.Unchecked}
                onChange={() => {}}
            />,
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    test('renders the checkbox as checked', () => {
        render(
            <CheckboxInput
                name='test-checkbox'
                label='Test Checkbox'
                value={CheckboxValue.Checked}
                onChange={() => {}}
            />,
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
        expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    test('renders the checkbox as indeterminate', () => {
        render(
            <CheckboxInput
                name='test-checkbox'
                label='Test Checkbox'
                value={CheckboxValue.Partial}
                onChange={() => {}}
            />,
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });

    test('calls the onChange handler when clicked', () => {
        const handleChange = jest.fn();
        render(
            <CheckboxInput
                name='test-checkbox'
                label='Test Checkbox'
                value={CheckboxValue.Unchecked}
                onChange={handleChange}
            />,
        );
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
