// Graph Data - Maps technologies to projects and experiences
// This creates the network visualization data for the interactive graph

export interface GraphNode {
    id: string;
    type: 'technology' | 'project' | 'experience';
    name: string;
    shortName?: string;        // Short display name
    icon?: string;             // For technologies (devicons URL)
    description?: string;      // Brief overview for popup
    accentColor: string;       // For glowing effect / theming
    link?: string;             // External link
    date?: string;             // Date range
    company?: string;          // For experiences
}

export interface GraphConnection {
    from: string;  // Node ID
    to: string;    // Node ID
}

// Technology nodes with their icons
export const technologyNodes: GraphNode[] = [
    { id: 'tech-react', type: 'technology', name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', accentColor: '#61DAFB' },
    { id: 'tech-python', type: 'technology', name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', accentColor: '#3776AB' },
    { id: 'tech-swift', type: 'technology', name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', accentColor: '#FA7343' },
    { id: 'tech-java', type: 'technology', name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', accentColor: '#007396' },
    { id: 'tech-typescript', type: 'technology', name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', accentColor: '#3178C6' },
    { id: 'tech-nodejs', type: 'technology', name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', accentColor: '#339933' },
    { id: 'tech-fastapi', type: 'technology', name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', accentColor: '#009688' },
    { id: 'tech-spring', type: 'technology', name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', accentColor: '#6DB33F' },
    { id: 'tech-docker', type: 'technology', name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', accentColor: '#2496ED' },
    { id: 'tech-postgresql', type: 'technology', name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', accentColor: '#336791' },
    { id: 'tech-git', type: 'technology', name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', accentColor: '#F05032' },
    { id: 'tech-tensorflow', type: 'technology', name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', accentColor: '#FF6F00' },
    { id: 'tech-scala', type: 'technology', name: 'Scala', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg', accentColor: '#DC322F' },
    { id: 'tech-linux', type: 'technology', name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', accentColor: '#FCC624' },
    { id: 'tech-aws', type: 'technology', name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', accentColor: '#FF9900' },
    { id: 'tech-redis', type: 'technology', name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', accentColor: '#DC382D' },
    { id: 'tech-graphql', type: 'technology', name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', accentColor: '#E10098' },
    { id: 'tech-firebase', type: 'technology', name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', accentColor: '#FFCA28' },
    // Additional technologies for projects/experiences
    { id: 'tech-langchain', type: 'technology', name: 'LangChain', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', accentColor: '#00A67E' },
    { id: 'tech-qdrant', type: 'technology', name: 'Qdrant', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', accentColor: '#FF6B6B' },
    { id: 'tech-grpc', type: 'technology', name: 'gRPC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', accentColor: '#244C5A' },
    { id: 'tech-spark', type: 'technology', name: 'Apache Spark', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg', accentColor: '#E25A1C' },
    { id: 'tech-swiftui', type: 'technology', name: 'SwiftUI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', accentColor: '#0071E3' },
    { id: 'tech-flask', type: 'technology', name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', accentColor: '#000000' },
    { id: 'tech-opencv', type: 'technology', name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', accentColor: '#5C3EE8' },
    { id: 'tech-gcp', type: 'technology', name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', accentColor: '#4285F4' },
    { id: 'tech-twilio', type: 'technology', name: 'Twilio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', accentColor: '#F22F46' },
];

// Project nodes
export const projectNodes: GraphNode[] = [
    {
        id: 'proj-courseworkbuddy',
        type: 'project',
        name: 'AI Coursework Planner',
        shortName: 'CourseworkBuddy',
        description: 'Study platform with multimodal RAG using Gemini 2.0 + LangChain',
        accentColor: '#64ffda',
        link: 'https://courseworkbuddy.faizluqman.com',
        date: '2026',
    },
    {
        id: 'proj-distributed-compute',
        type: 'project',
        name: 'Distributed Compute Cluster',
        shortName: 'Compute Engine',
        description: 'Distributed compute engine processing 3.5M+ primes/sec with gRPC',
        accentColor: '#7c3aed',
        date: '2025',
    },
    {
        id: 'proj-sparse-matrix',
        type: 'project',
        name: 'Sparse Matrix Engine',
        shortName: 'Tensor Engine',
        description: 'Distributed sparse matrix engine with 28-36x speedup using CSF compression',
        accentColor: '#f59e0b',
        date: '2025',
    },
    {
        id: 'proj-healthmy',
        type: 'project',
        name: 'HealthMY iOS App',
        shortName: 'HealthMY',
        description: 'iOS app for tracking health metrics with SwiftUI and HealthKit',
        accentColor: '#ec4899',
        link: 'https://github.com/faizluqman7/HealthMY',
        date: '2021-Present',
    },
    {
        id: 'proj-cardgpt',
        type: 'project',
        name: 'CardGPT',
        shortName: 'CardGPT',
        description: 'AI-powered card generator using Gemini API',
        accentColor: '#06b6d4',
        link: 'https://cardgpt.faizluqman.com',
        date: '2025',
    },
    {
        id: 'proj-pizzadronz',
        type: 'project',
        name: 'PizzaDronz Delivery',
        shortName: 'PizzaDronz',
        description: 'REST API with A* pathfinding for drone delivery within 2km²',
        accentColor: '#10b981',
        date: '2024-2025',
    },
    {
        id: 'proj-nasa-satellite',
        type: 'project',
        name: 'NASA Satellite Observer',
        shortName: 'Satellite Observer',
        description: 'Landsat satellite overpass notifications with Google Maps',
        accentColor: '#3b82f6',
        link: 'https://github.com/faizluqman7/Hackathon-NASA-Landsat',
        date: '2024',
    },
    {
        id: 'proj-handgesture',
        type: 'project',
        name: 'Hand Gesture Controller',
        shortName: 'Gesture Mouse',
        description: 'Accessibility tool with 96% accuracy for gesture-based mouse control',
        accentColor: '#8b5cf6',
        link: 'https://github.com/faizluqman7/HandTrackingMouse',
        date: '2024',
    },
];

// Experience nodes (inferred technologies from descriptions)
export const experienceNodes: GraphNode[] = [
    {
        id: 'exp-pera',
        type: 'experience',
        name: 'Software Engineer Intern',
        shortName: 'Pera Intern',
        company: 'Pera (Pirum Group)',
        description: 'Built microservices with FastAPI, PostgreSQL, Qdrant, Redis, and Twilio',
        accentColor: '#7c3aed',
        link: 'https://www.itspera.com/',
        date: 'Jun-Aug 2025',
    },
    {
        id: 'exp-keysight',
        type: 'experience',
        name: 'Software Engineer Intern',
        shortName: 'Keysight Intern',
        company: 'Keysight Technologies',
        description: 'Developed request tracking system with automated workflows',
        accentColor: '#06b6d4',
        link: 'https://www.keysight.com/',
        date: 'Jun-Sep 2024',
    },
    {
        id: 'exp-eutic',
        type: 'experience',
        name: 'Head of Technology',
        shortName: 'EUTIC Tech Lead',
        company: 'Edinburgh University Trading Club',
        description: 'Led technology for UK\'s largest student-led investment fund (>£94k AUM)',
        accentColor: '#10b981',
        date: 'Aug 2025-Present',
    },
    {
        id: 'exp-lab-demo',
        type: 'experience',
        name: 'Lab Demonstrator',
        shortName: 'Lab Demonstrator',
        company: 'University of Edinburgh',
        description: 'Supported students in Informatics Large Practical (ILP) course',
        accentColor: '#bd1797',
        date: 'Oct-Dec 2025',
    },
    {
        id: 'exp-jpmorgan',
        type: 'experience',
        name: 'Hackathon Participant',
        shortName: 'JPM Code For Good',
        company: 'JPMorgan Chase',
        description: 'Built tech solutions for non-profits at Code For Good Glasgow',
        accentColor: '#f59e0b',
        date: 'Oct 2025',
    },
    {
        id: 'exp-hacktheburgh',
        type: 'experience',
        name: 'Event Volunteer',
        shortName: 'HackTheBurgh',
        company: 'HackTheBurgh X',
        description: 'Volunteered at Scotland\'s largest student-run hackathon',
        accentColor: '#f59e0b',
        date: 'Mar 2024',
    },
];

// Define connections between nodes
// Format: technology -> projects/experiences that use it
const connectionMap: Record<string, string[]> = {
    // React connections (including EUTIC and JPMorgan)
    'tech-react': ['proj-courseworkbuddy', 'proj-cardgpt', 'exp-eutic', 'exp-jpmorgan'],

    // TypeScript connections (including EUTIC)
    'tech-typescript': ['proj-courseworkbuddy', 'exp-eutic'],

    // Python connections
    'tech-python': ['proj-distributed-compute', 'proj-cardgpt', 'proj-handgesture', 'exp-pera', 'exp-keysight'],

    // FastAPI connections
    'tech-fastapi': ['proj-courseworkbuddy', 'exp-pera'],

    // PostgreSQL connections
    'tech-postgresql': ['proj-courseworkbuddy', 'exp-pera'],

    // LangChain connections
    'tech-langchain': ['proj-courseworkbuddy'],

    // Qdrant connections
    'tech-qdrant': ['proj-courseworkbuddy', 'exp-pera'],

    // gRPC connections
    'tech-grpc': ['proj-distributed-compute'],

    // Scala connections
    'tech-scala': ['proj-sparse-matrix'],

    // Apache Spark connections
    'tech-spark': ['proj-sparse-matrix'],

    // Swift/SwiftUI connections
    'tech-swift': ['proj-healthmy'],
    'tech-swiftui': ['proj-healthmy'],

    // Flask connections
    'tech-flask': ['proj-cardgpt'],

    // Java connections
    'tech-java': ['proj-pizzadronz', 'exp-lab-demo'],

    // Spring Boot connections
    'tech-spring': ['proj-pizzadronz'],

    // Docker connections
    'tech-docker': ['proj-pizzadronz', 'exp-pera'],

    // Node.js connections
    'tech-nodejs': ['proj-nasa-satellite'],

    // OpenCV connections
    'tech-opencv': ['proj-handgesture'],

    // Redis connections
    'tech-redis': ['exp-pera'],

    // GCP connections
    'tech-gcp': ['exp-pera'],

    // Twilio connections
    'tech-twilio': ['exp-pera'],

    // Git - used everywhere
    'tech-git': ['proj-courseworkbuddy', 'proj-distributed-compute', 'proj-sparse-matrix', 'proj-healthmy', 'proj-cardgpt', 'proj-pizzadronz', 'proj-nasa-satellite', 'proj-handgesture', 'exp-pera', 'exp-keysight'],
};

// Generate connections from the map
export const generateConnections = (): GraphConnection[] => {
    const connections: GraphConnection[] = [];

    Object.entries(connectionMap).forEach(([techId, targetIds]) => {
        targetIds.forEach(targetId => {
            connections.push({ from: techId, to: targetId });
        });
    });

    return connections;
};

// Get all nodes combined
export const getAllNodes = (): GraphNode[] => {
    return [...technologyNodes, ...projectNodes, ...experienceNodes];
};

// Get connections
export const connections = generateConnections();

// Helper to get connected nodes for a given node ID
export const getConnectedNodes = (nodeId: string): string[] => {
    const connected: string[] = [];

    connections.forEach(conn => {
        if (conn.from === nodeId) {
            connected.push(conn.to);
        } else if (conn.to === nodeId) {
            connected.push(conn.from);
        }
    });

    return connected;
};

// Helper to check if a node is a technology
export const isTechnologyNode = (node: GraphNode): boolean => node.type === 'technology';

// Helper to check if a node is a project or experience
export const isProjectOrExperience = (node: GraphNode): boolean =>
    node.type === 'project' || node.type === 'experience';
