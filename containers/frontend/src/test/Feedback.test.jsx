import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Feedback from '../components/Feedback';

describe('Feedback', () => {
  it('shows "Correct!" when answer is correct', () => {
    render(<Feedback correct onNext={() => {}} correctOption={1} />);
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('shows wrong message with correct option number when answer is wrong', () => {
    render(<Feedback correct={false} onNext={() => {}} correctOption={2} />);
    expect(screen.getByText(/Wrong — the correct answer was option 3/)).toBeInTheDocument();
  });

  it('renders a Next button', () => {
    render(<Feedback correct onNext={() => {}} correctOption={0} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('calls onNext when Next button is clicked', async () => {
    const handleNext = vi.fn();
    render(<Feedback correct onNext={handleNext} correctOption={0} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(handleNext).toHaveBeenCalledOnce();
  });
});
