import { motion } from 'framer-motion';

const AboutSection = () => {
    const skills = {
        'Frontend': ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
        'Backend': ['Java', 'Spring Boot', 'Node.js', 'Python', 'FastAPI', 'Flask'],
        'Mobile': ['Swift', 'SwiftUI', 'Core Data', 'HealthKit'],
        'Data & ML': ['PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'pandas'],
        'Tools': ['Git', 'Docker', 'PostgreSQL', 'GCP', 'GitHub Actions'],
    };

    return (
        <section
            id="about-me"
            className="section d-flex flex-column justify-content-center align-items-center py-5"
            style={{ minHeight: '100vh' }}
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
                        className="section-number"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--accent-primary)',
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                        }}
                    >
                        01.
                    </span>
                    <h3
                        style={{
                            margin: 0,
                            fontFamily: 'var(--font-serif)',
                        }}
                    >
                        About Me
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

                {/* Two Column Layout */}
                <div
                    className="row g-4 g-lg-5 align-items-start"
                >
                    {/* Left Column - Text Content */}
                    <motion.div
                        className="col-12 col-lg-7"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ textAlign: 'left' }}>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                                lineHeight: 1.8,
                                marginBottom: '1.25rem',
                            }}>
                                👨‍💻 I'm a <strong style={{ color: 'var(--text-primary)' }}>Computer Science graduate (BSc Hons, First-Class Honours)</strong> from
                                <strong style={{ color: 'var(--accent-primary)' }}> The University of Edinburgh, United Kingdom</strong> 🇬🇧, originally from <strong style={{ color: 'var(--text-primary)' }}>Kuala Lumpur, Malaysia</strong> 🇲🇾.
                                I'm an incoming <strong style={{ color: 'var(--text-primary)' }}>Technology Developer</strong> at <strong style={{ color: 'var(--accent-primary)' }}>Barclays</strong> in Glasgow, starting August 2026.
                            </p>

                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                                lineHeight: 1.8,
                                marginBottom: '1.25rem',
                            }}>
                                I'm highly interested in <strong style={{ color: 'var(--text-primary)' }}>full-stack software development</strong> including
                                front-end, back-end, and <strong style={{ color: 'var(--text-primary)' }}>mobile development (iOS)</strong>. Through my
                                internships at <strong style={{ color: 'var(--accent-primary)' }}>Pera</strong> (London startup)
                                and <strong style={{ color: 'var(--accent-primary)' }}>Keysight Technologies</strong>,
                                along with various projects and hackathons, I've built a diverse technical skillset.
                            </p>

                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                                lineHeight: 1.8,
                                marginBottom: '1.5rem',
                            }}>
                            </p>

                            {/* Skills Section */}
                            <div style={{ marginTop: '2rem' }}>
                                <h5 style={{
                                    fontFamily: 'var(--font-sans)',
                                    color: 'var(--text-primary)',
                                    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                                    marginBottom: '1rem',
                                    fontWeight: 600,
                                }}>
                                    Technologies I work with:
                                </h5>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {Object.entries(skills).map(([category, items], idx) => (
                                        <motion.div
                                            key={category}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                                            viewport={{ once: true }}
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                            }}
                                        >
                                            <span style={{
                                                fontFamily: 'var(--font-mono)',
                                                color: 'var(--accent-primary)',
                                                fontSize: '0.8rem',
                                                minWidth: '80px',
                                            }}>
                                                {category}:
                                            </span>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                                {items.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        style={{
                                                            background: 'var(--glass-bg)',
                                                            border: '1px solid var(--glass-border)',
                                                            borderRadius: '6px',
                                                            padding: '0.25rem 0.6rem',
                                                            fontSize: '0.8rem',
                                                            color: 'var(--text-secondary)',
                                                            fontFamily: 'var(--font-mono)',
                                                            transition: 'all 0.2s ease',
                                                        }}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Image with Offset */}
                    <motion.div
                        className="col-12 col-lg-5"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                maxWidth: '320px',
                                margin: '0 auto',
                            }}
                        >
                            {/* Accent Block (Behind) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                    width: '100%',
                                    height: '100%',
                                    border: '2px solid var(--accent-primary)',
                                    borderRadius: '12px',
                                    transition: 'all 0.3s ease',
                                    zIndex: 0,
                                }}
                            />

                            {/* Image Container */}
                            <div
                                style={{
                                    position: 'relative',
                                    zIndex: 1,
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    background: 'var(--bg-secondary)',
                                }}
                            >
                                <img
                                    src="/face.jpeg"
                                    alt="Faiz Luqman"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        filter: 'grayscale(20%)',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.filter = 'grayscale(0%)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.filter = 'grayscale(20%)';
                                    }}
                                />
                                {/* Overlay */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'rgba(100, 255, 218, 0.1)',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'rgba(100, 255, 218, 0.1)';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            viewport={{ once: true }}
                            style={{
                                marginTop: '2rem',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '1rem',
                                maxWidth: '320px',
                                margin: '2rem auto 0',
                            }}
                        >
                            {[
                                { icon: '🎓', label: 'Edinburgh', value: 'First-Class Honours' },
                                { icon: '📍', label: 'Location', value: 'Scotland, UK' },
                            ].map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="glass-card"
                                    style={{
                                        padding: '1rem',
                                        textAlign: 'center',
                                    }}
                                >
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{stat.icon}</div>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: 'var(--text-muted)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginBottom: '0.15rem',
                                    }}>
                                        {stat.label}
                                    </div>
                                    <div style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--text-primary)',
                                        fontWeight: 500,
                                    }}>
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Resume Button */}
                <motion.div
                    className="text-center mt-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                >
                    <a
                        href="/WAN FAIZ CV 2026.pdf"
                        className="btn btn-outline-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '12px 24px',
                            fontSize: '0.95rem',
                        }}
                    >
                        <span>📄</span> View My Resume
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;