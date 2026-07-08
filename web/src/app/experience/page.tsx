'use client';

import { useJobs } from '@/api/hooks';
import ApiSection from '@/components/ApiSection';
import Hero from '@/components/Hero';
import HighlightCards, { Highlight } from '@/components/HighlightCards';
import Jobs from '@/components/Jobs';
import QBem from 'qbem';
import styles from './page.module.css';

const bem = new QBem('experience');

const careerHighlights: Highlight[] = [
    {
        title: 'Technical Leadership',
        description:
            'Leading engineering teams and driving technical excellence across projects, ' +
            'establishing best practices and architectural standards.',
    },
    {
        title: 'Architecture & Design',
        description:
            'Designing and implementing scalable, maintainable systems that meet ' +
            'business requirements and technical constraints.',
    },
    {
        title: 'Team Development',
        description:
            'Mentoring and developing engineering talent, fostering a culture of ' +
            'continuous learning and technical excellence.',
    },
];

export default function ExperiencePage() {
    const { jobs, isLoading, error } = useJobs();

    return (
        <div className={styles[bem.block()]}>
            <Hero
                title="Professional Journey"
                description="A comprehensive overview of my career progression and key achievements"
            />

            <HighlightCards heading="Career Highlights" highlights={careerHighlights} alternate />

            <ApiSection
                heading="Work History"
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading experience..."
                errorMessage="Error loading experience. Please try again later."
            >
                {jobs && <Jobs jobs={jobs} />}
            </ApiSection>
        </div>
    );
}
