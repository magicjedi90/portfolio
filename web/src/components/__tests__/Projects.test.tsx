import { render, screen } from '@testing-library/react';
import Projects from '../Projects';
import { Project, Skill } from '@/api/types';

// Mock data for testing
const mockSkills: Skill[] = [
  {
    id: 1,
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    official_site_url: 'https://reactjs.org',
    proficiency: 'Expert',
    parent_id: null
  },
  {
    id: 2,
    name: 'TypeScript',
    description: 'A typed superset of JavaScript',
    official_site_url: 'https://www.typescriptlang.org',
    proficiency: 'Advanced',
    parent_id: null
  },
  {
    id: 3,
    name: 'Next.js',
    description: 'The React Framework for Production',
    official_site_url: 'https://nextjs.org',
    proficiency: 'Intermediate',
    parent_id: null
  }
];

const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Portfolio Website',
    description: 'A personal portfolio website built with Next.js',
    github_url: 'https://github.com/user/portfolio',
    job_id: null,
    skills: [mockSkills[0], mockSkills[1], mockSkills[2]]
  },
  {
    id: 2,
    name: 'E-commerce Platform',
    description: 'An e-commerce platform with product management',
    github_url: 'https://github.com/user/ecommerce',
    job_id: 1,
    skills: [mockSkills[0], mockSkills[1]]
  }
];

describe('Projects Component', () => {
  it('renders projects correctly', () => {
    render(<Projects projects={mockProjects} />);

    // Check if project names are rendered
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument();
    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();

    // Check if descriptions are rendered
    expect(screen.getByText('A personal portfolio website built with Next.js')).toBeInTheDocument();
    expect(screen.getByText('An e-commerce platform with product management')).toBeInTheDocument();

    // Check if skills are rendered
    const reactElements = screen.getAllByText('React');
    expect(reactElements.length).toBeGreaterThan(0);
    expect(reactElements[0]).toBeInTheDocument();

    const typescriptElements = screen.getAllByText('TypeScript');
    expect(typescriptElements.length).toBeGreaterThan(0);
    expect(typescriptElements[0]).toBeInTheDocument();

    expect(screen.getByText('Next.js')).toBeInTheDocument();

    // Check if GitHub links are rendered
    const githubLinks = screen.getAllByText('GitHub');
    expect(githubLinks).toHaveLength(2);
    expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/user/portfolio');
    expect(githubLinks[1]).toHaveAttribute('href', 'https://github.com/user/ecommerce');
  });

  it('renders empty state when no projects are provided', () => {
    render(<Projects projects={[]} />);

    // The component should render an empty div with the projects class
    const projectsContainer = document.querySelector('.projects');
    expect(projectsContainer).toBeInTheDocument();
    expect(projectsContainer?.children.length).toBe(0);
  });

  it('handles projects without GitHub URLs', () => {
    const projectsWithoutGithub = [
      {
        ...mockProjects[0],
        github_url: null
      }
    ];

    render(<Projects projects={projectsWithoutGithub} />);

    // Check if project name is rendered
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument();

    // Check that no GitHub link is rendered
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
  });
});
