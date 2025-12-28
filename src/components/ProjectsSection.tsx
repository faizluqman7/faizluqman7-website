import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section id="projects" className="section d-flex flex-column justify-content-center align-items-center text-center py-5">
            <div style={{ width: '90%', maxWidth: '1100px', padding: '0 1rem' }}>
                <motion.h3
                    className="mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Projects
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{
                        color: 'var(--text-secondary)',
                        marginBottom: '1.5rem',
                        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                    }}
                >
                    A selection of projects I've built — click to expand for details
                </motion.p>
                <div className="row row-cols-1 row-cols-md-2 g-3">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            isExpanded={expandedIndex === index}
                            onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;