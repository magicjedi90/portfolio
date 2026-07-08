'use client';

import { useJobs } from '@/api/hooks';
import Jobs from '@/components/Jobs';
import QBem from 'qbem';
import styles from './page.module.css';

const bem = new QBem('experience');

export default function ExperiencePage() {
    const { jobs, isLoading, isError } = useJobs();

    return (
        <div className={styles[bem.block()]}>
            {/* Hero Section */}
            <section className={styles[bem.elem('hero')]}>
                <div className={styles[bem.elem('hero-content')]}>
                    <h1 className={styles[bem.elem('hero-title')]}>Professional Journey</h1>
                    <p className={styles[bem.elem('hero-description')]}>
                        A comprehensive overview of my career progression and key achievements
                    </p>
                </div>
            </section>

            {/* Experience Overview */}
            <section className={styles[bem.elem('overview')]}>
                <div className={styles[bem.elem('overview-content')]}>
                    <h2 className={styles[bem.elem('section-title')]}>Career Highlights</h2>
                    <div className={styles[bem.elem('overview-grid')]}>
                        <div className={styles[bem.elem('overview-card')]}>
                            <h3 className={styles[bem.elem('overview-title')]}>Technical Leadership</h3>
                            <p>
                                Leading engineering teams and driving technical excellence across projects,
                                establishing best practices and architectural standards.
                            </p>
                        </div>
                        <div className={styles[bem.elem('overview-card')]}>
                            <h3 className={styles[bem.elem('overview-title')]}>Architecture & Design</h3>
                            <p>
                                Designing and implementing scalable, maintainable systems that meet
                                business requirements and technical constraints.
                            </p>
                        </div>
                        <div className={styles[bem.elem('overview-card')]}>
                            <h3 className={styles[bem.elem('overview-title')]}>Team Development</h3>
                            <p>
                                Mentoring and developing engineering talent, fostering a culture of
                                continuous learning and technical excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Work History */}
            <section className={styles[bem.elem('work-history')]}>
                <div className={styles[bem.elem('work-history-content')]}>
                    <h2 className={styles[bem.elem('section-title')]}>Work History</h2>
                    {isLoading && (
                        <div className={styles[bem.elem('loading')]}>
                            Loading experience...
                        </div>
                    )}
                    
                    {isError && (
                        <div className={styles[bem.elem('error')]}>
                            Error loading experience. Please try again later.
                        </div>
                    )}

                    {!isLoading && !isError && jobs && (
                        <Jobs jobs={jobs} />
                    )}
                </div>
            </section>
        </div>
    );
} 