import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const featuredProjects = projects.filter(p => p.isFeatured);
    const otherProjects = projects.filter(p => !p.isFeatured);

    return (
        <section
            id="projects"
            className="section d-flex flex-column justify-content-center align-items-center py-5"
        >
            <div style={{ width: '90%', maxWidth: '1100px', padding: '0 1rem' }}>
                {/* Section Header */}
                <motion.div
                    className="d-flex align-items-center gap-3 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--accent-primary)',
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                        }}
                    >
                        02.
                    </span>
                    <h3
                        style={{
                            margin: 0,
                            fontFamily: 'var(--font-serif)',
                        }}
                    >
                        Some Things I've Built
                    </h3>
                    <div
                        style={{
                            flex: 1,
                            height: '1px',
                            background: 'var(--border-subtle)',
                            maxWidth: '300px',
                        }}
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                        textAlign: 'left',
                    }}
                >
                    A selection of projects I've worked on — click to expand for details
                </motion.p>

                {/* Featured Projects */}
                <div className="mb-5">
                    <motion.h4
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            color: 'var(--accent-primary)',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                        }}
                    >
                        Featured Projects
                    </motion.h4>

                    <div className="row row-cols-1 g-4">
                        {featuredProjects.map((project, index) => (
                            <ProjectCard
                                key={`featured-${index}`}
                                project={project}
                                isExpanded={expandedIndex === index}
                                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                isFeatured={true}
                            />
                        ))}
                    </div>
                </div>

                {/* Other Projects */}
                <div>
                    <motion.h4
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                        }}
                    >
                        Other Noteworthy Projects
                    </motion.h4>

                    <div className="row row-cols-1 row-cols-md-2 g-3">
                        {otherProjects.map((project, index) => (
                            <ProjectCard
                                key={`other-${index}`}
                                project={project}
                                isExpanded={expandedIndex === featuredProjects.length + index}
                                onToggle={() => setExpandedIndex(
                                    expandedIndex === featuredProjects.length + index
                                        ? null
                                        : featuredProjects.length + index
                                )}
                                isFeatured={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;