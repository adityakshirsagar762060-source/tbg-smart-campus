import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LightRays from "../Components/LightRays";

function useGoogleFonts() {
    useEffect(() => {
        if (document.getElementById("tbg-fonts")) return;
        const link = document.createElement("link");
        link.id = "tbg-fonts";
        link.rel = "stylesheet";
        link.href =
            "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap";
        document.head.appendChild(link);
    }, []);
}

function Home() {
    const navigate = useNavigate();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [mounted, setMounted] = useState(false);

    useGoogleFonts();

    useEffect(() => {
        setMounted(true);
    }, []);

    const particles = useMemo(
        () =>
            Array.from({ length: 22 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: 1 + Math.random() * 2.5,
                duration: 10 + Math.random() * 14,
                delay: Math.random() * -20,
                opacity: 0.15 + Math.random() * 0.35,
            })),
        []
    );

    const isAuthed = () => localStorage.getItem("isLoggedIn") === "true";

    const handleDashboard = () => {
        if (!isAuthed()) {
            setShowLoginPopup(true);
            return;
        }
        navigate("/dashboard");
    };

    return (
        <div
            className="relative min-h-screen w-full overflow-x-hidden text-white"
            style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                background: "linear-gradient(160deg, #020817 0%, #061826 48%, #0F172A 100%)",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.6s ease",
            }}
        >
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#38bdf8"
                    raysSpeed={0.9}
                    lightSpread={1.3}
                    rayLength={2.2}
                    pulsating={true}
                    fadeDistance={1.2}
                    saturation={1}
                    followMouse={true}
                    mouseInfluence={0.18}
                    noiseAmount={0.03}
                    distortion={0.05}
                />
            </div>

            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.18),transparent_70%)]" />
                <div className="tbg-blob tbg-blob-a" />
                <div className="tbg-blob tbg-blob-b" />
                <div className="tbg-blob tbg-blob-c" />
                {particles.map((p) => (
                    <span
                        key={p.id}
                        className="tbg-particle"
                        style={{
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            opacity: p.opacity,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-20">
                <main className="relative flex min-h-screen w-full items-center justify-center px-4 sm:px-6 pt-20 pb-16">
                    <section className="relative z-20 flex w-full max-w-5xl flex-col items-center text-center">
                        <h4
                            className={`mb-4 sm:mb-5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.5em] sm:tracking-[0.6em] text-cyan-300 transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                                }`}
                        >
                            Welcome To
                        </h4>

                        <h1 className={`tbg-title ${mounted ? "tbg-title--in" : ""}`}>TBG Polytechnic</h1>

                        <h3
                            className={`mt-2 sm:mt-3 text-sm sm:text-lg md:text-xl font-semibold uppercase tracking-[0.35em] sm:tracking-[0.5em] text-cyan-300/90 transition-all duration-700 ease-out delay-200 ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                                }`}
                        >
                            Ambajogai
                        </h3>

                        <div
                            className={`mt-9 sm:mt-11 flex w-full max-w-md flex-col items-stretch justify-center gap-4 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-5 transition-all duration-700 ease-out delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                                }`}
                        >
                            <button onClick={handleDashboard} className="tbg-btn-primary group">
                                <span>Enter Dashboard</span>
                                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                            </button>
                            <button onClick={() => navigate("/college-details")} className="tbg-btn-secondary">
                                <span className="relative z-10">View College Details</span>
                            </button>
                        </div>
                    </section>
                </main>

                {showLoginPopup && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020817]/90 backdrop-blur-md px-4">
                        <div className="w-full max-w-[320px] animate-[fadeUp_0.3s_ease-out] rounded-2xl border border-cyan-400/15 bg-[#08111f] p-6 shadow-2xl">
                            <h2 className="text-center text-xl font-bold text-white">Login Required</h2>
                            <p className="mt-2 text-center text-sm text-gray-400">Please login to continue.</p>
                            <div className="mt-6 flex flex-col gap-2">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="w-full rounded-lg bg-white px-4 py-2 text-sm font-bold text-black transition-all duration-300 hover:bg-cyan-400 active:scale-95"
                                >
                                    Login Now
                                </button>
                                <button
                                    onClick={() => setShowLoginPopup(false)}
                                    className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm font-semibold text-gray-400 transition-all duration-300 hover:text-white hover:border-white/30"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tbgFloatA { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(40px, -30px) scale(1.08); } }
        @keyframes tbgFloatB { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-35px, 25px) scale(1.05); } }
        @keyframes tbgFloatC { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, 35px) scale(1.1); } }
        @keyframes tbgParticle { 0% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-24px) translateX(10px); } 100% { transform: translateY(0) translateX(0); } }
        @keyframes tbgShimmer { 0% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
        @keyframes tbgSpin { to { transform: rotate(360deg); } }

        .tbg-blob { position: absolute; border-radius: 9999px; filter: blur(110px); pointer-events: none; }
        .tbg-blob-a { top: -180px; left: 50%; transform: translateX(-50%); width: 700px; height: 700px; background: radial-gradient(circle, rgba(6,182,212,0.20), transparent 70%); animation: tbgFloatA 16s ease-in-out infinite; }
        .tbg-blob-b { bottom: -160px; left: 10%; width: 480px; height: 480px; background: radial-gradient(circle, rgba(56,189,248,0.14), transparent 70%); animation: tbgFloatB 20s ease-in-out infinite; }
        .tbg-blob-c { top: 30%; right: 5%; width: 380px; height: 380px; background: radial-gradient(circle, rgba(14,116,144,0.18), transparent 70%); animation: tbgFloatC 18s ease-in-out infinite; }

        .tbg-particle { position: absolute; border-radius: 9999px; background: #7dd3fc; animation-name: tbgParticle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }

        .tbg-title {
          font-family: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.05;
          background: linear-gradient(90deg, #ffffff 10%, #bff4ff 55%, #38bdf8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 60px rgba(34,211,238,0.25);
          font-size: 2.25rem;
          opacity: 0;
          transform: translateY(18px) scale(0.98);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
        }
        .tbg-title--in { opacity: 1; transform: translateY(0) scale(1); }
        @media (min-width: 640px) { .tbg-title { font-size: 3rem; } }
        @media (min-width: 768px) { .tbg-title { font-size: 3.75rem; } }
        @media (min-width: 1024px) { .tbg-title { font-size: 4.5rem; } }

        .tbg-btn-primary, .tbg-btn-secondary {
          position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          border-radius: 1rem; padding: 0.9rem 2rem; font-size: 0.95rem; font-weight: 700; color: #fff;
          backdrop-filter: blur(14px);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }

        .tbg-btn-primary { border: 1px solid rgba(34,211,238,0.4); background: linear-gradient(135deg, rgba(6,182,212,0.18), rgba(255,255,255,0.04)); }
        .tbg-btn-primary:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 0 35px rgba(34,211,238,0.4); border-color: #22d3ee; }
        .tbg-btn-primary:active { transform: translateY(-1px) scale(0.98); }

        .tbg-btn-secondary { overflow: hidden; border: 1px solid rgba(167,139,250,0.25); background: rgba(255,255,255,0.04); font-weight: 600; }
        .tbg-btn-secondary::before {
          content: ""; position: absolute; inset: -1px; border-radius: 1rem; padding: 1px;
          background: conic-gradient(from 0deg, transparent, #a78bfa, transparent 30%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0;
          transition: opacity 0.4s ease; animation: tbgSpin 3s linear infinite;
        }
        .tbg-btn-secondary:hover { transform: translateY(-3px); background: rgba(255,255,255,0.06); box-shadow: 0 0 30px rgba(167,139,250,0.25); border-color: rgba(167,139,250,0.5); }
        .tbg-btn-secondary:hover::before { opacity: 1; }
        .tbg-btn-secondary:active { transform: translateY(-1px) scale(0.98); }

        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>
        </div>
    );
}

export default Home;