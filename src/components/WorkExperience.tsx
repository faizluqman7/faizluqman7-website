import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Software Engineering Intern',
    company: 'Pera',
    date: 'Jun 2025 - Aug 2025',
    description: [
      "Engineered the backend for Becca, a Flask-based system connecting Pera's web presence to an AI core via PostgreSQL.",
      'Integrated Supabase and Twilio for 2FA and email auth, reducing onboarding time by 65% for 100+ users.',
      'Collaborated with founders to drive product direction and technical decisions.'
    ],
    icon: '💼',
  },
  {
    title: 'Software Engineering Intern',
    company: 'Keysight Technologies',
    date: 'Jun 2024 - Sep 2024',
    description: [
      'Designed and deployed a scalable approval-based request tracking system for 100+ weekly product service requests.',
      'Engineered a batch data processing pipeline, reducing processing times by over 90%.',
      'Developed a custom SQL Code Generator Tool for non-technical staff to query a 10,000+ record database.'
    ],
    icon: '💼',
  },
  {
    title: 'Started Education at The University of Edinburgh',
    company: 'The University of Edinburgh',
    date: 'Sep 2022',
    description: [
      'BSc (Hons) in Computer Science, expected graduation May 2026.',
      'Relevant courses: Algorithms, Distributed Systems, Software Engineering, Machine Learning, NLP, Computer Systems, Networks, Software Testing.',
      'On track for First-Class Honours.'
    ],
    icon: '🎓',
  },
];

const WorkExperience = () => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(Array(experiences.length).fill(false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section id="work-experience" className="section d-flex flex-column justify-content-center align-items-center text-center py-5">
      <h3 className="mb-4">🕒 Professional Timeline</h3>
      <ul className="timeline">
        {[...experiences].reverse().map((exp, idx) => (
          <motion.li
            className={`timeline-item d-flex sticky-timeline-item`}
            key={experiences.length - 1 - idx}
            ref={el => { itemRefs.current[experiences.length - 1 - idx] = el; }}
            initial={{ opacity: 0, y: 40 }}
            animate={visible[experiences.length - 1 - idx] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: idx * 0.2, ease: 'easeOut' }}
            style={{
              pointerEvents: visible[experiences.length - 1 - idx] ? 'auto' : 'none',
              zIndex: idx + 1,
              top: `calc(64px + ${idx * 80}px)`, // 64px navbar height offset
              width: '100%',
            }}
          >
            <div className="timeline-icon">{exp.icon}</div>
            <div className="timeline-content text-start ms-3">
              <h5 className="mb-1">{exp.title} <span className="text-muted" style={{ fontSize: '0.9em' }}>@ {exp.company}</span></h5>
              <div className="text-primary mb-2" style={{ fontSize: '0.95em' }}>{exp.date}</div>
              <ul className="mb-0">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ul>
      <style>{`
        .timeline {
          list-style: none;
          padding: 0;
          position: relative;
          min-height: 600px;
        }
        .timeline:before {
          content: '';
          position: absolute;
          left: 32px;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #0d6efd22;
          border-radius: 2px;
        }
        .timeline-item {
          position: relative;
          margin-bottom: 2.5rem;
          align-items: flex-start;
          width: 100%;
        }
        .sticky-timeline-item {
          position: sticky;
          /* top is set inline per item */
          background: #f8f9fa;
          box-shadow: 0 4px 16px #0d6efd22;
          border-radius: 8px;
          transition: box-shadow 0.3s;
        }
        .timeline-icon {
          min-width: 48px;
          min-height: 48px;
          width: 48px;
          height: 48px;
          background: #fff;
          border: 3px solid #0d6efd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(1.2rem, 4vw, 1.7rem);
          position: relative;
          z-index: 1;
          box-shadow: 0 2px 8px #0d6efd22;
        }
        .timeline-content {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem 1.5rem;
          box-shadow: 0 2px 8px #0d6efd11;
          min-width: 220px;
          width: 100%;
          max-width: none;
        }
        @media (max-width: 600px) {
          .timeline-content { padding: 0.75rem 1rem; min-width: 0; width: 100%; }
          .timeline:before { left: 24px; }
          .timeline-icon {
            min-width: 36px;
            min-height: 36px;
            width: 36px;
            height: 36px;
            font-size: clamp(1rem, 6vw, 1.3rem);
          }
        }
      `}</style>
    </section>
  );
};

export default WorkExperience;