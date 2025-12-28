import { useState } from 'react';
import { motion } from "framer-motion";
import TextReveal from './TextReveal';

const HeroSection = () => {
    const [showContent, setShowContent] = useState(false);

    return (
        <motion.section
            className="section d-flex flex-column justify-content-center align-items-center text-center"
            style={{ height: "100vh", padding: '1rem' }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onAnimationComplete={() => setShowContent(true)}
        >
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ marginBottom: '0.5rem' }}
            >
                <span
                    style={{
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                        color: 'var(--text-secondary)',
                        fontWeight: 300,
                    }}
                >
                    👋 Hi, I'm
                </span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <h1
                    className="fw-bold"
                    style={{
                        fontSize: 'clamp(2.5rem, 10vw, 5rem)',
                        color: '#ffffff',
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.02em',
                    }}
                >
                    {showContent ? (
                        <TextReveal
                            text="Faiz Luqman"
                            duration={1500}
                            scramble={true}
                        />
                    ) : (
                        '\u00A0'
                    )}
                </h1>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.8 }}
                style={{
                    maxWidth: '600px',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
                    color: 'var(--text-secondary)',
                    padding: '0 1rem',
                    lineHeight: 1.6,
                }}
            >
                Computer Science Student | Aspiring Software Engineer
            </motion.p>

            <motion.div
                className="d-flex flex-wrap gap-3 mt-4 justify-content-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.8 }}
            >
                <a href="#about-me" className="btn btn-primary">
                    About Me
                </a>
                <a href="#projects" className="btn btn-outline-primary">
                    View Projects
                </a>
            </motion.div>

            <motion.p
                className="scroll-down-arrow position-absolute bottom-0 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
                style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}
            >
                ⬇️ scroll down ⬇️
            </motion.p>
        </motion.section>
    );
};

export default HeroSection;