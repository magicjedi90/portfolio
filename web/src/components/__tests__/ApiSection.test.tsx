import { render, screen } from '@testing-library/react';
import ApiSection from '../ApiSection';

const baseProps = {
  heading: 'Some Heading',
  loadingMessage: 'Loading things...',
  errorMessage: 'Error loading things.',
};

describe('ApiSection Component', () => {
  it('renders the loading message while loading', () => {
    render(
      <ApiSection {...baseProps} isLoading={true} error={undefined}>
        <p>Loaded content</p>
      </ApiSection>
    );

    expect(screen.getByText('Some Heading')).toBeInTheDocument();
    expect(screen.getByText('Loading things...')).toBeInTheDocument();
    expect(screen.queryByText('Loaded content')).not.toBeInTheDocument();
  });

  it('renders the error message when the request failed', () => {
    render(
      <ApiSection {...baseProps} isLoading={false} error={new Error('request failed')}>
        <p>Loaded content</p>
      </ApiSection>
    );

    expect(screen.getByText('Error loading things.')).toBeInTheDocument();
    expect(screen.queryByText('Loading things...')).not.toBeInTheDocument();
    expect(screen.queryByText('Loaded content')).not.toBeInTheDocument();
  });

  it('renders children when loading succeeded', () => {
    render(
      <ApiSection {...baseProps} isLoading={false} error={undefined}>
        <p>Loaded content</p>
      </ApiSection>
    );

    expect(screen.getByText('Loaded content')).toBeInTheDocument();
    expect(screen.queryByText('Loading things...')).not.toBeInTheDocument();
    expect(screen.queryByText('Error loading things.')).not.toBeInTheDocument();
  });
});
