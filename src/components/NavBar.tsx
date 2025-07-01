import { useState, useEffect } from 'react';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // Show the navbar when "About Me" is in view
                }
            },
            {
                threshold: 0.5, // Trigger when 50% of the section is in view
            }
        );

        // Observe the About Me section
        const aboutMeSection = document.getElementById('about-me');
        if (aboutMeSection) {
            observer.observe(aboutMeSection);
        }

        return () => {
            if (aboutMeSection) {
                observer.unobserve(aboutMeSection);
            }
        };
    }, []); // Removed isVisible dependency to prevent unnecessary re-renders

    return (
        isVisible && (
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#home">Faiz Luqman</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#about-me">About Me</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#tech">Tech</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#work-experience">Timeline</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#projects">Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    );
};

export default NavBar;