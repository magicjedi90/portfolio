import QBem from 'qbem';
import PageSection from './PageSection';
import styles from './HighlightCards.module.css';

const bem = new QBem('highlights');

export interface Highlight {
    title: string;
    description: string;
}

interface HighlightCardsProps {
    heading: string;
    highlights: Highlight[];
    alternate?: boolean;
}

export default function HighlightCards({ heading, highlights, alternate = false }: HighlightCardsProps) {
    const cardClassName = alternate
        ? `${styles[bem.elem('card')]} ${styles['highlights__card--alternate']}`
        : styles[bem.elem('card')];

    return (
        <PageSection heading={heading} alternate={alternate}>
            <div className={styles[bem.elem('grid')]}>
                {highlights.map((highlight) => (
                    <div key={highlight.title} className={cardClassName}>
                        <h3 className={styles[bem.elem('card-title')]}>{highlight.title}</h3>
                        <p>{highlight.description}</p>
                    </div>
                ))}
            </div>
        </PageSection>
    );
}
