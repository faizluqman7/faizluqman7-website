import { useRef, useEffect, useState, useCallback } from 'react';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    scramble?: boolean;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const TextReveal = ({
    text,
    className = '',
    delay = 0,
    duration = 1000,
    as: Tag = 'span',
    scramble = true
}: TextRevealProps) => {
    const [displayText, setDisplayText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLElement>(null);
    const animationRef = useRef<number | null>(null);

    const scrambleText = useCallback((progress: number) => {
        const result = text.split('').map((char, index) => {
            if (char === ' ') return ' ';

            const revealPoint = index / text.length;

            if (progress > revealPoint + 0.1) {
                return char;
            } else if (progress > revealPoint - 0.1) {
                // Scrambling phase
                return chars[Math.floor(Math.random() * chars.length)];
            }
            return '';
        });

        return result.join('');
    }, [text]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const startTime = performance.now() + delay;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;

            if (elapsed < 0) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            const progress = Math.min(elapsed / duration, 1);

            if (scramble) {
                setDisplayText(scrambleText(progress));
            } else {
                // Simple reveal from left to right
                const charsToShow = Math.floor(progress * text.length);
                setDisplayText(text.slice(0, charsToShow));
            }

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setDisplayText(text);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isVisible, text, delay, duration, scramble, scrambleText]);

    return (
        <Tag
            ref={elementRef as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
            className={`text-reveal ${className}`}
            style={{
                display: 'inline-block',
                minWidth: `${text.length}ch`,
            }}
        >
            {displayText || '\u00A0'}
        </Tag>
    );
};

export default TextReveal;
