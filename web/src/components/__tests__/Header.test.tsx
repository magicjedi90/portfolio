import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

// Import the mocked module
import { usePathname } from 'next/navigation';

describe('Header Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    jest.resetAllMocks();
  });

  it('renders the header with logo and navigation links', () => {
    // Mock the usePathname hook to return '/'
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Header />);
    
    // Check if the logo is rendered
    const logo = screen.getByText('Jesse Michael Sindbad McIntosh');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
    
    // Check if navigation links are rendered
    const experienceLink = screen.getByText('Experience');
    expect(experienceLink).toBeInTheDocument();
    expect(experienceLink).toHaveAttribute('href', '/experience');
    
    const projectsLink = screen.getByText('Projects');
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink).toHaveAttribute('href', '/projects');
  });

  it('applies active class to the Experience link when on the experience page', () => {
    // Mock the usePathname hook to return '/experience'
    (usePathname as jest.Mock).mockReturnValue('/experience');

    render(<Header />);
    
    // Check if the Experience link has the active class
    const experienceLink = screen.getByText('Experience');
    expect(experienceLink.className).toContain('active');
    
    // Check if the Projects link doesn't have the active class
    const projectsLink = screen.getByText('Projects');
    expect(projectsLink.className).not.toContain('active');
  });

  it('applies active class to the Projects link when on the projects page', () => {
    // Mock the usePathname hook to return '/projects'
    (usePathname as jest.Mock).mockReturnValue('/projects');

    render(<Header />);
    
    // Check if the Projects link has the active class
    const projectsLink = screen.getByText('Projects');
    expect(projectsLink.className).toContain('active');
    
    // Check if the Experience link doesn't have the active class
    const experienceLink = screen.getByText('Experience');
    expect(experienceLink.className).not.toContain('active');
  });
});