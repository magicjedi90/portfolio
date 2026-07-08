import { Project } from '@/api/types';
import QBem from 'qbem';
import styles from './Projects.module.css';

const bem = new QBem('projects');

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <div className={styles[bem.block()]}>
            {projects.map((project) => (
                <div key={project.id} className={styles[bem.elem('card')]}>
                    <div className={styles[bem.elem('card-content')]}>
                        <h3 className={styles[bem.elem('title')]}>{project.name}</h3>
                        <p className={styles[bem.elem('description')]}>{project.description}</p>
                        <div className={styles[bem.elem('tech-stack')]}>
                            {project.skills.map((skill) => (
                                <span key={skill.id} className={styles[bem.elem('tech-tag')]}>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                        <div className={styles[bem.elem('links')]}>
                            {project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles[bem.elem('link')]}
                                >
                                    GitHub
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}