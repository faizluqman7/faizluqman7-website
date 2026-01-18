import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const NavBar = () => {
    const isVisible = true; // Always show NavBar
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { toggleTheme, isDark } = useTheme();

    useEffect(() => {
        // Scroll listener for blur effect
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        { href: '#', label: 'home' },
        { href: '#about-me', label: 'about' },
        { href: '#projects', label: 'projects' },
        { href: '#contact', label: 'contact' },
    ];

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    // Dynamic background based on theme
    const navBackground = isDark
        ? (isScrolled ? 'rgba(10, 12, 16, 0.85)' : 'rgba(10, 12, 16, 0.7)')
        : (isScrolled ? 'rgba(250, 250, 250, 0.9)' : 'rgba(250, 250, 250, 0.8)');

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
                        background: navBackground,
                        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(12px)',
                        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(12px)',
                        borderBottom: '1px solid var(--glass-border)',
                        padding: '0.75rem 1.5rem',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <div className="container-fluid" style={{ maxWidth: '1200px' }}>
                        {/* Logo: FL. Monogram + Name */}
                        <a
                            className="navbar-brand d-flex align-items-center gap-2"
                            href="#"
                            style={{ textDecoration: 'none' }}
                        >
                            <span
                                style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontWeight: 700,
                                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                                    color: 'var(--accent-primary)',
                                }}
                            >
                                FL.
                            </span>
                            <span
                                style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontWeight: 500,
                                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                Faiz Luqman
                            </span>
                        </a>

                        {/* Mobile Toggle */}
                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle navigation"
                            style={{
                                border: '1px solid var(--glass-border)',
                                padding: '0.5rem',
                                borderRadius: '8px',
                            }}
                        >
                            <span
                                style={{
                                    display: 'block',
                                    width: '20px',
                                    height: '2px',
                                    background: 'var(--text-secondary)',
                                    marginBottom: '5px',
                                    transition: 'all 0.3s ease',
                                    transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                                }}
                            />
                            <span
                                style={{
                                    display: 'block',
                                    width: '20px',
                                    height: '2px',
                                    background: 'var(--text-secondary)',
                                    marginBottom: '5px',
                                    opacity: isMobileMenuOpen ? 0 : 1,
                                    transition: 'all 0.3s ease',
                                }}
                            />
                            <span
                                style={{
                                    display: 'block',
                                    width: '20px',
                                    height: '2px',
                                    background: 'var(--text-secondary)',
                                    transition: 'all 0.3s ease',
                                    transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                                }}
                            />
                        </button>

                        {/* Desktop Nav */}
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto align-items-center" style={{ gap: '0.5rem' }}>
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
                                                fontFamily: 'var(--font-sans)',
                                                fontWeight: 500,
                                                padding: '0.5rem 0.75rem',
                                                borderRadius: '6px',
                                                transition: 'all 0.2s ease',
                                                fontSize: '0.9rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.color = 'var(--accent-primary)';
                                                e.currentTarget.style.background = 'rgba(255, 107, 53, 0.08)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.color = 'var(--text-secondary)';
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            <span style={{
                                                fontFamily: 'var(--font-mono)',
                                                color: 'var(--accent-primary)',
                                                fontSize: '0.85rem',
                                            }}>
                                                //
                                            </span>
                                            {item.label}
                                        </a>
                                    </motion.li>
                                ))}

                                {/* Theme Toggle Button */}
                                <motion.li
                                    className="nav-item ms-2"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <button
                                        onClick={toggleTheme}
                                        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '8px',
                                            background: 'var(--glass-bg)',
                                            color: 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontSize: '1.1rem',
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                            e.currentTarget.style.color = 'var(--accent-primary)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                        }}
                                    >
                                        {isDark ? '☀️' : '🌙'}
                                    </button>
                                </motion.li>

                                {/* Resume Button */}
                                <motion.li
                                    className="nav-item ms-2"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <a
                                        href="/WAN FAIZ CV 2026.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-block',
                                            padding: '0.5rem 1.25rem',
                                            border: '1px solid var(--accent-primary)',
                                            borderRadius: '6px',
                                            color: 'var(--accent-primary)',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.85rem',
                                            fontWeight: 500,
                                            textDecoration: 'none',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)';
                                            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 107, 53, 0.2)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        Resume
                                    </a>
                                </motion.li>
                            </ul>
                        </div>

                        {/* Mobile Menu */}
                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div
                                    className="d-lg-none"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        background: isDark ? 'rgba(10, 12, 16, 0.95)' : 'rgba(250, 250, 250, 0.98)',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        borderBottom: '1px solid var(--glass-border)',
                                        padding: '1rem',
                                    }}
                                >
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {navItems.map((item) => (
                                            <li key={item.href} style={{ marginBottom: '0.5rem' }}>
                                                <a
                                                    href={item.href}
                                                    onClick={handleNavClick}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        color: 'var(--text-secondary)',
                                                        textDecoration: 'none',
                                                        padding: '0.75rem 1rem',
                                                        borderRadius: '8px',
                                                        transition: 'all 0.2s ease',
                                                    }}
                                                >
                                                    <span style={{
                                                        fontFamily: 'var(--font-mono)',
                                                        color: 'var(--accent-primary)',
                                                    }}>
                                                        //
                                                    </span>
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                        {/* Mobile Theme Toggle */}
                                        <li style={{ marginTop: '0.5rem' }}>
                                            <button
                                                onClick={() => {
                                                    toggleTheme();
                                                    handleNavClick();
                                                }}
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.75rem 1rem',
                                                    border: '1px solid var(--glass-border)',
                                                    borderRadius: '8px',
                                                    background: 'var(--glass-bg)',
                                                    color: 'var(--text-secondary)',
                                                    cursor: 'pointer',
                                                    fontFamily: 'var(--font-sans)',
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                                            </button>
                                        </li>
                                        <li style={{ marginTop: '1rem' }}>
                                            <a
                                                href="/WAN FAIZ CV 2026.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={handleNavClick}
                                                style={{
                                                    display: 'block',
                                                    textAlign: 'center',
                                                    padding: '0.75rem 1.25rem',
                                                    border: '1px solid var(--accent-primary)',
                                                    borderRadius: '6px',
                                                    color: 'var(--accent-primary)',
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.9rem',
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                Resume
                                            </a>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default NavBar;