import { motion } from 'framer-motion';

const ContactSection = () => (
    <section id="contact" className="section d-flex flex-column justify-content-center align-items-center text-center py-5">
        <div style={{ width: '90%', maxWidth: '550px', padding: '0 1rem' }}>
            <motion.h3
                className="mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Let's Connect
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
                    lineHeight: 1.6,
                }}
            >
                I'm always open to discussing new opportunities, interesting projects,
                or just having a chat about tech, football, or life in Edinburgh!
            </motion.p>

            <motion.form
                action="https://formspree.io/f/mgedpvbp"
                method="POST"
                className="row g-3 justify-content-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <div className="col-6">
                    <input
                        type="text"
                        name="firstname"
                        className="form-control"
                        placeholder="First Name"
                        required
                        style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
                    />
                </div>
                <div className="col-6">
                    <input
                        type="text"
                        name="lastname"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
                    />
                </div>
                <div className="col-12">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email Address"
                        required
                        style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
                    />
                </div>
                <div className="col-12">
                    <textarea
                        name="message"
                        rows={4}
                        className="form-control"
                        placeholder="Your Message"
                        style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
                    />
                </div>
                <div className="col-12">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            maxWidth: '180px',
                            padding: '12px 24px',
                            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                        }}
                    >
                        Send Message
                    </button>
                </div>
            </motion.form>

            <motion.div
                className="mt-4 d-flex justify-content-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
            >
                {[
                    {
                        href: 'https://github.com/faizluqman7',
                        title: 'GitHub',
                        icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    },
                    {
                        href: 'https://linkedin.com/in/faizluqman',
                        title: 'LinkedIn',
                        icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    },
                    {
                        href: 'mailto:faizluqman7@gmail.com',
                        title: 'Email',
                        icon: <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                    },
                ].map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        target={link.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        title={link.title}
                        style={{
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
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
                            e.currentTarget.style.borderColor = 'var(--border-subtle)';
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

            {/* Location */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                style={{
                    color: 'var(--text-muted)',
                    marginTop: '2rem',
                    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                }}
            >
                📍 Based in Edinburgh, Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                style={{
                    color: 'var(--text-muted)',
                    marginTop: '1.5rem',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                }}
            >
                © 2025 Faiz Luqman • Built with React & Three.js
            </motion.p>
        </div>
    </section>
);

export default ContactSection;