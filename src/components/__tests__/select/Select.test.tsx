import { fireEvent, render, screen } from '@testing-library/react';
import Select from 'src/components/select/Select';

describe('<Select />', () => {
    const label = 'Test Select';
    const name = 'testSelect';
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const defaultOption = 'Option 2';
    const handleChange = jest.fn();

    beforeEach(() => {
        handleChange.mockClear();
    });

    it('renders the select element with the correct label', () => {
        render(
            <Select
                label={label}
                name={name}
                options={options}
                defaultOption={defaultOption}
                handleChange={handleChange}
            />,
        );

        expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    it('renders all options passed as props', () => {
        render(
            <Select
                label={label}
                name={name}
                options={options}
                defaultOption={defaultOption}
                handleChange={handleChange}
            />,
        );

        options.forEach((option) => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    it('sets the default option correctly', () => {
        render(
            <Select
                label={label}
                name={name}
                options={options}
                defaultOption={defaultOption}
                handleChange={handleChange}
            />,
        );

        expect(screen.getByDisplayValue(defaultOption)).toBeInTheDocument();
    });

    it('calls handleChange function when a different option is selected', () => {
        render(
            <Select
                label={label}
                name={name}
                options={options}
                defaultOption={defaultOption}
                handleChange={handleChange}
            />,
        );

        const selectElement = screen.getByLabelText(label);
        fireEvent.change(selectElement, { target: { value: 'Option 1' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('Option 1');
    });

    it('has the correct aria-label attribute', () => {
        render(
            <Select
                label={label}
                name={name}
                options={options}
                defaultOption={defaultOption}
                handleChange={handleChange}
            />,
        );

        expect(screen.getByLabelText(label)).toHaveAttribute(
            'aria-label',
            label,
        );
    });
});
