import { motion } from 'framer-motion';

const AboutSection = () => (
    <section id="about-me" className="section d-flex flex-column justify-content-center align-items-center text-center py-5">
        <div style={{ width: '90%', maxWidth: '1100px', padding: '0 1rem' }}>
            <motion.h3
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                About Me
            </motion.h3>

            <motion.div
                className="imgcontainer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <img src="/face.jpeg" width="180" height="180" className="imgcenter img-circular" alt="Faiz Luqman" />
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                    color: 'var(--text-secondary)',
                    maxWidth: '700px',
                    margin: '0 auto 2rem',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    lineHeight: 1.8,
                }}
            >
                I'm a <strong style={{ color: 'var(--accent-primary)' }}>final year Computer Science student</strong> at
                The University of Edinburgh, originally from <strong style={{ color: 'var(--accent-primary)' }}>Kuala Lumpur, Malaysia</strong>.
                I'm passionate about building software that makes a difference, with a particular interest in
                <strong style={{ color: 'var(--accent-primary)' }}> iOS development</strong>, <strong style={{ color: 'var(--accent-primary)' }}>AI/ML</strong>, and
                <strong style={{ color: 'var(--accent-primary)' }}> full-stack web applications</strong>.
            </motion.p>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 g-lg-4">
                {[
                    {
                        icon: '🎓',
                        title: 'Education',
                        content: 'BSc Computer Science at The University of Edinburgh (2022-2026). Final year student, on track for First-Class Honours.',
                        delay: 0.1,
                    },
                    {
                        icon: '💼',
                        title: 'Experience',
                        content: 'Previously interned at Pera (London startup) and Keysight Technologies. Passionate about building impactful software.',
                        delay: 0.2,
                    },
                    {
                        icon: '📱',
                        title: 'Career Goals',
                        content: 'Passionate full-stack developer (interest in mobile development). Currently building iOS apps such as HealthMY using Swift. Love the Apple ecosystem and design philosophy.',
                        delay: 0.3,
                    },
                    {
                        icon: '⚽',
                        title: 'Extracurricular',
                        content: 'I play football in my spare time! (Specifically the GK position). Also enjoy exploring Edinburgh, travelling, and keeping up with tech news.',
                        delay: 0.4,
                    },
                ].map((item, idx) => (
                    <motion.div
                        className="col"
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: item.delay }}
                        viewport={{ once: true }}
                    >
                        <div
                            className="card h-100"
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)',
                                padding: 'clamp(1rem, 2vw, 1.5rem)',
                            }}
                        >
                            <div className="card-body p-0">
                                <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '0.75rem' }}>{item.icon}</div>
                                <h5
                                    className="card-title"
                                    style={{
                                        color: 'var(--text-primary)',
                                        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    {item.title}
                                </h5>
                                <p
                                    className="card-text mb-0"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Awards Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                style={{ marginTop: '2rem' }}
            >
                <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: 'clamp(1rem, 2vw, 1.1rem)' }}>
                    🏆 Awards & Recognition
                </h5>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    justifyContent: 'center',
                }}>
                    {[
                        'Scholarship Holder (MARA WTU)',
                        "A-Levels Top Achiever (3A*)",
                        'Code For Good 2025 Participant',
                    ].map((award, idx) => (
                        <span
                            key={idx}
                            style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '20px',
                                padding: '0.4rem 1rem',
                                fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            {award}
                        </span>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
            >
                <a
                    href="/2025%20RESUME%20WAN%20FAIZ%20LUQMAN.pdf"
                    className="btn btn-outline-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '10px 20px',
                        fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
                    }}
                >
                    <span>📄</span> View My Resume
                </a>
            </motion.div>
        </div>
    </section>
);

export default AboutSection;