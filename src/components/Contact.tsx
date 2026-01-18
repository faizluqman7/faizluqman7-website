import { motion } from 'framer-motion';

const ContactSection = () => (
    <section
        id="contact"
        className="section d-flex flex-column justify-content-center align-items-center text-center py-5"
    >
        <div style={{ width: '90%', maxWidth: '600px', padding: '0 1rem' }}>
            {/* Section Header */}
            <motion.div
                className="mb-4"
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
                    04. What's Next?
                </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    color: 'var(--text-primary)',
                    marginBottom: '1.5rem',
                    fontWeight: 700,
                }}
            >
                Get In Touch
            </motion.h2>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                    lineHeight: 1.7,
                    marginBottom: '2rem',
                }}
            >
                I'm currently looking for new opportunities and my inbox is always open.
                Whether you have a question, want to discuss a project, or just want to say hi —
                I'll try my best to get back to you!
            </motion.p>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <a
                    href="mailto:faizluqman7@gmail.com"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2.5rem',
                        border: '1px solid var(--accent-primary)',
                        borderRadius: '8px',
                        color: 'var(--accent-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(100, 255, 218, 0.1)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(100, 255, 218, 0.2)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Say Hello
                </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
                className="d-flex justify-content-center gap-4 mt-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
            >
                {[
                    {
                        href: 'https://github.com/faizluqman7',
                        title: 'GitHub',
                        icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />,
                    },
                    {
                        href: 'https://linkedin.com/in/faizluqman',
                        title: 'LinkedIn',
                        icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
                    },
                    {
                        href: 'mailto:faizluqman7@gmail.com',
                        title: 'Email',
                        icon: <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />,
                    },
                ].map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        target={link.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        title={link.title}
                        style={{
                            width: '44px',
                            height: '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-secondary)',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                            e.currentTarget.style.color = 'var(--accent-primary)';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            {link.icon}
                        </svg>
                    </a>
                ))}
            </motion.div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                style={{ marginTop: '4rem' }}
            >
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.5rem',
                }}>
                    📍 Based in Edinburgh, Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿
                </p>
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                }}>
                    Designed & Built by Faiz Luqman © 2026
                </p>
            </motion.div>
        </div>
    </section>
);

export default ContactSection;