import QBem from 'qbem';
import styles from './Hero.module.css';

const bem = new QBem('hero');

interface HeroProps {
    title: string;
    subtitle?: string;
    description: string;
}

export default function Hero({ title, subtitle, description }: HeroProps) {
    return (
        <section className={styles[bem.block()]}>
            <div className={styles[bem.elem('content')]}>
                <h1 className={styles[bem.elem('title')]}>{title}</h1>
                {subtitle && <p className={styles[bem.elem('subtitle')]}>{subtitle}</p>}
                <p className={styles[bem.elem('description')]}>{description}</p>
            </div>
        </section>
    );
}
