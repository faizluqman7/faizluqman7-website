import { useEffect} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HeroSection from './components/HeroSection';
import AboutSection from "./components/About.tsx";
import TechSection from "./components/Tech.tsx";
import ProjectsSection from "./components/ProjectsSection.tsx";
import Contact from "./components/Contact.tsx";
import FloatingBubbles from "./components/Bubbles.tsx";
import NavBar from "./components/NavBar.tsx";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import WorkExperience from "./components/WorkExperience.tsx";

gsap.registerPlugin(ScrollTrigger);

function App() {


    useEffect(() => {
        gsap.utils.toArray<HTMLElement>(".section").forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                    },
                }
            );
        });
    }, []);

    return (
        <main className="fullpage-container">
            <NavBar />
            <FloatingBubbles />
            <HeroSection />
            <AboutSection />
            <TechSection />
            <WorkExperience />
            <ProjectsSection />
            <Contact />

        </main>
    );
}

export default App;
