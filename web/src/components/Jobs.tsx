import { Job } from '@/api/types';
import QBem from 'qbem';
import styles from './Jobs.module.css';

const bem = new QBem('jobs');

interface JobsProps {
    jobs: Job[];
}

export default function Jobs({ jobs }: JobsProps) {
    return (
        <div className={styles[bem.block()]}>
            {jobs.map((job) => (
                <div key={job.id} className={styles[bem.elem('card')]}>
                    <div className={styles[bem.elem('card-content')]}>
                        <div className={styles[bem.elem('header')]}>
                            <h3 className={styles[bem.elem('title')]}>{job.roles}</h3>
                            <span className={styles[bem.elem('company')]}>{job.company_name}</span>
                        </div>
                        <div className={styles[bem.elem('period')]}>
                            {job.start_date} - {job.end_date || 'Present'}
                        </div>
                        <p className={styles[bem.elem('description')]}>{job.responsibilities}</p>
                        <p className={styles[bem.elem('responsibilities')]}>
                            {job.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
} 