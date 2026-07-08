import { render, screen } from '@testing-library/react';
import Jobs from '../Jobs';
import { Job } from '@/api/types';

// Mock data for testing
const mockJobs: Job[] = [
  {
    id: 1,
    company_name: 'Test Company',
    company_website: 'https://testcompany.com',
    roles: 'Software Engineer',
    start_date: '2020-01-01',
    end_date: '2022-01-01',
    is_current_job: false,
    description: 'Worked on various projects',
    responsibilities: 'Developed features, fixed bugs'
  },
  {
    id: 2,
    company_name: 'Current Company',
    company_website: 'https://currentcompany.com',
    roles: 'Senior Developer',
    start_date: '2022-02-01',
    end_date: null,
    is_current_job: true,
    description: 'Working on exciting projects',
    responsibilities: 'Leading development, mentoring junior developers'
  }
];

describe('Jobs Component', () => {
  it('renders jobs correctly', () => {
    render(<Jobs jobs={mockJobs} />);
    
    // Check if company names are rendered
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Current Company')).toBeInTheDocument();
    
    // Check if roles are rendered
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    
    // Check if dates are rendered correctly
    expect(screen.getByText('2020-01-01 - 2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('2022-02-01 - Present')).toBeInTheDocument();
    
    // Check if descriptions are rendered
    expect(screen.getByText('Worked on various projects')).toBeInTheDocument();
    expect(screen.getByText('Working on exciting projects')).toBeInTheDocument();
    
    // Check if responsibilities are rendered
    expect(screen.getByText('Developed features, fixed bugs')).toBeInTheDocument();
    expect(screen.getByText('Leading development, mentoring junior developers')).toBeInTheDocument();
  });
  
  it('renders empty state when no jobs are provided', () => {
    render(<Jobs jobs={[]} />);
    
    // The component should render an empty div with the jobs class
    const jobsContainer = document.querySelector('.jobs');
    expect(jobsContainer).toBeInTheDocument();
    expect(jobsContainer?.children.length).toBe(0);
  });
});