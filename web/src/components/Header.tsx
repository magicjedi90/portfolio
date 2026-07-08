'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import QBem from 'qbem';
import styles from './Header.module.css';

const bem = new QBem('header');

export default function Header() {
    const pathname = usePathname();

    return (
        <header className={styles[bem.block()]}>
            <div className={styles[bem.elem('content')]}>
                <Link href="/" className={styles[bem.elem('logo')]}>
                    Jesse Michael Sindbad McIntosh
                </Link>
                <nav className={styles[bem.elem('nav')]}>
                    <Link
                        href="/experience"
                        className={`${styles[bem.elem('nav-link')]} ${pathname === '/experience' ? styles[bem.elem('nav-link', ['active'])] : ''}`}
                    >
                        Experience
                    </Link>
                    <Link
                        href="/projects"
                        className={`${styles[bem.elem('nav-link')]} ${pathname === '/projects' ? styles[bem.elem('nav-link', ['active'])] : ''}`}
                    >
                        Projects
                    </Link>
                </nav>
            </div>
        </header>
    );
} 