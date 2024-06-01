import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from 'src/components/Calculator';

describe('Calculator component', () => {
   test('performs basic calculations', () => {
      render(<Calculator />);

      // Get references to buttons and display
      const button1 = screen.getByText('1');
      const button2 = screen.getByText('2');
      const buttonAdd = screen.getByText('+');
      const buttonEquals = screen.getByText('=');
      const display = screen.getByTestId('display'); // Assuming you've added data-testid="display" to your display element

      // Simulate user interactions
      fireEvent.click(button1);
      fireEvent.click(buttonAdd);
      fireEvent.click(button2);
      fireEvent.click(buttonEquals);

      // Assert the result
      expect(display).toHaveTextContent('3'); // Expect the display to show '3'
   });

   // Add more test cases for other operations (-, *, /, %) and edge cases
});
