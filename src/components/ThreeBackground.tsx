import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Global mouse position
const mouseState = { x: 0.5, y: 0.5 };

// Skills with their icon URLs (using devicons CDN)
const skills = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'Scala', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
];

interface Node {
    position: THREE.Vector3;
    basePosition: THREE.Vector3;
    skillIndex: number;
    connections: number[];
}

// Single skill icon sprite
function SkillIcon({ iconUrl, position, opacity }: { iconUrl: string; position: [number, number, number]; opacity: number }) {
    const texture = useLoader(THREE.TextureLoader, iconUrl);

    return (
        <sprite position={position} scale={[0.8, 0.8, 0.8]}>
            <spriteMaterial
                map={texture}
                transparent
                opacity={opacity}
                depthTest={false}
            />
        </sprite>
    );
}

// Network Graph with skill icons
function NetworkGraph({ nodeCount = 18 }: { nodeCount?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const [isDark, setIsDark] = useState(false);

    // Check theme
    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    // Generate nodes with connections
    const nodes = useMemo(() => {
        const temp: Node[] = [];
        const connectionDistance = 8;

        for (let i = 0; i < nodeCount; i++) {
            const x = (Math.random() - 0.5) * 30;
            const y = (Math.random() - 0.5) * 25;
            const z = (Math.random() - 0.5) * 10 - 8;

            temp.push({
                position: new THREE.Vector3(x, y, z),
                basePosition: new THREE.Vector3(x, y, z),
                skillIndex: i % skills.length,
                connections: [],
            });
        }

        // Calculate connections (k-nearest neighbors)
        for (let i = 0; i < temp.length; i++) {
            for (let j = i + 1; j < temp.length; j++) {
                const dist = temp[i].basePosition.distanceTo(temp[j].basePosition);
                if (dist < connectionDistance) {
                    temp[i].connections.push(j);
                }
            }
        }

        return temp;
    }, [nodeCount]);

    // Generate line geometry for connections
    const lineGeometry = useMemo(() => {
        const positions: number[] = [];
        nodes.forEach((node) => {
            node.connections.forEach((j) => {
                positions.push(
                    node.position.x, node.position.y, node.position.z,
                    nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
                );
            });
        });
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        return geometry;
    }, [nodes]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const mouseX = (mouseState.x - 0.5) * 15;
        const mouseY = (mouseState.y - 0.5) * -10;

        // Update node positions
        nodes.forEach((node) => {
            // Gentle floating motion
            node.position.x = node.basePosition.x + Math.sin(time * 0.3 + node.basePosition.x) * 0.3;
            node.position.y = node.basePosition.y + Math.cos(time * 0.2 + node.basePosition.y) * 0.3;
            node.position.z = node.basePosition.z + Math.sin(time * 0.15) * 0.1;

            // Subtle mouse influence
            const dx = node.position.x - mouseX;
            const dy = node.position.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 8 && dist > 0.1) {
                const force = (8 - dist) / 8 * 0.3;
                node.position.x += (dx / dist) * force;
                node.position.y += (dy / dist) * force;
            }
        });

        // Update line positions
        if (linesRef.current) {
            const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
            let idx = 0;
            nodes.forEach((node) => {
                node.connections.forEach((j) => {
                    positions[idx++] = node.position.x;
                    positions[idx++] = node.position.y;
                    positions[idx++] = node.position.z;
                    positions[idx++] = nodes[j].position.x;
                    positions[idx++] = nodes[j].position.y;
                    positions[idx++] = nodes[j].position.z;
                });
            });
            linesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Subtle group rotation based on mouse
        if (groupRef.current) {
            groupRef.current.rotation.y = (mouseState.x - 0.5) * 0.1;
            groupRef.current.rotation.x = (mouseState.y - 0.5) * 0.05;
        }
    });

    const lineColor = isDark ? '#FF6B35' : '#FF6B35';
    const iconOpacity = isDark ? 0.80 : 0.50; // Subtle opacity

    return (
        <group ref={groupRef}>
            {/* Connection lines */}
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial color={lineColor} transparent opacity={isDark ? 0.60 : 0.40} linewidth={1} />
            </lineSegments>

            {/* Nodes with skill icons */}
            {nodes.map((node, i) => (
                <group key={i} position={[node.position.x, node.position.y, node.position.z]}>
                    {/* Small node dot */}
                    <mesh>
                        <sphereGeometry args={[0.06, 8, 8]} />
                        <meshBasicMaterial color={lineColor} transparent opacity={isDark ? 0.3 : 0.2} />
                    </mesh>
                    {/* Skill icon */}
                    <SkillIcon
                        iconUrl={skills[node.skillIndex].icon}
                        position={[0, 0, 0.1]}
                        opacity={iconOpacity}
                    />
                </group>
            ))}
        </group>
    );
}

// Subtle floating rings
function FloatingRings() {
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const mouseOffsetX = (mouseState.x - 0.5) * 3;
        const mouseOffsetY = (mouseState.y - 0.5) * -3;

        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = time * 0.06 + mouseOffsetY * 0.08;
            ring1Ref.current.rotation.y = time * 0.08 + mouseOffsetX * 0.08;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = time * -0.04 + mouseOffsetY * 0.06;
            ring2Ref.current.rotation.z = time * 0.06 + mouseOffsetX * 0.06;
        }
    });

    const ringOpacity = isDark ? 0.06 : 0.04;

    return (
        <>
            <mesh ref={ring1Ref} position={[0, 0, -12]}>
                <torusGeometry args={[6, 0.01, 16, 100]} />
                <meshBasicMaterial color="#FF6B35" transparent opacity={ringOpacity} />
            </mesh>
            <mesh ref={ring2Ref} position={[3, 2, -10]}>
                <torusGeometry args={[4, 0.008, 16, 80]} />
                <meshBasicMaterial color="#FF9500" transparent opacity={ringOpacity * 0.8} />
            </mesh>
        </>
    );
}

// Camera controller for parallax
function CameraController() {
    const { camera } = useThree();

    useFrame(() => {
        const targetX = (mouseState.x - 0.5) * 1.2;
        const targetY = (mouseState.y - 0.5) * -0.8;

        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (targetY - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

function Scene() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const bgColor = isDark ? '#0a0c10' : '#FAFAFA';
    const fogColor = isDark ? '#0a0c10' : '#FAFAFA';

    return (
        <>
            <color attach="background" args={[bgColor]} />
            <fog attach="fog" args={[fogColor, 10, 35]} />
            <ambientLight intensity={0.4} />
            <CameraController />
            <NetworkGraph nodeCount={18} />
            <FloatingRings />
        </>
    );
}

const ThreeBackground = () => {
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseState.x = event.clientX / window.innerWidth;
            mouseState.y = event.clientY / window.innerHeight;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
