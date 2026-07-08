import { ReactNode } from 'react';
import QBem from 'qbem';
import PageSection from './PageSection';
import styles from './ApiSection.module.css';

const bem = new QBem('api-section');

interface ApiSectionProps {
    heading: string;
    isLoading: boolean;
    error: unknown;
    loadingMessage: string;
    errorMessage: string;
    alternate?: boolean;
    children: ReactNode;
}

export default function ApiSection({
    heading,
    isLoading,
    error,
    loadingMessage,
    errorMessage,
    alternate = false,
    children,
}: ApiSectionProps) {
    const hasError = error !== undefined && error !== null;

    return (
        <PageSection heading={heading} alternate={alternate}>
            {isLoading && <div className={styles[bem.elem('loading')]}>{loadingMessage}</div>}
            {!isLoading && hasError && <div className={styles[bem.elem('error')]}>{errorMessage}</div>}
            {!isLoading && !hasError && children}
        </PageSection>
    );
}
