import { motion } from 'framer-motion';

const technologies = [
    // Languages
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Languages" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Languages" },
    { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", category: "Languages" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Languages" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Languages" },
    { name: "Scala", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg", category: "Languages" },

    // Frameworks
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frameworks" },
    { name: "SwiftUI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", category: "Frameworks" },
    { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", category: "Frameworks" },
    { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", category: "Frameworks" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Frameworks" },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Frameworks" },

    // AI/ML
    { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "AI/ML" },
    { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", category: "AI/ML" },
    { name: "OpenCV", logo: "https://upload.wikimedia.org/wikipedia/commons/3/32/OpenCV_Logo_with_text_svg_version.svg", category: "AI/ML" },

    // Tools
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "Tools" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tools" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Tools" },
    { name: "GCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", category: "Tools" },
];

const TechSection = () => (
    <section
        id="tech"
        className="section d-flex flex-column justify-content-center align-items-center py-5"
    >
        <div style={{ width: '90%', maxWidth: '1000px', padding: '0 1rem' }}>
            {/* Section Header */}
            <motion.div
                className="d-flex align-items-center justify-content-center gap-3 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)' }}>
                    Technologies & Skills
                </h3>
            </motion.div>

            <motion.p
                className="text-center mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    maxWidth: '600px',
                    margin: '0 auto 2rem',
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
                            className="glass-card"
                            style={{
                                padding: 'clamp(0.75rem, 2vw, 1.25rem)',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'default',
                            }}
                        >
                            <img
                                src={tech.logo}
                                alt={tech.name}
                                style={{
                                    width: 'clamp(36px, 8vw, 48px)',
                                    height: 'clamp(36px, 8vw, 48px)',
                                    marginBottom: '0.5rem',
                                    filter: 'brightness(0.95)',
                                    transition: 'all 0.3s ease',
                                }}
                            />
                            <span style={{
                                color: 'var(--text-secondary)',
                                fontWeight: 500,
                                fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
                                textAlign: 'center',
                                fontFamily: 'var(--font-sans)',
                            }}>
                                {tech.name}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Spoken Languages */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                style={{ marginTop: '2.5rem', textAlign: 'center' }}
            >
                <h5 style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                    fontWeight: 600,
                }}>
                    🌐 Spoken Languages
                </h5>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    justifyContent: 'center',
                }}>
                    {[
                        { lang: 'English', level: 'Fluent (IELTS 8.5)' },
                        { lang: 'Malay', level: 'Native' },
                    ].map((item, idx) => (
                        <span
                            key={idx}
                            className="glass-card"
                            style={{
                                padding: '0.5rem 1rem',
                                fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            🗣️ {item.lang}
                            <span style={{ color: 'var(--text-muted)' }}>• {item.level}</span>
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

export default TechSection;