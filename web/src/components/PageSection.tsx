import { ReactNode } from 'react';
import QBem from 'qbem';
import styles from './PageSection.module.css';

const bem = new QBem('page-section');

interface PageSectionProps {
    heading: string;
    alternate?: boolean;
    children: ReactNode;
}

export default function PageSection({ heading, alternate = false, children }: PageSectionProps) {
    // qbem modifiers return "base base--modifier" as one string, which is not a valid
    // CSS Module key — modifier classes must be composed explicitly.
    const sectionClassName = alternate
        ? `${styles[bem.block()]} ${styles['page-section--alternate']}`
        : styles[bem.block()];

    return (
        <section className={sectionClassName}>
            <div className={styles[bem.elem('content')]}>
                <h2 className={styles[bem.elem('heading')]}>{heading}</h2>
                {children}
            </div>
        </section>
    );
}
