'use client';

import { useJobs, useProjects } from '@/api/hooks';
import ApiSection from '@/components/ApiSection';
import Hero from '@/components/Hero';
import HighlightCards, { Highlight } from '@/components/HighlightCards';
import Jobs from '@/components/Jobs';
import PageSection from '@/components/PageSection';
import Projects from '@/components/Projects';
import QBem from 'qbem';
import styles from './page.module.css';

const bem = new QBem('home');

const areasOfExpertise: Highlight[] = [
    {
        title: 'System Architecture',
        description:
            'Designing and implementing scalable, maintainable, and high-performance systems ' +
            'that meet business requirements and technical constraints.',
    },
    {
        title: 'Technical Leadership',
        description:
            'Leading and mentoring development teams, establishing best practices, and ' +
            'driving technical excellence across projects.',
    },
    {
        title: 'Full-Stack Development',
        description:
            'Building end-to-end solutions with modern technologies, ensuring seamless ' +
            'integration between frontend and backend systems.',
    },
];

export default function Home() {
    const { jobs, isLoading: isLoadingJobs, error: jobsError } = useJobs();
    const { projects, isLoading: isLoadingProjects, error: projectsError } = useProjects();

    return (
        <div className={styles[bem.block()]}>
            <Hero
                title="Jesse Michael Sindbad McIntosh"
                subtitle="Staff Software Engineer"
                description="Specializing in system architecture, technical leadership, and full-stack development"
            />

            <PageSection heading="About Me" alternate>
                <p className={styles[bem.elem('about-text')]}>
                    I am a Staff Software Engineer with extensive experience in building scalable,
                    maintainable, and high-performance applications. My expertise lies in system architecture,
                    technical leadership, and full-stack development.
                </p>
            </PageSection>

            <HighlightCards heading="Areas of Expertise" highlights={areasOfExpertise} />

            <ApiSection
                heading="Recent Experience"
                isLoading={isLoadingJobs}
                error={jobsError}
                loadingMessage="Loading experience..."
                errorMessage="Error loading experience. Please try again later."
                alternate
            >
                {jobs && <Jobs jobs={jobs.slice(0, 3)} />}
            </ApiSection>

            <ApiSection
                heading="Featured Projects"
                isLoading={isLoadingProjects}
                error={projectsError}
                loadingMessage="Loading projects..."
                errorMessage="Error loading projects. Please try again later."
            >
                {projects && <Projects projects={projects.slice(0, 3)} />}
            </ApiSection>
        </div>
    );
}
