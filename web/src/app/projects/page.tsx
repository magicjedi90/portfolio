'use client';

import { useProjects } from '@/api/hooks';
import Projects from '@/components/Projects';
import QBem from 'qbem';
import styles from './page.module.css';

const bem = new QBem('projects');

export default function ProjectsPage() {
    const { projects, isLoading, isError } = useProjects();

    return (
        <div className={styles[bem.block()]}>
            {/* Hero Section */}
            <section className={styles[bem.elem('hero')]}>
                <div className={styles[bem.elem('hero-content')]}>
                    <h1 className={styles[bem.elem('hero-title')]}>Technical Projects</h1>
                    <p className={styles[bem.elem('hero-description')]}>
                        A showcase of innovative solutions and technical achievements
                    </p>
                </div>
            </section>

            {/* Project Highlights */}
            <section className={styles[bem.elem('highlights')]}>
                <div className={styles[bem.elem('highlights-content')]}>
                    <h2 className={styles[bem.elem('section-title')]}>Project Highlights</h2>
                    <div className={styles[bem.elem('highlights-grid')]}>
                        <div className={styles[bem.elem('highlight-card')]}>
                            <h3 className={styles[bem.elem('highlight-title')]}>Scalability</h3>
                            <p>
                                Designed and implemented systems that handle millions of users and transactions,
                                ensuring optimal performance and reliability.
                            </p>
                        </div>
                        <div className={styles[bem.elem('highlight-card')]}>
                            <h3 className={styles[bem.elem('highlight-title')]}>Innovation</h3>
                            <p>
                                Developed cutting-edge solutions using the latest technologies and best practices,
                                pushing the boundaries of what's possible.
                            </p>
                        </div>
                        <div className={styles[bem.elem('highlight-card')]}>
                            <h3 className={styles[bem.elem('highlight-title')]}>Impact</h3>
                            <p>
                                Created solutions that have transformed businesses and improved user experiences,
                                delivering measurable results.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project List */}
            <section className={styles[bem.elem('project-list')]}>
                <div className={styles[bem.elem('project-list-content')]}>
                    <h2 className={styles[bem.elem('section-title')]}>Featured Projects</h2>
                    {isLoading && (
                        <div className={styles[bem.elem('loading')]}>
                            Loading projects...
                        </div>
                    )}
                    
                    {isError && (
                        <div className={styles[bem.elem('error')]}>
                            Error loading projects. Please try again later.
                        </div>
                    )}

                    {!isLoading && !isError && projects && (
                        <Projects projects={projects} />
                    )}
                </div>
            </section>
        </div>
    );
}