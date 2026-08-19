import React, { useEffect, useRef } from "react";

const CONTENT = {
    projectName: "Smart Student Campus Dashboard",
    collegeName: "T.B. Girwalkar Polytechnic",
    location: "Ambajogai",
    about:
        "Established in 1983 under the Mahatma Basweshwar Education Society, T.B. Girwalkar Polytechnic, Ambajogai is one of Maharashtra's reputed diploma engineering institutes. Affiliated with MSBTE, Mumbai and approved by AICTE, New Delhi, the institute offers quality technical education through experienced faculty, modern laboratories, practical learning, innovation, and industry-oriented skill development.",
    mission:
        "Develop technically skilled, ethical, innovative and industry-ready diploma engineers.",
    vision:
        "Become a leading technical institute providing excellence in education, innovation, practical learning and professional values.",
    highlights: [
        "Established 1983",
        "AICTE Approved",
        "MSBTE Affiliated",
        "Experienced Faculty",
        "Smart Classrooms",
        "Modern Laboratories",
        "Digital Library",
        "High-Speed Internet",
        "Placement Cell",
        "Industry Visits",
        "Skill Development",
        "Sports Facilities",
    ],
    links: {
        website: "https://tbgpoly.ac.in/",
        instagram: "https://www.instagram.com/tbgpoly",
    },
};

const WebsiteIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 2.6 4 5.8 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.8-4-9s1.4-6.4 4-9z" />
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.3" cy="6.7" r="1.05" fill="currentColor" strokeWidth="0" />
    </svg>
);

const CompassIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2.2 5.2-5.2 2.2 2.2-5.2 5.2-2.2z" fill="currentColor" strokeWidth="0" />
    </svg>
);

function useReveal(delay = 0) {
    const ref = useRef(null);
    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) { node.classList.add("is-visible"); return; }
        node.style.transitionDelay = `${delay}ms`;
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { node.classList.add("is-visible"); io.disconnect(); } },
            { threshold: 0.12 }
        );
        io.observe(node);
        return () => io.disconnect();
    }, [delay]);
    return ref;
}

const BackgroundLayer = () => (
    <div className="scd-bg" aria-hidden="true">
        <div className="scd-bg__canvas">
            <div className="scd-bg__orb scd-bg__orb--a" />
            <div className="scd-bg__orb scd-bg__orb--b" />
            <div className="scd-bg__orb scd-bg__orb--c" />
        </div>
        <div className="scd-bg__glass">
            <div className="scd-bg__glass-sheen" />
        </div>
        <div className="scd-bg__vignette" />
    </div>
);

const Wordmark = () => {
    const ref = useRef(null);
    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduced) setTimeout(() => node.classList.add("wm-active"), 120);
        else node.classList.add("wm-active");
    }, []);
    return (
        <div ref={ref} className="scd-wordmark" aria-label="T.B.G. Polytechnic Ambajogai">
            <div className="wm-initials">
                {"T.B.G.".split("").map((ch, i) => (
                    <span key={i} className="wm-letter" style={{ "--i": i }}>{ch}</span>
                ))}
            </div>
            <div className="wm-poly">
                {"POLYTECHNIC".split("").map((ch, i) => (
                    <span key={i} className="wm-poly-letter" style={{ "--i": i }}>{ch}</span>
                ))}
            </div>
            <div className="wm-place">AMBAJOGAI</div>
            <div className="wm-line" />
            <p className="wm-sub">Excellence in Technical Education Since 1983</p>
        </div>
    );
};

const CollegeDetails = () => {
    const eyebrowRef = useReveal(0);
    const titleRef = useReveal(80);
    const aboutRef = useReveal(160);
    const pillarsRef = useReveal(240);
    const chipsRef = useReveal(320);
    const actionsRef = useReveal(400);

    return (
        <section className="scd-section" aria-labelledby="scd-title">
            <BackgroundLayer />

            <div className="scd-brand">
                <span className="scd-brand__badge" aria-hidden="true">TB</span>
                <span className="scd-brand__name">{CONTENT.projectName}</span>
            </div>

            <div className="scd-container">
                <div className="scd-content">
                    <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "flex-start" }}>
                        <img
                            src="/college-logo.png"
                            alt="College Logo"
                            style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "contain",
                                filter: "drop-shadow(0 0 15px rgba(34, 211, 238, 0.4))"
                            }}
                        />
                    </div>

                    <Wordmark />

                    <span ref={eyebrowRef} className="scd-reveal scd-eyebrow">College Details</span>

                    <h2 ref={titleRef} id="scd-title" className="scd-reveal scd-title">
                        {CONTENT.collegeName}
                        <span className="scd-title__loc">, {CONTENT.location}</span>
                    </h2>

                    <p ref={aboutRef} className="scd-reveal scd-about">{CONTENT.about}</p>

                    <div ref={pillarsRef} className="scd-reveal scd-pillars">
                        <div className="scd-pillar">
                            <span className="scd-pillar__tag">Mission</span>
                            <p className="scd-pillar__text">{CONTENT.mission}</p>
                        </div>
                        <div className="scd-pillar">
                            <span className="scd-pillar__tag">Vision</span>
                            <p className="scd-pillar__text">{CONTENT.vision}</p>
                        </div>
                    </div>

                    <h3 className="scd-chips-label">Highlights</h3>
                    <ul ref={chipsRef} className="scd-reveal scd-chips" role="list">
                        {CONTENT.highlights.map((item, i) => (
                            <li key={item} className="scd-chip" style={{ "--ci": i }}>
                                <span className="scd-chip__dot" aria-hidden="true" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div ref={actionsRef} className="scd-reveal scd-actions">
                        <a href={CONTENT.links.website} target="_blank" rel="noopener noreferrer"
                            className="scd-btn scd-btn--emerald"
                            aria-label="Visit official website (opens in new tab)">
                            <span className="scd-btn__icon"><WebsiteIcon /></span>
                            <span>Official Website</span>
                        </a>
                        <a href={CONTENT.links.instagram} target="_blank" rel="noopener noreferrer"
                            className="scd-btn scd-btn--orchid"
                            aria-label="View Instagram (opens in new tab)">
                            <span className="scd-btn__icon"><InstagramIcon /></span>
                            <span>Instagram</span>
                        </a>
                        <button type="button" className="scd-btn scd-btn--gold">
                            <span className="scd-btn__icon"><CompassIcon /></span>
                            <span>Explore Campus</span>
                        </button>
                    </div>
                </div>

                <div className="scd-photo-zone" aria-hidden="true" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
                    <img
                        src="/college-banner.png"
                        alt="T.B.G. Polytechnic Campus"
                        style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "80vh",
                            objectFit: "cover",
                            borderRadius: "24px",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)"
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default CollegeDetails;