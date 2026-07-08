import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero Component', () => {
  it('renders the title, subtitle, and description', () => {
    render(
      <Hero
        title="Some Title"
        subtitle="Some Subtitle"
        description="Some description"
      />
    );

    expect(screen.getByText('Some Title')).toBeInTheDocument();
    expect(screen.getByText('Some Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('omits the subtitle when none is provided', () => {
    render(<Hero title="Some Title" description="Some description" />);

    expect(screen.getByText('Some Title')).toBeInTheDocument();
    expect(document.querySelector('.hero__subtitle')).not.toBeInTheDocument();
  });
});
