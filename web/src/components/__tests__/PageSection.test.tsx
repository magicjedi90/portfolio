import { render, screen } from '@testing-library/react';
import PageSection from '../PageSection';

describe('PageSection Component', () => {
  it('renders the heading and children', () => {
    render(
      <PageSection heading="Some Heading">
        <p>Some content</p>
      </PageSection>
    );

    expect(screen.getByText('Some Heading')).toBeInTheDocument();
    expect(screen.getByText('Some content')).toBeInTheDocument();
  });

  it('applies the alternate modifier class when requested', () => {
    render(
      <PageSection heading="Some Heading" alternate>
        <p>Some content</p>
      </PageSection>
    );

    expect(document.querySelector('.page-section--alternate')).toBeInTheDocument();
  });

  it('does not apply the alternate modifier class by default', () => {
    render(
      <PageSection heading="Some Heading">
        <p>Some content</p>
      </PageSection>
    );

    expect(document.querySelector('.page-section--alternate')).not.toBeInTheDocument();
  });
});
