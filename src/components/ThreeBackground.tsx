import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Global mouse position that can be accessed by all components
const mouseState = { x: 0.5, y: 0.5 };

interface ParticleFieldProps {
    count?: number;
}

// Personalized shapes - mix of footballs (icosahedrons), code brackets, and Apple-inspired spheres
function ParticleField({ count = 60 }: ParticleFieldProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate initial positions and velocities
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 25,
                    (Math.random() - 0.5) * 25,
                    (Math.random() - 0.5) * 15 - 5
                ),
                basePosition: new THREE.Vector3(
                    (Math.random() - 0.5) * 25,
                    (Math.random() - 0.5) * 25,
                    (Math.random() - 0.5) * 15 - 5
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.008,
                    (Math.random() - 0.5) * 0.008,
                    (Math.random() - 0.5) * 0.004
                ),
                scale: Math.random() * 0.25 + 0.08,
                rotationSpeed: (Math.random() - 0.5) * 0.015,
                phaseOffset: Math.random() * Math.PI * 2,
            });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // Convert mouse to 3D world coordinates
        const mouseX = (mouseState.x - 0.5) * 20;
        const mouseY = (mouseState.y - 0.5) * -15;

        particles.forEach((particle, i) => {
            // Calculate distance from mouse
            const dx = particle.position.x - mouseX;
            const dy = particle.position.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Repulsion effect - particles move away from cursor
            const repulsionRadius = 6;
            if (dist < repulsionRadius && dist > 0.1) {
                const force = (repulsionRadius - dist) / repulsionRadius;
                const angle = Math.atan2(dy, dx);
                particle.position.x += Math.cos(angle) * force * 0.15;
                particle.position.y += Math.sin(angle) * force * 0.15;
            }

            // Gentle floating motion
            particle.position.x += particle.velocity.x + Math.sin(time * 0.5 + particle.phaseOffset) * 0.003;
            particle.position.y += particle.velocity.y + Math.cos(time * 0.3 + particle.phaseOffset) * 0.003;
            particle.position.z += particle.velocity.z;

            // Slowly drift back toward base position
            particle.position.x += (particle.basePosition.x - particle.position.x) * 0.001;
            particle.position.y += (particle.basePosition.y - particle.position.y) * 0.001;

            // Wrap around boundaries
            if (particle.position.x > 15) particle.position.x = -15;
            if (particle.position.x < -15) particle.position.x = 15;
            if (particle.position.y > 15) particle.position.y = -15;
            if (particle.position.y < -15) particle.position.y = 15;
            if (particle.position.z > 2) particle.position.z = -12;
            if (particle.position.z < -12) particle.position.z = 2;

            // Set transform
            dummy.position.copy(particle.position);
            dummy.rotation.x = time * particle.rotationSpeed;
            dummy.rotation.y = time * particle.rotationSpeed * 0.7;
            dummy.scale.setScalar(particle.scale);
            dummy.updateMatrix();

            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial
                color="#4a9eff"
                transparent
                opacity={0.12}
                wireframe
            />
        </instancedMesh>
    );
}

// Floating code brackets - personalized for CS student
function CodeBrackets() {
    const group1Ref = useRef<THREE.Group>(null);
    const group2Ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const mouseOffsetX = (mouseState.x - 0.5) * 2;
        const mouseOffsetY = (mouseState.y - 0.5) * -2;

        if (group1Ref.current) {
            group1Ref.current.rotation.z = Math.sin(time * 0.2) * 0.1;
            group1Ref.current.position.x = -8 + mouseOffsetX * 0.5;
            group1Ref.current.position.y = 2 + Math.sin(time * 0.3) * 0.5 + mouseOffsetY * 0.3;
        }
        if (group2Ref.current) {
            group2Ref.current.rotation.z = Math.sin(time * 0.25 + 1) * -0.1;
            group2Ref.current.position.x = 8 + mouseOffsetX * 0.5;
            group2Ref.current.position.y = -2 + Math.cos(time * 0.35) * 0.5 + mouseOffsetY * 0.3;
        }
    });

    // Simple bracket using boxes
    const BracketShape = ({ flip = false }: { flip?: boolean }) => (
        <group scale={[flip ? -1 : 1, 1, 1]}>
            <mesh position={[0.25, 1.46, 0]}>
                <boxGeometry args={[0.5, 0.08, 0.08]} />
                <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.08, 3, 0.08]} />
                <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
            </mesh>
            <mesh position={[0.25, -1.46, 0]}>
                <boxGeometry args={[0.5, 0.08, 0.08]} />
                <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
            </mesh>
        </group>
    );

    return (
        <>
            <group ref={group1Ref} position={[-8, 2, -4]}>
                <BracketShape />
            </group>
            <group ref={group2Ref} position={[8, -2, -4]}>
                <BracketShape flip />
            </group>
        </>
    );
}

// Floating rings - representing connectivity and tech
function FloatingRings() {
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const ring3Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const mouseOffsetX = (mouseState.x - 0.5) * 3;
        const mouseOffsetY = (mouseState.y - 0.5) * -3;

        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = time * 0.08 + mouseOffsetY * 0.1;
            ring1Ref.current.rotation.y = time * 0.12 + mouseOffsetX * 0.1;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = time * -0.06 + mouseOffsetY * 0.08;
            ring2Ref.current.rotation.z = time * 0.1 + mouseOffsetX * 0.08;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.y = time * 0.04 + mouseOffsetX * 0.12;
            ring3Ref.current.rotation.z = time * -0.08 + mouseOffsetY * 0.06;
        }
    });

    return (
        <>
            <mesh ref={ring1Ref} position={[0, 0, -10]}>
                <torusGeometry args={[5, 0.015, 16, 100]} />
                <meshBasicMaterial color="#4a9eff" transparent opacity={0.25} />
            </mesh>
            <mesh ref={ring2Ref} position={[3, 2, -8]}>
                <torusGeometry args={[3.5, 0.012, 16, 80]} />
                <meshBasicMaterial color="#7c3aed" transparent opacity={0.2} />
            </mesh>
            <mesh ref={ring3Ref} position={[-3, -2, -9]}>
                <torusGeometry args={[4, 0.01, 16, 60]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.18} />
            </mesh>
        </>
    );
}

// Camera controller for mouse parallax
function CameraController() {
    const { camera } = useThree();

    useFrame(() => {
        // Subtle camera movement based on mouse
        const targetX = (mouseState.x - 0.5) * 1.5;
        const targetY = (mouseState.y - 0.5) * -1;

        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (targetY - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

function Scene() {
    return (
        <>
            <color attach="background" args={['#0a0a0f']} />
            <fog attach="fog" args={['#0a0a0f', 8, 30]} />
            <ambientLight intensity={0.4} />
            <CameraController />
            <ParticleField />
            <FloatingRings />
            <CodeBrackets />
        </>
    );
}

const ThreeBackground = () => {
    // Use window-level event listener for better mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseState.x = e.clientX / window.innerWidth;
            mouseState.y = e.clientY / window.innerHeight;
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
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none', // Allow clicks through to content
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 10], fov: 55 }}
                dpr={[1, 1.5]}
                frameloop="always"
                gl={{
                    antialias: false,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
                style={{ pointerEvents: 'auto' }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
