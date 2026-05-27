import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScoreSummary from '../components/ScoreSummary';

describe('ScoreSummary', () => {
  it('renders the Quiz Complete heading', () => {
    render(<ScoreSummary score={2} total={3} />);
    expect(screen.getByRole('heading', { name: 'Quiz Complete!' })).toBeInTheDocument();
  });

  it('displays the correct score and total', () => {
    render(<ScoreSummary score={2} total={3} />);
    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it('displays perfect score correctly', () => {
    render(<ScoreSummary score={3} total={3} />);
    expect(screen.getByText(/3.*out of.*3/s)).toBeInTheDocument();
  });
});
