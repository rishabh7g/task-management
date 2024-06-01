import '@testing-library/jest-dom'; // for extended matchers like toHaveLength
import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import Tasks, { Task } from 'src/components/Tasks';

// Mock the global fetch API and provide type definitions
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

// Define mock task data with the Task type
const mockTasks: Task[] = [
   { userId: 1, id: 1, title: 'Task 1', completed: false },
   { userId: 1, id: 2, title: 'Task 2', completed: true },
   // ... more mock tasks
];

// Create a mock server with MSW using http and proper type annotations
// Create a mock server with MSW using http and proper type annotations
const server = setupServer(
   http.get(
      // Updated type annotation for response
      'https://jsonplaceholder.typicode.com/todos',
      (req) => {
         const url = new URL(req.request.url.toString()); // Convert to URL object to access query parameters
         const limit = Number(url.searchParams.get('_limit'));

         return HttpResponse.json(mockTasks.slice(0, limit));
      }
   )
);

// Establish the mock server before all tests
beforeAll(() => server.listen());

// Reset any request handlers that were added during the tests
afterEach(() => server.resetHandlers());

// Clean up once the tests are done
afterAll(() => server.close());

describe('Tasks component', () => {
   test('renders tasks from API', async () => {
      render(<Tasks />);

      // Wait for the tasks to load and be rendered
      await waitFor(() => {
         expect(screen.getAllByRole('listitem')).toHaveLength(mockTasks.length);
      });

      // You can add more specific assertions about the rendered tasks here
      mockTasks.forEach((task) => {
         const listItem = screen.getByText(task.title).closest('li'); // Find the closest li element

         expect(listItem).toBeInTheDocument();
         const checkbox = listItem?.querySelector(
            'input[type="checkbox"]'
         ) as HTMLInputElement;
         expect(checkbox).toBeInTheDocument();
         expect(checkbox.checked).toBe(task.completed);
      });
   });

   test('displays a message when there are no tasks', async () => {
      server.use(
         http.get('https://jsonplaceholder.typicode.com/todos', () => {
            return HttpResponse.json([]); // Return an empty array
         })
      );

      render(<Tasks />);

      await waitFor(() => {
         expect(screen.getByText('No tasks found')).toBeInTheDocument(); // Assert "No tasks found" message is displayed
      });
   });

   // Add more test cases as needed
});
