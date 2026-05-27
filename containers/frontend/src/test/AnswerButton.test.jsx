import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AnswerButton from '../components/AnswerButton';

describe('AnswerButton', () => {
  it('renders the button text', () => {
    render(<AnswerButton text="Paris" onClick={() => {}} disabled={false} />);
    expect(screen.getByRole('button', { name: 'Paris' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<AnswerButton text="Paris" onClick={handleClick} disabled={false} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    render(<AnswerButton text="Paris" onClick={() => {}} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    render(<AnswerButton text="Paris" onClick={handleClick} disabled />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
