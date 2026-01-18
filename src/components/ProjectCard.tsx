import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../data/projects';

const ProjectCard = ({
    project,
    isExpanded,
    onToggle,
    isFeatured = false,
}: {
    project: Project;
    isExpanded: boolean;
    onToggle: () => void;
    isFeatured?: boolean;
}) => (
    <motion.div
        className="col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
    >
        <motion.div
            className={isFeatured ? 'glass-card' : 'card'}
            onClick={onToggle}
            style={{
                cursor: 'pointer',
                background: isFeatured ? 'var(--glass-bg)' : 'var(--bg-card)',
                border: isExpanded
                    ? '1px solid var(--accent-primary)'
                    : '1px solid var(--glass-border)',
                boxShadow: isExpanded
                    ? '0 0 30px rgba(100, 255, 218, 0.1)'
                    : 'none',
                padding: isFeatured ? 'clamp(1.5rem, 3vw, 2rem)' : 'clamp(1rem, 2vw, 1.5rem)',
                borderRadius: isFeatured ? '16px' : '12px',
                height: '100%',
            }}
            whileHover={{
                borderColor: 'var(--accent-primary)',
                y: -4,
            }}
            transition={{ duration: 0.2 }}
        >
            {/* Highlighted Project Image */}
            {project.isHighlighted && project.image && (
                <div style={{
                    marginBottom: '1.5rem',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                }}>
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            )}

            <div className="card-body text-start p-0">
                {/* Header Row */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem',
                    gap: '1rem',
                }}>
                    <div style={{ flex: 1 }}>
                        {/* Featured Label */}
                        {isFeatured && (
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                color: 'var(--accent-primary)',
                                display: 'block',
                                marginBottom: '0.5rem',
                            }}>
                                Featured Project
                            </span>
                        )}

                        {/* Title */}
                        <h5
                            style={{
                                fontFamily: isFeatured ? 'var(--font-serif)' : 'var(--font-sans)',
                                color: 'var(--text-primary)',
                                fontSize: isFeatured
                                    ? 'clamp(1.1rem, 2.5vw, 1.4rem)'
                                    : 'clamp(0.95rem, 2vw, 1.1rem)',
                                fontWeight: isFeatured ? 600 : 600,
                                margin: 0,
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
                                    color: 'var(--bg-primary)',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.65rem',
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-mono)',
                                }}>
                                    ONGOING
                                </span>
                            )}
                        </h5>
                    </div>

                    {/* GitHub Link */}
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '36px',
                                height: '36px',
                                minWidth: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-secondary)',
                                transition: 'all 0.2s ease',
                            }}
                            title="View on GitHub"
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                e.currentTarget.style.color = 'var(--accent-primary)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'var(--glass-border)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    )}
                </div>

                {/* Date */}
                {project.date && (
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)',
                        fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                        marginBottom: '0.75rem',
                    }}>
                        {project.date}
                    </p>
                )}

                {/* Click to expand hint */}
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                    marginBottom: isExpanded ? '1rem' : 0,
                    fontFamily: 'var(--font-mono)',
                }}>
                    {isExpanded ? '↑ Click to collapse' : '↓ Click to expand'}
                </p>

                {/* Expandable Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                        >
                            {/* Description */}
                            <ul
                                style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: '0 0 1rem 0',
                                }}
                            >
                                {project.description.map((point, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            color: 'var(--text-secondary)',
                                            marginBottom: '0.5rem',
                                            paddingLeft: '1.25rem',
                                            position: 'relative',
                                            lineHeight: 1.6,
                                            fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                                        }}
                                    >
                                        <span
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                color: 'var(--accent-primary)',
                                                fontFamily: 'var(--font-mono)',
                                            }}
                                        >
                                            ▹
                                        </span>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            {/* Tech Stack */}
                            {project.tech && project.tech.length > 0 && (
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                }}>
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                background: 'rgba(100, 255, 218, 0.1)',
                                                border: '1px solid rgba(100, 255, 218, 0.2)',
                                                borderRadius: '6px',
                                                padding: '0.25rem 0.75rem',
                                                fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)',
                                                color: 'var(--accent-primary)',
                                                fontFamily: 'var(--font-mono)',
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