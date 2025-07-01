
const AboutSection = () => (
    <section id="about-me" className="section d-flex flex-column justify-content-center align-items-center text-center py-5">
        <div className="w-75">
            <h3 className="mb-4">👨‍💻 About Me</h3>
            <p className="lead mb-5">

            </p>

            <div className="imgcontainer">
                <img src="/face.jpeg" width="200" height="200" className="imgcenter img-circular"/>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">🎓 Education</h5>
                            <p className="card-text">
                                Studying Computer Science at <strong>The University of Edinburgh</strong> <br/> Graduating in Summer 2026
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">💼 Experiences</h5>
                            <p className="card-text">
                                Participated in over 5 hackathons. Previous software engineering interns at <strong>Keysight Technologies</strong> and <strong>Pera</strong> (London-based start-up)
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">💡 Interests</h5>
                            <p className="card-text">
                                Enthusiastic about <strong>software development</strong>, <strong>AI/ML</strong> and learning about the latest technologies
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 scroll-down-arrow">
                <a
                    href="/2025%20RESUME%20WAN%20FAIZ%20LUQMAN.pdf"
                    className="btn btn-outline-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                > <button>📄 View My Resume</button>
                </a>
            </div>
        </div>
    </section>
);

export default AboutSection;