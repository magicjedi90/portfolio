'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import QBem from 'qbem';
import styles from './Header.module.css';

const bem = new QBem('header');

export default function Header() {
    const pathname = usePathname();

    // qbem modifiers return "base base--modifier" as one string, which is not a valid
    // CSS Module key — modifier classes must be composed explicitly.
    const navLinkClassName = (href: string) =>
        pathname === href
            ? `${styles[bem.elem('nav-link')]} ${styles['header__nav-link--active']}`
            : styles[bem.elem('nav-link')];

    return (
        <header className={styles[bem.block()]}>
            <div className={styles[bem.elem('content')]}>
                <Link href="/" className={styles[bem.elem('logo')]}>
                    Jesse Michael Sindbad McIntosh
                </Link>
                <nav className={styles[bem.elem('nav')]}>
                    <Link href="/experience" className={navLinkClassName('/experience')}>
                        Experience
                    </Link>
                    <Link href="/projects" className={navLinkClassName('/projects')}>
                        Projects
                    </Link>
                </nav>
            </div>
        </header>
    );
}
