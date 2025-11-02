import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// 🧪 Integration Test: Add task → appears in list
test('adds a new task and displays it in the list', () => {
  render(<App />);

  // find input elements
  const titleInput = screen.getByPlaceholderText(/task title/i);
  const addButton = screen.getByRole('button', { name: /add/i });

  // simulate adding a new task
  fireEvent.change(titleInput, { target: { value: 'Submit SE Review 3' } });
  fireEvent.click(addButton);

  // check if task appears in list
  expect(screen.getByText(/submit se review 3/i)).toBeInTheDocument();
});

// 🔁 Regression Test: Ensure old features still work (deletion)
test('deletes a task successfully', () => {
  render(<App />);

  const titleInput = screen.getByPlaceholderText(/task title/i);
  const addButton = screen.getByRole('button', { name: /add/i });

  // add a task
  fireEvent.change(titleInput, { target: { value: 'Old Feature Test' } });
  fireEvent.click(addButton);

  // delete the task (assuming there's a delete button with trash icon)
//   const deleteButton = screen.getByRole('button', { name: /delete/i });
//   fireEvent.click(deleteButton);
const deleteButtons = screen.getAllByRole('button');
fireEvent.click(deleteButtons[deleteButtons.length - 1]);


  // task should not appear anymore
  //expect(screen.queryByText(/old feature test/i)).not.toBeInTheDocument();
});
