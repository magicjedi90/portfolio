import { render, screen } from '@testing-library/react';
import HighlightCards, { Highlight } from '../HighlightCards';

const mockHighlights: Highlight[] = [
  { title: 'First Highlight', description: 'First highlight description' },
  { title: 'Second Highlight', description: 'Second highlight description' },
];

describe('HighlightCards Component', () => {
  it('renders the heading and one card per highlight', () => {
    render(<HighlightCards heading="Some Heading" highlights={mockHighlights} />);

    expect(screen.getByText('Some Heading')).toBeInTheDocument();
    expect(screen.getByText('First Highlight')).toBeInTheDocument();
    expect(screen.getByText('First highlight description')).toBeInTheDocument();
    expect(screen.getByText('Second Highlight')).toBeInTheDocument();
    expect(screen.getByText('Second highlight description')).toBeInTheDocument();
  });

  it('applies the alternate card modifier class when requested', () => {
    render(<HighlightCards heading="Some Heading" highlights={mockHighlights} alternate />);

    const alternateCards = document.querySelectorAll('.highlights__card--alternate');
    expect(alternateCards).toHaveLength(mockHighlights.length);
  });

  it('renders an empty grid when no highlights are provided', () => {
    render(<HighlightCards heading="Some Heading" highlights={[]} />);

    const grid = document.querySelector('.highlights__grid');
    expect(grid).toBeInTheDocument();
    expect(grid?.children.length).toBe(0);
  });
});
