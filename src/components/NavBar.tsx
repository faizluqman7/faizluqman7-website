import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        const aboutMeSection = document.getElementById('about-me');
        if (aboutMeSection) {
            observer.observe(aboutMeSection);
        }

        return () => {
            if (aboutMeSection) {
                observer.unobserve(aboutMeSection);
            }
        };
    }, []);

    const navItems = [
        { href: '#about-me', label: 'About' },
        { href: '#tech', label: 'Skills' },
        { href: '#work-experience', label: 'Timeline' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    className="navbar navbar-expand-lg fixed-top"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                        background: 'rgba(10, 10, 15, 0.9)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderBottom: '1px solid var(--border-subtle)',
                        padding: '0.5rem 1rem',
                    }}
                >
                    <div className="container-fluid">
                        <a
                            className="navbar-brand"
                            href="#"
                            style={{
                                fontWeight: 700,
                                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                                color: 'var(--text-primary)',
                            }}
                        >
                            FL
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            style={{
                                border: '1px solid var(--border-subtle)',
                                padding: '0.4rem',
                            }}
                        >
                            <span
                                className="navbar-toggler-icon"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28160, 160, 176, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto" style={{ gap: '0.25rem' }}>
                                {navItems.map((item, idx) => (
                                    <motion.li
                                        className="nav-item"
                                        key={item.href}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                    >
                                        <a
                                            className="nav-link"
                                            href={item.href}
                                            style={{
                                                color: 'var(--text-secondary)',
                                                fontWeight: 500,
                                                padding: '0.4rem 0.75rem',
                                                borderRadius: '6px',
                                                transition: 'all 0.2s ease',
                                                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.color = 'var(--accent-primary)';
                                                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.08)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.color = 'var(--text-secondary)';
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            {item.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default NavBar;