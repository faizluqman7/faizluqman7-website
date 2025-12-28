import { motion } from 'framer-motion';

const technologies = [
    // Languages
    { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", category: "Languages" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Languages" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Languages" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Languages" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Languages" },

    // Frameworks
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frameworks" },
    { name: "SwiftUI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", category: "Frameworks" },
    { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", category: "Frameworks" },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Frameworks" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Frameworks" },

    // AI/ML
    { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", category: "AI/ML" },
    { name: "OpenCV", logo: "https://upload.wikimedia.org/wikipedia/commons/3/32/OpenCV_Logo_with_text_svg_version.svg", category: "AI/ML" },

    // Tools
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "Tools" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tools" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Tools" },
];

const TechSection = () => (
    <section id="tech" className="section d-flex flex-column justify-content-center align-items-center text-center py-5">
        <div style={{ width: '90%', maxWidth: '1000px', padding: '0 1rem' }}>
            <motion.h3
                className="mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Technologies & Skills
            </motion.h3>
            <motion.p
                className="mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                Languages, frameworks, and tools I work with regularly
            </motion.p>

            <div className="row row-cols-3 row-cols-md-4 row-cols-lg-5 g-2 g-md-3 justify-content-center">
                {technologies.map((tech, idx) => (
                    <motion.div
                        key={idx}
                        className="col"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.03 }}
                        viewport={{ once: true }}
                    >
                        <div
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '12px',
                                padding: 'clamp(0.75rem, 2vw, 1.25rem)',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                cursor: 'default',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <img
                                src={tech.logo}
                                alt={tech.name}
                                style={{
                                    width: 'clamp(36px, 8vw, 50px)',
                                    height: 'clamp(36px, 8vw, 50px)',
                                    marginBottom: '0.5rem',
                                    filter: 'brightness(0.95)',
                                }}
                            />
                            <span style={{
                                color: 'var(--text-secondary)',
                                fontWeight: 500,
                                fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
                                textAlign: 'center',
                            }}>
                                {tech.name}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Languages Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                style={{ marginTop: '2rem' }}
            >
                <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: 'clamp(1rem, 2vw, 1.1rem)' }}>
                    🌐 Languages
                </h5>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    justifyContent: 'center',
                }}>
                    {[
                        { lang: 'English', level: 'Fluent (IELTS 8.5)' },
                        { lang: 'Malay', level: 'Native' },
                    ].map((item, idx) => (
                        <span
                            key={idx}
                            style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '16px',
                                padding: '0.35rem 0.85rem',
                                fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            🗣️ {item.lang} <span style={{ color: 'var(--text-muted)' }}>• {item.level}</span>
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

export default TechSection;