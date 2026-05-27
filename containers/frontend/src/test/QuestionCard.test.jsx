import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import QuestionCard from '../components/QuestionCard';

const question = {
  id: 1,
  text: 'What is the capital of France?',
  options: ['Berlin', 'Paris', 'Rome', 'Madrid'],
};

describe('QuestionCard', () => {
  it('renders the question text', () => {
    render(<QuestionCard question={question} onSelect={() => {}} disabled={false} />);
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
  });

  it('renders all answer options as buttons', () => {
    render(<QuestionCard question={question} onSelect={() => {}} disabled={false} />);
    expect(screen.getByRole('button', { name: 'Berlin' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Paris' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rome' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Madrid' })).toBeInTheDocument();
  });

  it('calls onSelect with correct index when an option is clicked', async () => {
    const handleSelect = vi.fn();
    render(<QuestionCard question={question} onSelect={handleSelect} disabled={false} />);
    await userEvent.click(screen.getByRole('button', { name: 'Paris' }));
    expect(handleSelect).toHaveBeenCalledWith(1);
  });

  it('disables all buttons when disabled prop is true', () => {
    render(<QuestionCard question={question} onSelect={() => {}} disabled />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });
});
