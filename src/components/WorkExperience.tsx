import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  // FUTURE
  {
    title: 'Technology Developer (Graduate Scheme)',
    company: 'Barclays',
    date: 'Starting Aug 2026',
    year: '2026',
    description: [
      'Incoming Technology Developer on Barclays\' 2-year graduate scheme.',
      'Based in Glasgow, Scotland.',
    ],
    icon: '🦅',
    accentColor: '#00AEEF',
    isFuture: true,
    category: 'work',
    logo: '/barclays.svg',
    link: 'https://home.barclays/',
  },
  {
    title: 'BSc Computer Science Graduation',
    company: 'The University of Edinburgh',
    date: 'July 2026',
    year: '2026',
    description: [
      'Graduated with First-Class Honours in BSc (Hons) Computer Science.',
    ],
    icon: '🎓',
    accentColor: '#64ffda',
    category: 'education',
  },
  // EXTRACURRICULARS & ACTIVITIES
  {
    title: 'Head of Technology',
    company: 'Edinburgh University Trading & Investment Club',
    date: 'Aug 2025 - Present',
    year: '2025',
    description: [
      'Led the technology infrastructure behind the UK\'s largest student-led investment fund (>£94,000 in AUM).',
    ],
    icon: '📊',
    accentColor: '#10b981',
    category: 'extracurricular',
  },
  {
    title: 'Lab Demonstrator',
    company: 'University of Edinburgh',
    date: 'Oct 2025 - Dec 2025',
    year: '2025',
    description: [
      'Demonstrated and supported students in labs for the Informatics Large Practical (ILP) course.',
      'Helped students with their assignments and provided guidance on best practices.',
    ],
    icon: '💻',
    accentColor: '#bd1797',
    category: 'extracurricular',
  },
  {
    title: 'Hackathon Participant',
    company: 'JPMorgan Chase - Code For Good 2025',
    date: 'Oct 2025',
    year: '2025',
    description: [
      'Participated in JPMorgan Chase\'s flagship hackathon in Glasgow, Scotland.',
      'Built technology solutions for non-profit organizations in a team environment.',
    ],
    icon: '🏆',
    accentColor: '#f59e0b',
    category: 'extracurricular',
  },
  // MAIN WORK EXPERIENCE
  {
    title: 'Software Engineering Intern',
    company: 'Pera (Pirum Group Ltd.)',
    date: 'Jun 2025 - Aug 2025',
    year: '2025',
    description: [
      'Developed RESTful microservices in Python (FastAPI), integrating with PostgreSQL and Qdrant for vector-based semantic matching.',
      'Implemented SMS-based 2FA using Twilio API, reducing onboarding from 5 steps to 2.',
      'Built Redis caching layer reducing query latency from ~10s to <100ms.',
      'Integrated GitHub Actions CI/CD for automated testing and GCP deployment.',
    ],
    icon: '🚀',
    accentColor: '#7c3aed',
    category: 'work',
    logo: '/pera.jpg',
    link: 'https://www.itspera.com/',
  },
  {
    title: 'Software Engineering Intern',
    company: 'Keysight Technologies',
    date: 'Jun 2024 - Sep 2024',
    year: '2024',
    description: [
      'Developed a Request Tracking & Approval system within an Agile Scrum team.',
      'Automated email-based workflows for 30+ Knowledge Engineers handling ~5,000 monthly requests.',
      'Reduced resolution time from 5 days to 1 day.',
      'Implemented batch data processing pipelines, reducing upload times from 30 minutes to 30 seconds.',
    ],
    icon: '⚙️',
    accentColor: '#06b6d4',
    category: 'work',
    logo: '/keysight.png',
    link: 'https://www.keysight.com/us/en/home.html',
  },
  {
    title: 'Event Volunteer',
    company: 'HackTheBurgh X',
    date: 'Mar 2024',
    year: '2024',
    description: [
      'Volunteered at Scotland\'s largest student-run hackathon.',
      'Helped organize and support participants throughout the event.',
    ],
    icon: '🤝',
    accentColor: '#f59e0b',
    category: 'extracurricular',
  },
  // EDUCATION
  {
    title: 'Started BSc (Hons) Computer Science',
    company: 'University of Edinburgh',
    date: 'Sep 2022',
    year: '2022',
    description: [
      'Started BSc (Hons) in Computer Science studies at the School of Informatics.',
      'Relevant Courses: Algorithms & Data Structures, Distributed Systems, Machine Learning, NLP.',
      'Recipient of MARA World Top Universities (WTU) Education Sponsorship.',
    ],
    icon: '📚',
    accentColor: '#8b5cf6',
    category: 'education',
  },
  {
    title: 'Cambridge A-Levels',
    company: "Taylor's College, Malaysia",
    date: '2020 - 2021',
    year: '2021',
    description: [
      'Achieved 3A* in Mathematics, Computer Science and Physics.',
      "Received Taylor's Top Achiever's Award and Distinction Award Scholarship.",
    ],
    icon: '🏆',
    accentColor: '#ec4899',
    category: 'education',
  },
];

const WorkExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    if (!container || !horizontal) return;

    const timer = setTimeout(() => {
      // Use functional values for responsiveness
      const getScrollAmount = () => -(horizontal.scrollWidth - window.innerWidth);

      const tween = gsap.to(horizontal, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${horizontal.scrollWidth - window.innerWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Refresh ScrollTrigger to ensure calculations are correct after render
      ScrollTrigger.refresh();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, 500); // Increased timeout slightly to ensure layout is settled

    return () => clearTimeout(timer);
  }, [isMobile]);

  // Mobile layout
  if (isMobile) {
    return (
      <section
        id="work-experience"
        className="section py-5"
        style={{ minHeight: 'auto', scrollBehavior: 'smooth' }}
      >
        <div style={{ width: '90%', maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          {/* Section Header */}
          <motion.div
            className="d-flex align-items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-primary)',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            }}>
              02.
            </span>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)' }}>
              My Journey
            </h3>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'var(--border-subtle)',
              maxWidth: '200px',
            }} />
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{
                  padding: '1rem',
                  borderLeft: `3px solid ${exp.accentColor}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  {(exp as any).logo ? (
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <img
                        src={(exp as any).logo}
                        alt={`${exp.company} logo`}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  ) : (
                    <span style={{ fontSize: '1.25rem' }}>{exp.icon}</span>
                  )}
                  <div style={{ flex: 1 }}>
                    <h5 style={{
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--text-primary)',
                      margin: 0,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}>
                      {exp.title}
                    </h5>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      {/* Company Name & Link */}
                      {(exp as any).link ? (
                        <a
                          href={(exp as any).link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: exp.accentColor,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            lineHeight: 1, // Fix vertical alignment
                          }}
                          onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                          @ {exp.company}
                          <span style={{ fontSize: '0.7em' }}>↗</span>
                        </a>
                      ) : (
                        <p style={{
                          color: exp.accentColor,
                          margin: 0,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          lineHeight: 1,
                        }}>
                          @ {exp.company}
                        </p>
                      )}
                    </div>
                  </div>
                  {exp.isFuture && (
                    <span style={{
                      background: exp.accentColor,
                      color: 'var(--bg-primary)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '6px',
                      fontSize: '0.55rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                    }}>
                      UPCOMING
                    </span>
                  )}
                  {exp.category === 'work' && (
                    <span style={{
                      background: 'rgba(100, 255, 218, 0.15)',
                      color: 'var(--accent-primary)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '6px',
                      fontSize: '0.55rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                    }}>
                      WORK
                    </span>
                  )}
                </div>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  fontSize: '0.7rem',
                  marginBottom: '0.4rem'
                }}>
                  {exp.date}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {exp.description.slice(0, 2).map((desc, i) => (
                    <li key={i} style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      marginBottom: '0.15rem',
                    }}>
                      ▹ {desc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop horizontal scroll layout
  return (
    <section
      id="work-experience"
      ref={containerRef}
      className="section"
      style={{
        height: '100vh',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center',
        }}
      >
        <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
          <span style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-primary)',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
          }}>
            02.
          </span>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            My Journey
          </h3>
        </div>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
          fontFamily: 'var(--font-mono)',
        }}>
          Scroll to explore →
        </p>
      </div>

      {/* Progress Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '8px',
        }}
      >
        {[...new Set(experiences.map(e => e.year))].sort((a, b) => parseInt(b) - parseInt(a)).map((year, idx) => {
          const exp = experiences.find(e => e.year === year)!;
          return (
            <div
              key={idx}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: exp.accentColor,
                boxShadow: `0 0 8px ${exp.accentColor}`,
                opacity: 0.8,
              }}
            />
          );
        })}
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={horizontalRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          paddingTop: '60px',
          willChange: 'transform',
        }}
      >
        {/* Intro Panel */}
        <div
          style={{
            minWidth: '100vw',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: 'clamp(4rem, 15vw, 8rem)', marginBottom: '1rem' }}
            >
              🚀
            </motion.div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
              My professional journey so far
            </p>
          </div>
        </div>

        {/* Experience Cards - Grouped by Year */}
        {(() => {
          const groupedByYear: { [key: string]: typeof experiences } = {};
          experiences.forEach(exp => {
            if (!groupedByYear[exp.year]) groupedByYear[exp.year] = [];
            groupedByYear[exp.year].push(exp);
          });

          const years = Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a));

          return years.map((year) => {
            const yearExperiences = groupedByYear[year];
            const primaryColor = yearExperiences[0].accentColor;
            const isFutureYear = yearExperiences.some(e => e.isFuture);

            return (
              <div
                key={year}
                style={{
                  minWidth: yearExperiences.length > 1 ? '90vw' : '80vw',
                  maxWidth: yearExperiences.length > 1 ? '90vw' : '80vw',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 2vw',
                  flexShrink: 0,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.3 }}
                  style={{
                    display: 'flex',
                    gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '1100px',
                  }}
                >
                  {/* Year */}
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(3rem, 8vw, 6rem)',
                      fontWeight: 900,
                      color: primaryColor,
                      textShadow: `0 0 40px ${primaryColor}30`,
                      lineHeight: 1,
                      minWidth: 'clamp(80px, 12vw, 130px)',
                      textAlign: 'center',
                      opacity: isFutureYear ? 0.7 : 1,
                      flexShrink: 0,
                    }}
                  >
                    {year}
                  </div>

                  {/* Cards Container */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flex: 1,
                    flexWrap: yearExperiences.length > 2 ? 'wrap' : 'nowrap',
                  }}>
                    {yearExperiences.map((exp, expIdx) => (
                      <div
                        key={expIdx}
                        className="glass-card"
                        style={{
                          padding: 'clamp(0.75rem, 1.5vw, 1.25rem)',
                          flex: yearExperiences.length === 1 ? 1 : '1 1 45%',
                          minWidth: yearExperiences.length > 1 ? '280px' : 'auto',
                          borderLeft: `3px solid ${exp.accentColor}`,
                          position: 'relative',
                        }}
                      >
                        {/* Badges */}
                        <div style={{
                          position: 'absolute',
                          top: '0.75rem',
                          right: '0.75rem',
                          display: 'flex',
                          gap: '0.5rem',
                        }}>
                          {exp.isFuture && (
                            <span style={{
                              background: exp.accentColor,
                              color: 'var(--bg-primary)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '6px',
                              fontSize: '0.6rem',
                              fontWeight: 600,
                              fontFamily: 'var(--font-mono)',
                            }}>
                              UPCOMING
                            </span>
                          )}
                          {exp.category === 'work' && (
                            <span style={{
                              background: 'rgba(100, 255, 218, 0.15)',
                              color: 'var(--accent-primary)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '6px',
                              fontSize: '0.6rem',
                              fontWeight: 600,
                              fontFamily: 'var(--font-mono)',
                            }}>
                              WORK
                            </span>
                          )}
                        </div>

                        {/* Icon or Logo */}
                        {(exp as any).logo ? (
                          <div style={{
                            margin: '0 auto 0.5rem auto',
                            width: 'clamp(2.5rem, 4vw, 3.5rem)',
                            height: 'clamp(2.5rem, 4vw, 3.5rem)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            background: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--border-subtle)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                          }}>
                            <img
                              src={(exp as any).logo}
                              alt={`${exp.company} logo`}
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                          </div>
                        ) : (
                          <div style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', marginBottom: '0.4rem' }}>
                            {exp.icon}
                          </div>
                        )}

                        {/* Title */}
                        <h4 style={{
                          fontFamily: 'var(--font-sans)',
                          color: 'var(--text-primary)',
                          fontWeight: 700,
                          fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
                          marginBottom: '0.15rem',
                        }}>
                          {exp.title}
                        </h4>

                        {/* Company */}
                        <div style={{
                          color: exp.accentColor,
                          fontWeight: 600,
                          fontSize: 'clamp(0.75rem, 1.3vw, 0.85rem)',
                          marginBottom: '0.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center', // Center align company name
                          gap: '0.5rem'
                        }}>
                          {/* Company Name & Link */}
                          {(exp as any).link ? (
                            <a
                              href={(exp as any).link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: 'inherit',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                            >
                              @ {exp.company}
                              <span style={{ fontSize: '0.8em', opacity: 0.8 }}>↗</span>
                            </a>
                          ) : (
                            <span style={{ display: 'flex', alignItems: 'center' }}>@ {exp.company}</span>
                          )}
                        </div>

                        {/* Date */}
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-muted)',
                          fontSize: 'clamp(0.65rem, 1.1vw, 0.75rem)',
                          marginBottom: '0.5rem',
                        }}>
                          {exp.date}
                        </div>

                        {/* Description */}
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {exp.description.slice(0, yearExperiences.length > 1 ? 2 : 3).map((desc, i) => (
                            <li
                              key={i}
                              style={{
                                color: 'var(--text-secondary)',
                                marginBottom: '0.3rem',
                                paddingLeft: '0.9rem',
                                position: 'relative',
                                lineHeight: 1.35,
                                fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                              }}
                            >
                              <span style={{
                                position: 'absolute',
                                left: 0,
                                color: exp.accentColor,
                              }}>
                                ▹
                              </span>
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          });
        })()}

        {/* End Panel */}
        <div
          style={{
            minWidth: '50vw',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', color: 'var(--text-secondary)' }}
          >
            <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>🌟</div>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>And the journey continues...</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;