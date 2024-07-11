import React from 'react';
import { Form } from 'src/components/form/Form';
import { fireEvent, render, screen } from 'src/util/test-util';

describe('<Form />', () => {
    it('renders children correctly', () => {
        render(
            <Form onSubmit={jest.fn()}>
                <div>Child 1</div>
                <div>Child 2</div>
            </Form>,
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('applies the className correctly', () => {
        const className = 'custom-class';
        render(
            <Form onSubmit={jest.fn()} className={className}>
                <div>Child</div>
            </Form>,
        );

        const formElement = screen.getByRole('form', { hidden: true });
        expect(formElement).toHaveClass(className);
    });

    it('calls onSubmit when the form is submitted', () => {
        const handleSubmit = jest.fn();
        render(
            <Form onSubmit={handleSubmit}>
                <button type='submit'>Submit</button>
            </Form>,
        );

        fireEvent.submit(screen.getByRole('form', { hidden: true }));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('has the aria-live attribute set to polite', () => {
        render(
            <Form onSubmit={jest.fn()}>
                <div>Child</div>
            </Form>,
        );

        const formElement = screen.getByRole('form', { hidden: true });
        expect(formElement).toHaveAttribute('aria-live', 'polite');
    });
});
