import { motion, AnimatePresence } from 'framer-motion';

type Project = {
    title: string;
    description: string[];
    link?: string;
    date?: string;
    tech?: string[];
    isOngoing?: boolean;
};

const ProjectCard = ({
    project,
    isExpanded,
    onToggle
}: {
    project: Project;
    isExpanded: boolean;
    onToggle: () => void;
}) => (
    <motion.div
        className="col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
    >
        <motion.div
            className="card h-100"
            onClick={onToggle}
            style={{
                cursor: 'pointer',
                background: 'var(--bg-card)',
                border: isExpanded ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                boxShadow: isExpanded ? '0 0 20px rgba(0, 212, 255, 0.15)' : 'none',
                padding: 'clamp(1rem, 2vw, 1.5rem)',
            }}
            whileHover={{
                scale: 1.02,
                borderColor: 'var(--accent-primary)',
            }}
            transition={{ duration: 0.2 }}
        >
            <div className="card-body text-start p-0">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.5rem',
                    gap: '0.75rem',
                }}>
                    <h5
                        className="card-title fw-bold mb-0"
                        style={{
                            color: 'var(--text-primary)',
                            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            flexWrap: 'wrap',
                        }}
                    >
                        {project.title}
                        {project.isOngoing && (
                            <span style={{
                                background: 'var(--accent-primary)',
                                color: '#000',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '8px',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                            }}>
                                ONGOING
                            </span>
                        )}
                    </h5>

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '32px',
                                height: '32px',
                                minWidth: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-secondary)',
                                transition: 'all 0.3s ease',
                            }}
                            title="View on GitHub"
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                e.currentTarget.style.color = 'var(--accent-primary)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    )}
                </div>

                {project.date && (
                    <p style={{
                        color: 'var(--accent-primary)',
                        fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                        marginBottom: '0.5rem',
                        fontWeight: 500,
                    }}>
                        {project.date}
                    </p>
                )}

                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                    marginBottom: isExpanded ? '0.75rem' : 0,
                }}>
                    {isExpanded ? 'Click to collapse ↑' : 'Click to expand ↓'}
                </p>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <ul
                                className="card-text mt-2 mb-2"
                                style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                {project.description.map((point, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            color: 'var(--text-secondary)',
                                            marginBottom: '0.4rem',
                                            paddingLeft: '1rem',
                                            position: 'relative',
                                            lineHeight: 1.5,
                                            fontSize: 'clamp(0.8rem, 1.6vw, 0.9rem)',
                                        }}
                                    >
                                        <span
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                color: 'var(--accent-primary)',
                                            }}
                                        >
                                            •
                                        </span>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            {project.tech && project.tech.length > 0 && (
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.4rem',
                                    marginTop: '0.75rem',
                                }}>
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                background: 'var(--bg-secondary)',
                                                border: '1px solid var(--border-subtle)',
                                                borderRadius: '12px',
                                                padding: '0.2rem 0.6rem',
                                                fontSize: 'clamp(0.65rem, 1.3vw, 0.75rem)',
                                                color: 'var(--text-muted)',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    </motion.div>
);

export default ProjectCard;