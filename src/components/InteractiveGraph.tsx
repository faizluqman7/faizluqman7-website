import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useLoader, useThree, extend } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';

extend({ LineSegments2, LineMaterial, LineSegmentsGeometry });
import { motion, AnimatePresence } from 'framer-motion';
import {
    getAllNodes,
    connections,
    getConnectedNodes,
    isTechnologyNode
} from '../data/graphData';
import type { GraphNode } from '../data/graphData';

// Force-directed layout simulation
interface NodePosition {
    id: string;
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
}

// Generate initial positions with force-directed simulation
const generateNodePositions = (nodes: GraphNode[]): Map<string, THREE.Vector3> => {
    const positions: NodePosition[] = nodes.map((node, i) => {
        // Spread nodes in a sphere initially
        const phi = Math.acos(-1 + (2 * i) / nodes.length);
        const theta = Math.sqrt(nodes.length * Math.PI) * phi;
        const radius = 15 + Math.random() * 5;

        return {
            id: node.id,
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: (Math.random() - 0.5) * 10,
            vx: 0,
            vy: 0,
            vz: 0,
        };
    });

    // Run force simulation for a few iterations
    const iterations = 100;
    const repulsionForce = 50;
    const attractionForce = 0.05;
    const damping = 0.9;

    for (let iter = 0; iter < iterations; iter++) {
        // Repulsion between all nodes
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const dx = positions[j].x - positions[i].x;
                const dy = positions[j].y - positions[i].y;
                const dz = positions[j].z - positions[i].z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.1;
                const force = repulsionForce / (dist * dist);

                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;
                const fz = (dz / dist) * force;

                positions[i].vx -= fx;
                positions[i].vy -= fy;
                positions[i].vz -= fz;
                positions[j].vx += fx;
                positions[j].vy += fy;
                positions[j].vz += fz;
            }
        }

        // Attraction along edges
        connections.forEach(conn => {
            const nodeA = positions.find(p => p.id === conn.from);
            const nodeB = positions.find(p => p.id === conn.to);
            if (nodeA && nodeB) {
                const dx = nodeB.x - nodeA.x;
                const dy = nodeB.y - nodeA.y;
                const dz = nodeB.z - nodeA.z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.1;

                const force = dist * attractionForce;
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;
                const fz = (dz / dist) * force;

                nodeA.vx += fx;
                nodeA.vy += fy;
                nodeA.vz += fz;
                nodeB.vx -= fx;
                nodeB.vy -= fy;
                nodeB.vz -= fz;
            }
        });

        // Apply velocities with damping
        positions.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;
            p.vx *= damping;
            p.vy *= damping;
            p.vz *= damping;
        });
    }

    // Convert to Map
    const posMap = new Map<string, THREE.Vector3>();
    positions.forEach(p => {
        posMap.set(p.id, new THREE.Vector3(p.x, p.y, p.z));
    });
    return posMap;
};

// Technology icon sprite
function TechNode({ node, position, isHighlighted, onHover }: {
    node: GraphNode;
    position: THREE.Vector3;
    isHighlighted: boolean;
    onHover: (node: GraphNode | null) => void;
}) {
    const texture = useLoader(THREE.TextureLoader, node.icon || '');
    const meshRef = useRef<THREE.Sprite>(null);
    const [hovered, setHovered] = useState(false);

    const scale = hovered || isHighlighted ? 1.4 : 1.0;
    const opacity = isHighlighted ? 1 : (hovered ? 0.95 : 0.75);

    return (
        <sprite
            ref={meshRef}
            position={position}
            scale={[scale, scale, scale]}
            onPointerOver={() => {
                setHovered(true);
                onHover(node);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                setHovered(false);
                onHover(null);
                document.body.style.cursor = 'default';
            }}
        >
            <spriteMaterial
                map={texture}
                transparent
                opacity={opacity}
                depthTest={false}
            />
        </sprite>
    );
}

// Glowing dot for projects/experiences
function ProjectExperienceNode({ node, position, isHighlighted, onHover, onClick }: {
    node: GraphNode;
    position: THREE.Vector3;
    isHighlighted: boolean;
    onHover: (node: GraphNode | null) => void;
    onClick: (node: GraphNode) => void;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Pulsing animation
    useFrame((state) => {
        if (glowRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 2 + position.x) * 0.3 + 1;
            glowRef.current.scale.setScalar(pulse * (hovered ? 1.5 : 1));
        }
    });

    const baseScale = hovered || isHighlighted ? 0.5 : 0.35;
    const color = new THREE.Color(node.accentColor);

    return (
        <group position={position}>
            {/* Core dot */}
            <mesh
                ref={meshRef}
                onPointerOver={() => {
                    setHovered(true);
                    onHover(node);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    onHover(null);
                    document.body.style.cursor = 'default';
                }}
                onClick={() => onClick(node)}
            >
                <sphereGeometry args={[baseScale, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Glow effect */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[baseScale * 1.8, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={hovered ? 0.4 : 0.2}
                />
            </mesh>

            {/* Outer glow */}
            <mesh>
                <sphereGeometry args={[baseScale * 3, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.05}
                />
            </mesh>
        </group>
    );
}

// Connection lines using Line2 for thick lines
function ConnectionLines({
    positions,
    highlightedConnections
}: {
    positions: Map<string, THREE.Vector3>;
    highlightedConnections: Set<string>;
}) {
    const { size } = useThree();
    const [isDark, setIsDark] = useState(false);
    const baseLineRef = useRef<LineSegments2>(null);
    const highlightLineRef = useRef<LineSegments2>(null);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    // Base line geometry
    const baseGeometry = useMemo(() => {
        const points: number[] = [];
        connections.forEach(conn => {
            const posA = positions.get(conn.from);
            const posB = positions.get(conn.to);
            if (posA && posB) {
                points.push(posA.x, posA.y, posA.z);
                points.push(posB.x, posB.y, posB.z);
            }
        });
        const geometry = new LineSegmentsGeometry();
        geometry.setPositions(points);
        return geometry;
    }, [positions]);

    // Highlighted line geometry
    const highlightGeometry = useMemo(() => {
        const points: number[] = [];
        connections.forEach(conn => {
            const connectionKey = `${conn.from}-${conn.to}`;
            if (highlightedConnections.has(connectionKey) || highlightedConnections.has(`${conn.to}-${conn.from}`)) {
                const posA = positions.get(conn.from);
                const posB = positions.get(conn.to);
                if (posA && posB) {
                    points.push(posA.x, posA.y, posA.z);
                    points.push(posB.x, posB.y, posB.z);
                }
            }
        });
        const geometry = new LineSegmentsGeometry();
        geometry.setPositions(points);
        return geometry;
    }, [positions, highlightedConnections]);

    // Base material
    const baseMaterial = useMemo(() => {
        return new LineMaterial({
            color: 0xFF6B35,
            linewidth: 2,
            transparent: true,
            opacity: isDark ? 0.45 : 0.25,
            resolution: new THREE.Vector2(size.width, size.height),
        });
    }, [isDark, size]);

    // Highlight material
    const highlightMaterial = useMemo(() => {
        return new LineMaterial({
            color: 0x64ffda,
            linewidth: 3,
            transparent: true,
            opacity: 0.9,
            resolution: new THREE.Vector2(size.width, size.height),
        });
    }, [size]);

    // Update resolution on resize
    useEffect(() => {
        if (baseMaterial) baseMaterial.resolution.set(size.width, size.height);
        if (highlightMaterial) highlightMaterial.resolution.set(size.width, size.height);
    }, [size, baseMaterial, highlightMaterial]);

    return (
        <>
            <primitive object={new LineSegments2(baseGeometry, baseMaterial)} />
            {highlightedConnections.size > 0 && (
                <primitive object={new LineSegments2(highlightGeometry, highlightMaterial)} />
            )}
        </>
    );
}

// Node popup component
function NodePopup({ node, position }: { node: GraphNode; position: THREE.Vector3 }) {
    return (
        <Html
            position={[position.x, position.y + 1.5, position.z]}
            center
            style={{ pointerEvents: 'none' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                    background: 'var(--bg-secondary, rgba(20, 20, 30, 0.95))',
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${node.accentColor}`,
                    borderRadius: '12px',
                    padding: '12px 16px',
                    minWidth: '200px',
                    maxWidth: '280px',
                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px ${node.accentColor}40`,
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                }}>
                    <span style={{
                        fontSize: '1.2rem',
                        color: node.accentColor
                    }}>
                        {node.type === 'project' ? '📦' : node.type === 'experience' ? '💼' : '🔧'}
                    </span>
                    <h4 style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'var(--text-primary, #fff)',
                    }}>
                        {node.shortName || node.name}
                    </h4>
                </div>

                {node.company && (
                    <p style={{
                        margin: '0 0 6px 0',
                        fontSize: '0.75rem',
                        color: node.accentColor,
                        fontWeight: 500,
                    }}>
                        @ {node.company}
                    </p>
                )}

                {node.description && (
                    <p style={{
                        margin: '0 0 8px 0',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary, #aaa)',
                        lineHeight: 1.4,
                    }}>
                        {node.description}
                    </p>
                )}

                {node.date && (
                    <span style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-muted, #666)',
                        fontFamily: 'monospace',
                    }}>
                        {node.date}
                    </span>
                )}
            </motion.div>
        </Html>
    );
}
// WASD First-Person Controls for 3D mode
function WASDControls() {
    const { camera } = useThree();
    const keys = useRef({ w: false, a: false, s: false, d: false, shift: false });
    const velocity = useRef(new THREE.Vector3());

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key === 'w') keys.current.w = true;
            if (key === 'a') keys.current.a = true;
            if (key === 's') keys.current.s = true;
            if (key === 'd') keys.current.d = true;
            if (key === 'shift') keys.current.shift = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key === 'w') keys.current.w = false;
            if (key === 'a') keys.current.a = false;
            if (key === 's') keys.current.s = false;
            if (key === 'd') keys.current.d = false;
            if (key === 'shift') keys.current.shift = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame(() => {
        const speed = keys.current.shift ? 0.8 : 0.3;
        const direction = new THREE.Vector3();

        // Get forward/right vectors from camera
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.y = 0; // Keep movement horizontal
        forward.normalize();

        const right = new THREE.Vector3();
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0));

        // Calculate movement
        if (keys.current.w) direction.add(forward);
        if (keys.current.s) direction.sub(forward);
        if (keys.current.d) direction.add(right);
        if (keys.current.a) direction.sub(right);

        if (direction.length() > 0) {
            direction.normalize();
            velocity.current.lerp(direction.multiplyScalar(speed), 0.1);
            camera.position.add(velocity.current);
        } else {
            velocity.current.lerp(new THREE.Vector3(), 0.1);
        }
    });

    return null;
}

// Camera Controller to reset position when switching modes
function CameraController({ viewMode }: { viewMode: '2d' | '3d' }) {
    const { camera } = useThree();
    const prevMode = useRef(viewMode);

    useEffect(() => {
        if (viewMode === '2d' && prevMode.current !== '2d') {
            // Reset camera for 2D top-down view
            camera.position.set(0, 0, 50);
            camera.up.set(0, 1, 0);
            camera.lookAt(0, 0, 0);
            // Reset quaternion to ensure flat orientation
            camera.quaternion.set(0, 0, 0, 1);
            camera.updateProjectionMatrix();
        }
        prevMode.current = viewMode;
    }, [viewMode, camera]);

    return null;
}

// Main scene component
function GraphScene({ viewMode }: { viewMode: '2d' | '3d' }) {
    const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [isDark, setIsDark] = useState(false);

    const allNodes = useMemo(() => getAllNodes(), []);
    const positions3D = useMemo(() => generateNodePositions(allNodes), [allNodes]);

    // For 2D mode, flatten Z positions
    const positions = useMemo(() => {
        if (viewMode === '2d') {
            const flat = new Map<string, THREE.Vector3>();
            positions3D.forEach((pos, id) => {
                flat.set(id, new THREE.Vector3(pos.x, pos.y, 0));
            });
            return flat;
        }
        return positions3D;
    }, [viewMode, positions3D]);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    // Calculate highlighted connections when a node is hovered
    const highlightedConnections = useMemo(() => {
        const highlighted = new Set<string>();
        const activeNode = hoveredNode || selectedNode;

        if (activeNode) {
            connections.forEach(conn => {
                if (conn.from === activeNode.id || conn.to === activeNode.id) {
                    highlighted.add(`${conn.from}-${conn.to}`);
                }
            });
        }

        return highlighted;
    }, [hoveredNode, selectedNode]);

    // Get highlighted node IDs
    const highlightedNodeIds = useMemo(() => {
        const ids = new Set<string>();
        const activeNode = hoveredNode || selectedNode;

        if (activeNode) {
            ids.add(activeNode.id);
            getConnectedNodes(activeNode.id).forEach(id => ids.add(id));
        }

        return ids;
    }, [hoveredNode, selectedNode]);

    const handleNodeHover = useCallback((node: GraphNode | null) => {
        setHoveredNode(node);
    }, []);

    const handleNodeClick = useCallback((node: GraphNode) => {
        setSelectedNode(prev => prev?.id === node.id ? null : node);
    }, []);

    const bgColor = isDark ? '#0a0c10' : '#FAFAFA';

    return (
        <>
            <color attach="background" args={[bgColor]} />
            <ambientLight intensity={0.5} />

            {/* Controls based on view mode */}
            {viewMode === '2d' ? (
                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={15}
                    maxDistance={100}
                    enableRotate={false}
                    enablePan={true}
                    panSpeed={1.2}
                    zoomSpeed={0.8}
                    mouseButtons={{
                        LEFT: THREE.MOUSE.PAN,
                        MIDDLE: THREE.MOUSE.DOLLY,
                        RIGHT: THREE.MOUSE.PAN,
                    }}
                    touches={{
                        ONE: THREE.TOUCH.PAN,
                        TWO: THREE.TOUCH.DOLLY_PAN,
                    }}
                />
            ) : (
                <>
                    <OrbitControls
                        enableDamping
                        dampingFactor={0.05}
                        minDistance={5}
                        maxDistance={80}
                        enablePan={true}
                        panSpeed={0.8}
                        rotateSpeed={0.5}
                        zoomSpeed={0.8}
                        touches={{
                            ONE: THREE.TOUCH.ROTATE,
                            TWO: THREE.TOUCH.DOLLY_PAN,
                        }}
                    />
                    <WASDControls />
                </>
            )}

            {/* Camera controller for mode switching */}
            <CameraController viewMode={viewMode} />

            {/* Connection lines */}
            <ConnectionLines
                positions={positions}
                highlightedConnections={highlightedConnections}
            />

            {/* Render all nodes */}
            {allNodes.map(node => {
                const position = positions.get(node.id);
                if (!position) return null;

                const isHighlighted = highlightedNodeIds.has(node.id);

                if (isTechnologyNode(node)) {
                    return (
                        <TechNode
                            key={node.id}
                            node={node}
                            position={position}
                            isHighlighted={isHighlighted}
                            onHover={handleNodeHover}
                        />
                    );
                } else {
                    return (
                        <ProjectExperienceNode
                            key={node.id}
                            node={node}
                            position={position}
                            isHighlighted={isHighlighted}
                            onHover={handleNodeHover}
                            onClick={handleNodeClick}
                        />
                    );
                }
            })}

            {/* Popup for hovered/selected node */}
            <AnimatePresence>
                {(hoveredNode || selectedNode) && !isTechnologyNode(hoveredNode || selectedNode!) && (
                    <NodePopup
                        node={(hoveredNode || selectedNode)!}
                        position={positions.get((hoveredNode || selectedNode)!.id)!}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

// Main Interactive Graph component
interface InteractiveGraphProps {
    isOpen: boolean;
    onClose: () => void;
}

const InteractiveGraph = ({ isOpen, onClose }: InteractiveGraphProps) => {
    const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d');

    useEffect(() => {
        if (isOpen) {
            // Prevent body scroll when graph is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="interactive-graph-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 1100,
                    }}
                >
                    {/* Canvas */}
                    <Canvas
                        camera={{ position: [0, 0, 40], fov: 60 }}
                        gl={{ antialias: true, alpha: true }}
                        dpr={[1, 2]}
                    >
                        <GraphScene viewMode={viewMode} />
                    </Canvas>

                    {/* Header: Title + Toggle + Close */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: '24px',
                            left: '24px',
                            right: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Title */}
                        <div style={{
                            background: 'var(--bg-secondary, rgba(20, 20, 30, 0.9))',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            color: 'var(--text-primary, #fff)',
                            letterSpacing: '0.1em',
                        }}>
                            SKILLS GRAPH
                        </div>

                        {/* Toggle + Close */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {/* 2D/3D Toggle */}
                            <div style={{
                                display: 'flex',
                                gap: '4px',
                                background: 'var(--bg-secondary, rgba(20, 20, 30, 0.9))',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                                borderRadius: '8px',
                                padding: '4px',
                            }}>
                                <button
                                    onClick={() => setViewMode('2d')}
                                    style={{
                                        padding: '8px 16px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        fontFamily: 'var(--font-mono, monospace)',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        background: viewMode === '2d'
                                            ? 'var(--accent-primary, #64ffda)'
                                            : 'transparent',
                                        color: viewMode === '2d'
                                            ? 'var(--bg-primary, #0a0c10)'
                                            : 'var(--text-secondary, #aaa)',
                                    }}
                                >
                                    2D
                                </button>
                                <button
                                    onClick={() => setViewMode('3d')}
                                    style={{
                                        padding: '8px 16px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        fontFamily: 'var(--font-mono, monospace)',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        background: viewMode === '3d'
                                            ? 'var(--accent-primary, #64ffda)'
                                            : 'transparent',
                                        color: viewMode === '3d'
                                            ? 'var(--bg-primary, #0a0c10)'
                                            : 'var(--text-secondary, #aaa)',
                                    }}
                                >
                                    3D
                                </button>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--bg-secondary, rgba(20, 20, 30, 0.9))',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                                    color: 'var(--text-primary, #fff)',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent-primary, #64ffda)';
                                    e.currentTarget.style.color = 'var(--accent-primary, #64ffda)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-subtle, rgba(255, 255, 255, 0.1))';
                                    e.currentTarget.style.color = 'var(--text-primary, #fff)';
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    </motion.div>


                    {/* Instructions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            position: 'absolute',
                            bottom: '24px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'var(--bg-secondary, rgba(20, 20, 30, 0.9))',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                            borderRadius: '12px',
                            padding: '12px 20px',
                            display: 'flex',
                            gap: '24px',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted, #888)',
                            fontFamily: 'var(--font-mono, monospace)',
                        }}
                    >
                        {viewMode === '2d' ? (
                            <>
                                <span>🖱️ Drag to pan</span>
                                <span>📜 Scroll to zoom</span>
                                <span>👆 Hover nodes for details</span>
                                <span>⎋ ESC to close</span>
                            </>
                        ) : (
                            <>
                                <span>🖱️ Drag to rotate</span>
                                <span>⌨️ WASD to move</span>
                                <span>📜 Scroll to zoom</span>
                                <span>👆 Hover nodes</span>
                                <span>⎋ ESC to close</span>
                            </>
                        )}
                    </motion.div>

                    {/* Legend */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.4 }}
                        style={{
                            position: 'absolute',
                            bottom: '24px',
                            left: '24px',
                            background: 'var(--bg-secondary, rgba(20, 20, 30, 0.9))',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                            borderRadius: '12px',
                            padding: '16px',
                            fontSize: '0.75rem',
                        }}
                    >
                        <div style={{
                            marginBottom: '8px',
                            color: 'var(--text-muted, #888)',
                            fontWeight: 600,
                            fontFamily: 'var(--font-mono, monospace)',
                        }}>
                            LEGEND
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '4px',
                                    background: 'linear-gradient(135deg, #61DAFB, #3178C6)',
                                }} />
                                <span style={{ color: 'var(--text-secondary, #aaa)' }}>Technology</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    background: '#64ffda',
                                    boxShadow: '0 0 8px #64ffda',
                                }} />
                                <span style={{ color: 'var(--text-secondary, #aaa)' }}>Project</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    background: '#7c3aed',
                                    boxShadow: '0 0 8px #7c3aed',
                                }} />
                                <span style={{ color: 'var(--text-secondary, #aaa)' }}>Experience</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
};

export default InteractiveGraph;
