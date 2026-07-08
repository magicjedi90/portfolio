'use client';

import { useJobs, useProjects } from '@/api/hooks';
import Jobs from '@/components/Jobs';
import Projects from '@/components/Projects';
import QBem from 'qbem';
import styles from './page.module.css';

const bem = new QBem('home');

export default function Home() {
    const { jobs, isLoading: isLoadingJobs, isError: isErrorJobs } = useJobs();
    const { projects, isLoading: isLoadingProjects, isError: isErrorProjects } = useProjects();

    return (
        <div className={styles[bem.block()]}>
            {/* Hero Section */}
            <section className={styles[bem.elem('hero')]}>
                <div className={styles[bem.elem('hero-content')]}>
                    <h1 className={styles[bem.elem('hero-title')]}>Jesse Michael Sindbad McIntosh</h1>
                    <p className={styles[bem.elem('hero-subtitle')]}>Staff Software Engineer</p>
                    <p className={styles[bem.elem('hero-description')]}>
                        Specializing in system architecture, technical leadership, and full-stack development
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className={styles[bem.elem('about')]}>
                <div className={styles[bem.elem('about-content')]}>
                    <h2 className={styles[bem.elem('section-title')]}>About Me</h2>
                    <p className={styles[bem.elem('about-text')]}>
                        I am a Staff Software Engineer with extensive experience in building scalable,
                        maintainable, and high-performance applications. My expertise lies in system architecture,
                        technical leadership, and full-stack development.
                    </p>
                </div>
            </section>

            {/* Expertise Section */}
            <section className={styles[bem.elem('expertise')]}>
                <div className={styles[bem.elem('expertise-content')]}>
                    <h2 className={styles[bem.elem('section-title')]}>Areas of Expertise</h2>
                    <div className={styles[bem.elem('expertise-grid')]}>
                        <div className={styles[bem.elem('expertise-card')]}>
                            <h3 className={styles[bem.elem('expertise-title')]}>System Architecture</h3>
                            <p>
                                Designing and implementing scalable, maintainable, and high-performance systems
                                that meet business requirements and technical constraints.
                            </p>
                        </div>
                        <div className={styles[bem.elem('expertise-card')]}>
                            <h3 className={styles[bem.elem('expertise-title')]}>Technical Leadership</h3>
                            <p>
                                Leading and mentoring development teams, establishing best practices, and
                                driving technical excellence across projects.
                            </p>
                        </div>
                        <div className={styles[bem.elem('expertise-card')]}>
                            <h3 className={styles[bem.elem('expertise-title')]}>Full-Stack Development</h3>
                            <p>
                                Building end-to-end solutions with modern technologies, ensuring seamless
                                integration between frontend and backend systems.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Experience Section */}
            <section className={styles[bem.elem('experience')]}>
                <div className={styles[bem.elem('experience-content')]}>
                    <h2 className={styles[bem.elem('section-title')]}>Recent Experience</h2>
                    {isLoadingJobs && (
                        <div className={styles[bem.elem('loading')]}>
                            Loading experience...
                        </div>
                    )}
                    
                    {isErrorJobs && (
                        <div className={styles[bem.elem('error')]}>
                            Error loading experience. Please try again later.
                        </div>
                    )}

                    {!isLoadingJobs && !isErrorJobs && jobs && (
                        <Jobs jobs={jobs.slice(0, 3)} />
                    )}
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className={styles[bem.elem('projects')]}>
                <div className={styles[bem.elem('projects-content')]}>
                    <h2 className={styles[bem.elem('section-title')]}>Featured Projects</h2>
                    {isLoadingProjects && (
                        <div className={styles[bem.elem('loading')]}>
                            Loading projects...
                        </div>
                    )}
                    
                    {isErrorProjects && (
                        <div className={styles[bem.elem('error')]}>
                            Error loading projects. Please try again later.
                        </div>
                    )}

                    {!isLoadingProjects && !isErrorProjects && projects && (
                        <Projects projects={projects.slice(0, 3)} />
                    )}
                </div>
            </section>
        </div>
    );
}
