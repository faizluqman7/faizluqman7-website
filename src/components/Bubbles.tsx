import { useEffect, useRef } from "react";

interface Bubble {
    x: number;
    y: number;
    radius: number;
    speed: number;
    opacity: number;
}

const BubbleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bubblesRef = useRef<Bubble[]>([]);
    const mouse = useRef({ x: -1000, y: -1000 }); // start off-screenn

    const createBubble = (canvas: HTMLCanvasElement): Bubble => ({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * canvas.height,
        radius: Math.random() * 8 + 4,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.2,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize bubbles
        const bubbles: Bubble[] = [];
        for (let i = 0; i < 50; i++) {
            bubbles.push(createBubble(canvas));
        }
        bubblesRef.current = bubbles;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < bubblesRef.current.length; i++) {
                const b = bubblesRef.current[i];

                // Repel from mouse
                const dx = b.x - mouse.current.x;
                const dy = b.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repulsionRadius = 60;

                if (dist < repulsionRadius) {
                    const angle = Math.atan2(dy, dx);
                    const repelStrength = (repulsionRadius - dist) / repulsionRadius;
                    b.x += Math.cos(angle) * repelStrength * 2;
                    b.y += Math.sin(angle) * repelStrength * 2;
                }

                // Draw bubble
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(173, 216, 230, ${b.opacity})`; // light blue
                ctx.fill();

                b.y -= b.speed;

                // Reset if off-screen
                if (b.y < -b.radius) {
                    bubblesRef.current[i] = createBubble(canvas);
                }
            }

            requestAnimationFrame(draw);
        };
        draw();

        // Mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        // Bubble popping
        const handleClick = (e: MouseEvent) => {
            const canvasX = e.clientX;
            const canvasY = e.clientY;

            bubblesRef.current = bubblesRef.current.filter(bubble => {
                const dx = bubble.x - canvasX;
                const dy = bubble.y - canvasY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                return distance > bubble.radius;
            });

            // Optional: spawn new bubbles to keep count constant
            while (bubblesRef.current.length < 50) {
                bubblesRef.current.push(createBubble(canvas));
            }
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 0,
                pointerEvents: "auto", // lets you click through unless we need interactions
            }}
        />
    );
};

export default BubbleBackground;