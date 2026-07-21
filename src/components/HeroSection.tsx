import { useState } from 'react';
import { motion } from "framer-motion";
import TextReveal from './TextReveal';

interface HeroSectionProps {
    onOpenGraph?: () => void;
}

const HeroSection = ({ onOpenGraph }: HeroSectionProps) => {
    const [showContent, setShowContent] = useState(false);

    return (
        <motion.section
            className="section d-flex align-items-center"
            style={{
                minHeight: "100vh",
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onAnimationComplete={() => setShowContent(true)}
        >
            <div
                className="container-fluid"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '2rem',
                    alignItems: 'center',
                }}
            >
                {/* Left Content - Text (takes 7 columns on desktop) */}
                <div
                    style={{
                        gridColumn: 'span 12',
                        textAlign: 'left',
                        padding: '0 1rem',
                    }}
                    className="hero-text-col"
                >
                    {/* Eyebrow Text */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{ marginBottom: '1rem' }}
                    >
                        <span
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                                color: 'var(--accent-primary)',
                                fontWeight: 500,
                            }}
                        >
                            👋 Hi, I'm
                        </span>
                    </motion.div>

                    {/* Main Name - H1 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <h1
                            style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                                fontWeight: 800,
                                color: 'var(--text-primary)',
                                marginBottom: '0.25rem',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.1,
                            }}
                        >
                            {showContent ? (
                                <TextReveal
                                    text="Faiz Luqman."
                                    duration={1500}
                                    scramble={true}
                                />
                            ) : (
                                '\u00A0'
                            )}
                        </h1>
                    </motion.div>

                    {/* Subtitle - H2 */}
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.0, duration: 0.6 }}
                        style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            marginBottom: '1.5rem',
                            lineHeight: 1.4,
                        }}
                    >
                        Computer Science Graduate{' '}
                        <span style={{ color: 'var(--accent-primary)' }}>|</span>{' '}
                        Incoming Technology Developer @ Barclays
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.3, duration: 0.6 }}
                        style={{
                            maxWidth: '540px',
                            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            marginBottom: '2rem',
                        }}
                    >
                        Computer Science graduate (First-Class Honours) from The University of Edinburgh,
                        and incoming Technology Developer at Barclays.
                        Passionate about full-stack development, and building software that makes a difference.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="d-flex flex-wrap gap-3"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.6, duration: 0.6 }}
                    >
                        <a
                            href="#projects"
                            className="btn btn-primary"
                            style={{
                                padding: '14px 32px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: '8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            See My Work
                            <span style={{ fontSize: '1.1rem' }}>↓</span>
                        </a>
                        <a
                            href="#contact"
                            className="btn btn-outline-primary"
                            style={{
                                padding: '14px 32px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: '8px',
                            }}
                        >
                            Get In Touch
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="position-absolute"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
                style={{
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <span
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
                    scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    style={{
                        width: '20px',
                        height: '32px',
                        border: '2px solid var(--text-muted)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '6px',
                    }}
                >
                    <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        style={{
                            width: '3px',
                            height: '8px',
                            background: 'var(--accent-primary)',
                            borderRadius: '2px',
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Explore Graph Button - positioned in hero */}
            {onOpenGraph && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    onClick={onOpenGraph}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        position: 'absolute',
                        top: '100px',
                        right: '24px',
                        zIndex: 100,
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        fontFamily: 'var(--font-mono)',
                        borderRadius: '8px',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid var(--accent-secondary, #FF6B35)',
                        color: 'var(--accent-secondary, #FF6B35)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <span style={{ fontSize: '1rem' }}>🔍</span>
                </motion.button>
            )}

            {/* CSS for responsive grid */}
            <style>{`
                @media (min-width: 992px) {
                    .hero-text-col {
                        grid-column: span 7 !important;
                    }
                }
            `}</style>
        </motion.section>
    );
};

export default HeroSection;