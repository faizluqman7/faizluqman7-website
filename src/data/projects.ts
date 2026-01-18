export interface Project {
    title: string;
    description: string[];
    link?: string;
    date?: string;
    tech?: string[];
    isOngoing?: boolean;
    isFeatured?: boolean;
    image?: string;
    isHighlighted?: boolean;
}

export const projects: Project[] = [

    {
        title: '📚 AI-Driven Coursework Planning System',
        description: [
            'Developed a study platform using React + FastAPI with multimodal RAG using Gemini 2.0 + LangChain.',
            'Integrated Qdrant Cloud for efficient multimodal semantic retrieval with <1s latency.',
            'JWT-based auth with PostgreSQL reduced login times by 50%.',
        ],
        link: 'https://github.com/faizluqman7/courseworkbuddy',
        date: '2025',
        tech: ['React', 'TypeScript', 'PostgreSQL', 'LangChain', 'Qdrant'],
        image: '/courseworkbuddy.png',
        isHighlighted: true,
        isFeatured: true,
    },
    // FEATURED PROJECTS (from CV)
    {
        title: '🔗 Distributed Compute Cluster & Storage Engine',
        description: [
            'Engineered a distributed compute engine in Python using gRPC, processing 3.5M+ primes/sec across nodes.',
            'Architected a custom AFS-inspired distributed file system with client-side caching and Primary-Backup replication.',
            'Achieved >99.9% availability during single-node failures.',
        ],
        date: '2025',
        tech: ['Python', 'gRPC', 'Distributed Systems'],
        isFeatured: true,
    },

    {
        title: '⚡ Sparse Matrix & Tensor Multiplication Engine',
        description: [
            'Implemented distributed sparse matrix engine using Apache Spark with 5 storage formats.',
            'Achieved 28-36x compute speedup using CSF compression vs baseline formats.',
            'Kernel fusion combining operations in single pass resulted in 6.4x speedup.',
        ],
        date: '2025',
        tech: ['Scala', 'Apache Spark', 'Distributed Computing'],
        isFeatured: true,
    },
    // ONGOING PROJECTS
    {
        title: '❤️ HealthMY iOS App',
        description: [
            'iOS app for tracking health metrics including blood pressure, heart rate, and more.',
            'Built with Swift and SwiftUI, utilizing Apple CoreData and HealthKit for local storage and health data.',
            'Features clean UI design following Apple Human Interface Guidelines.',
            'Ongoing project with regular updates and new features.',
        ],
        link: 'https://github.com/faizluqman7/HealthMY',
        date: 'Nov 2021 - Present',
        tech: ['Swift', 'SwiftUI', 'CoreData', 'HealthKit', 'iOS'],
        isOngoing: true,
    },
    // OTHER NOTABLE PROJECTS
    {
        title: '🤖 CardGPT - AI Card Generator',
        description: [
            'Full-stack web app using React and Flask to generate printable cards for a card matching game.',
            'Utilized Google Gemini 1.5-turbo API to generate custom AI-generated word pairs for the cards.',
            'Achieved consistent results in under 1.5 seconds with optimized API calls.',
        ],
        link: 'https://github.com/faizluqman7',
        date: 'Jan 2025 - Mar 2025',
        tech: ['React', 'Flask', 'Gemini API', 'Python'],
    },
    {
        title: '🚁 PizzaDronz Delivery System',
        description: [
            'Built a REST API Service using Spring Boot to validate orders and calculate flight paths for a drone delivery system.',
            'Implemented the A* search algorithm to calculate optimal flight paths within a 2km² area.',
            'Achieved path calculation results in under 150ms with intelligent caching strategies.',
            'Used Docker for containerization and Postman for comprehensive API testing.',
        ],
        link: 'https://github.com/faizluqman7',
        date: 'Oct 2024 - Jan 2025',
        tech: ['Java', 'Spring Boot', 'Docker', 'REST API'],
    },
    {
        title: '📡 NASA Satellite Observer',
        description: [
            'Web application for users to define target locations and receive Landsat satellite overpass notifications.',
            'Integrated Google Maps API for precise and interactive location selection.',
            'Utilized Node.js and SendGrid API to automate real-time notifications.',
            'Developed as part of NASA Space Apps Challenge 2024 with a team of 5.',
        ],
        link: 'https://github.com/faizluqman7/Hackathon-NASA-Landsat',
        date: 'Aug 2024 - Oct 2024',
        tech: ['Node.js', 'Google Maps API', 'SendGrid'],
    },
    {
        title: '✋ Hand Gesture Mouse Controller',
        description: [
            'An accessibility tool built to control mouse movements and clicks using only hand gestures.',
            'Utilized OpenCV and MediaPipe for real-time hand tracking and gesture recognition.',
            'Achieved a 96% true positive rate for expected mouse click detection.',
        ],
        link: 'https://github.com/faizluqman7/HandTrackingMouse',
        date: 'Feb 2024 - Mar 2024',
        tech: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
    },
    {
        title: '📚 Study Companion Web App',
        description: [
            'University study companion with To-Do List, Google Calendar integration, and Pomodoro Timer.',
            'Includes a Study Group Finder tool to connect students.',
            'Developed with a team of 4 at Ada Hack Hackathon 2024.',
        ],
        link: 'https://github.com/faizluqman7',
        date: 'Feb 2024',
        tech: ['HTML', 'CSS', 'JavaScript'],
    },
];