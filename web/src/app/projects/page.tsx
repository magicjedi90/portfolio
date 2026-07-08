'use client';

import { useProjects } from '@/api/hooks';
import ApiSection from '@/components/ApiSection';
import Hero from '@/components/Hero';
import HighlightCards, { Highlight } from '@/components/HighlightCards';
import Projects from '@/components/Projects';
import QBem from 'qbem';
import styles from './page.module.css';

const bem = new QBem('projects');

const projectHighlights: Highlight[] = [
    {
        title: 'Scalability',
        description:
            'Designed and implemented systems that handle millions of users and transactions, ' +
            'ensuring optimal performance and reliability.',
    },
    {
        title: 'Innovation',
        description:
            "Developed cutting-edge solutions using the latest technologies and best practices, " +
            "pushing the boundaries of what's possible.",
    },
    {
        title: 'Impact',
        description:
            'Created solutions that have transformed businesses and improved user experiences, ' +
            'delivering measurable results.',
    },
];

export default function ProjectsPage() {
    const { projects, isLoading, error } = useProjects();

    return (
        <div className={styles[bem.block()]}>
            <Hero
                title="Technical Projects"
                description="A showcase of innovative solutions and technical achievements"
            />

            <HighlightCards heading="Project Highlights" highlights={projectHighlights} alternate />

            <ApiSection
                heading="Featured Projects"
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading projects..."
                errorMessage="Error loading projects. Please try again later."
            >
                {projects && <Projects projects={projects} />}
            </ApiSection>
        </div>
    );
}
