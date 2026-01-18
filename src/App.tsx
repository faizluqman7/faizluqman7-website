import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import HeroSection from './components/HeroSection';
import AboutSection from "./components/About.tsx";
import TechSection from "./components/Tech.tsx";
import ProjectsSection from "./components/ProjectsSection.tsx";
import Contact from "./components/Contact.tsx";
import ThreeBackground from "./components/ThreeBackground.tsx";
import NavBar from "./components/NavBar.tsx";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import WorkExperience from "./components/WorkExperience.tsx";
import InteractiveGraph from "./components/InteractiveGraph.tsx";

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [graphOpen, setGraphOpen] = useState(false);

    useEffect(() => {
        gsap.utils.toArray<HTMLElement>(".section").forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                    },
                }
            );
        });
    }, []);

    return (
        <ThemeProvider>
            <main className="fullpage-container">
                <NavBar />
                <ThreeBackground />
                <HeroSection />
                <AboutSection />
                <TechSection />
                <WorkExperience />
                <ProjectsSection />
                <Contact />

                {/* Floating Explore Graph Button */}
                <AnimatePresence>
                    {!graphOpen && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 2 }}
                            onClick={() => setGraphOpen(true)}
                            className="floating-graph-btn"
                            style={{
                                position: 'fixed',
                                top: '80px',
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
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span style={{ fontSize: '1rem' }}>🔍</span>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Interactive Graph Overlay */}
                <InteractiveGraph
                    isOpen={graphOpen}
                    onClose={() => setGraphOpen(false)}
                />
            </main>
        </ThemeProvider>
    );
}

export default App;

