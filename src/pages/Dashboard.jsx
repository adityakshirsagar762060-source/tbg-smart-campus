import React, { useState, useEffect } from "react";
import { studyMaterials } from "../Data/materials";
import SkeletonCard from "../components/SkeletonCard";


function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    const mountTimer = setTimeout(() => setMounted(true), 40);
    return () => {
      clearTimeout(timer);
      clearTimeout(mountTimer);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const data = {
    "1st Year": {
      "Semester 1": [
        { code: "311301", name: "English" },
        { code: "311302", name: "Basic Science" },
        { code: "311303", name: "Basic Mathematics" },
      ],
      "Semester 2": [
        { code: "312301", name: "Applied Mathematics" },
        { code: "312302", name: "Engineering Graphics" },
        { code: "312303", name: "Workshop Practice" },
      ],
    },
    "2nd Year": {
      "Semester 3": [
        { code: "313301", name: "Data Structures" },
        { code: "313302", name: "Computer Architecture & Maintenance" },
        { code: "313303", name: "Java Programming" },
        { code: "313304", name: "VB.NET" },
      ],
      "Semester 4": [
        { code: "314301", name: "Database Management System" },
        { code: "314302", name: "Data Communication & Networking" },
        { code: "314303", name: "Python Programming" },
        { code: "314304", name: "Software Engineering" },
      ],
    },
    "3rd Year": {
      "Semester 5": [
        { code: "315319", name: "Operating System" },
        { code: "315321", name: "Advance Computer Network" },
        { code: "315323", name: "Software Testing" },
        { code: "315325", name: "Cloud Computing" },
        { code: "315326", name: "Data Analytics" },
      ],
      "Semester 6": [
        { code: "316301", name: "Management" },
        { code: "316302", name: "Emerging Trends in Computer & IT" },
      ],
    },
  };

  const getSubjects = () => {
    const query = searchTerm.trim().toLowerCase();

    if (query !== "") {
      const results = [];
      Object.keys(data).forEach((year) => {
        Object.keys(data[year]).forEach((semester) => {
          data[year][semester].forEach((subject) => {
            const codeMatch = subject.code.toLowerCase().includes(query);
            const nameMatch = subject.name.toLowerCase().includes(query);
            if (codeMatch || nameMatch) {
              results.push({ ...subject, year, semester });
            }
          });
        });
      });
      return results;
    }

    if (selectedYear && selectedSem) {
      return data[selectedYear][selectedSem].map((subject) => ({
        ...subject,
        year: selectedYear,
        semester: selectedSem,
      }));
    }

    return [];
  };

  // Per-year premium accent glow (kept restrained — no neon, no flashing)
  const yearTheme = {
    "1st Year": {
      ring: "hover:border-cyan-400/70",
      glow: "hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.45)]",
      active:
        "border-cyan-400/80 bg-cyan-400/[0.07] shadow-[0_0_45px_-10px_rgba(34,211,238,0.5)]",
      dot: "bg-cyan-400",
    },
    "2nd Year": {
      ring: "hover:border-violet-400/70",
      glow: "hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.45)]",
      active:
        "border-violet-400/80 bg-violet-400/[0.07] shadow-[0_0_45px_-10px_rgba(167,139,250,0.5)]",
      dot: "bg-violet-400",
    },
    "3rd Year": {
      ring: "hover:border-blue-400/70",
      glow: "hover:shadow-[0_0_40px_-8px_rgba(56,189,248,0.45)]",
      active:
        "border-blue-400/80 bg-blue-400/[0.07] shadow-[0_0_45px_-10px_rgba(56,189,248,0.5)]",
      dot: "bg-blue-400",
    },
  };

  const subjects = getSubjects();

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-700 ${isDark ? "bg-[#05060c] text-white" : "bg-[#eef1f6] text-slate-900"
        }`}
    >
      {/* Premium ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[150px] animate-drift-slow ${isDark ? "bg-cyan-500/10" : "bg-cyan-400/20"
            }`}
        />
        <div
          className={`absolute bottom-[-120px] left-[-80px] h-[380px] w-[380px] rounded-full blur-[140px] animate-drift-slower ${isDark ? "bg-blue-600/10" : "bg-blue-400/15"
            }`}
        />
        <div
          className={`absolute top-10 right-[-60px] h-[340px] w-[340px] rounded-full blur-[140px] animate-drift ${isDark ? "bg-violet-500/10" : "bg-violet-400/15"
            }`}
        />
        <div
          className={`absolute inset-0 ${isDark
            ? "bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.6),transparent_60%)]"
            }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        {/* NAVBAR / HEADER */}
        <header
          className={`glass-panel sticky top-4 z-20 mb-10 flex flex-col gap-5 rounded-3xl border px-5 py-5 sm:px-8 sm:py-6 lg:flex-row lg:items-center lg:justify-between reveal ${mounted ? "reveal-in" : ""
            } ${isDark
              ? "border-white/10 bg-white/[0.04]"
              : "border-black/5 bg-white/70"
            }`}
          style={{ animationDelay: "0ms" }}
        >
          <div className="min-w-0">
            <h1
              className="cursor-pointer select-none text-3xl font-black tracking-tight sm:text-4xl"
              onClick={() => {
                setSelectedYear(null);
                setSelectedSem(null);
                setSearchTerm("");
              }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                T.B.G.
              </span>
              <span className={`ml-3 ${isDark ? "text-white" : "text-slate-900"}`}>
                SMART CAMPUS
              </span>
            </h1>
            <p className={`mt-2 text-sm sm:text-base ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              Welcome Back 👋 Explore Notes, Question Papers & Study Materials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Search box */}
            <div className="search-glow group relative w-full sm:w-72">
              <span
                className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm ${isDark ? "text-gray-500" : "text-slate-400"
                  }`}
              >
                🔍
              </span>
              <input
                type="text"
                placeholder="Search subject or code..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedYear(null);
                  setSelectedSem(null);
                }}
                className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none backdrop-blur-xl transition-all duration-300 focus:scale-[1.01] ${isDark
                  ? "border-white/10 bg-white/[0.04] text-white placeholder:text-gray-500 focus:border-cyan-400/60"
                  : "border-black/10 bg-white/80 placeholder:text-slate-400 focus:border-cyan-400/60"
                  }`}
              />
            </div>

            <button
              onClick={toggleTheme}
              className={`glass-shine relative overflow-hidden rounded-2xl border px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${isDark
                ? "border-white/10 bg-white/[0.04] hover:border-white/25 hover:shadow-[0_0_25px_-6px_rgba(255,255,255,0.25)]"
                : "border-black/10 bg-white/80 hover:shadow-lg"
                }`}
            >
              <span className="shine" />
              {isDark ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        {/* WELCOME CARD */}
        <div
          className={`glass-panel glass-shine reveal relative mb-12 overflow-hidden rounded-[28px] border p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 ${mounted ? "reveal-in" : ""
            } ${isDark
              ? "border-white/10 bg-white/[0.04] hover:shadow-[0_0_45px_-15px_rgba(56,189,248,0.35)]"
              : "border-black/5 bg-white/70 hover:shadow-2xl"
            }`}
          style={{ animationDelay: "80ms" }}
        >
          <span className="shine" />
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            Welcome to T.B.G. Polytechnic
          </h2>
          <p className={`max-w-3xl text-sm sm:text-base ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            Access your study materials, notes, previous year question papers,
            assignments and semester-wise subjects from one professional
            dashboard.
          </p>
        </div>

        {/* YEAR + SEMESTER SELECTION */}
        {!searchTerm && (
          <div className="mb-14">
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              {Object.keys(data).map((year, i) => {
                const theme = yearTheme[year];
                const isActive = selectedYear === year;
                return (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setSelectedSem(null);
                    }}
                    style={{ animationDelay: `${140 + i * 90}ms` }}
                    className={`glass-panel glass-shine reveal relative w-full overflow-hidden rounded-3xl border px-8 py-6 text-left transition-all duration-400 hover:-translate-y-1.5 sm:w-auto sm:px-10 ${mounted ? "reveal-in" : ""
                      } ${theme.ring} ${theme.glow} ${isActive
                        ? theme.active
                        : isDark
                          ? "border-white/10 bg-white/[0.04]"
                          : "border-black/5 bg-white/70"
                      }`}
                  >
                    <span className="shine" />
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
                      <h3 className="text-xl font-bold sm:text-2xl">{year}</h3>
                    </div>
                    <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                      Click to view semesters
                    </p>
                  </button>
                );
              })}
            </div>

            {selectedYear && (
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {Object.keys(data[selectedYear]).map((semester, i) => (
                  <button
                    key={semester}
                    onClick={() => setSelectedSem(semester)}
                    style={{ animationDelay: `${i * 90}ms` }}
                    className={`glass-panel glass-shine reveal reveal-in relative overflow-hidden rounded-2xl border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 sm:text-base ${selectedSem === semester
                      ? "border-cyan-400/80 bg-cyan-400/[0.08] shadow-[0_0_30px_-10px_rgba(34,211,238,0.5)]"
                      : isDark
                        ? "border-white/10 bg-white/[0.04] hover:border-cyan-400/50 hover:shadow-[0_0_25px_-10px_rgba(34,211,238,0.4)]"
                        : "border-black/5 bg-white/70 hover:shadow-lg"
                      }`}
                  >
                    <span className="shine" />
                    {semester}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RESULTS HEADER */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold sm:text-2xl">
            {searchTerm
              ? "Search Results"
              : selectedSem
                ? `${selectedYear} • ${selectedSem}`
                : "Select a Year & Semester"}
          </h2>
          <span
            className={`rounded-full border px-4 py-1.5 text-xs font-medium sm:text-sm ${isDark
              ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
              : "border-cyan-500/30 bg-cyan-50 text-cyan-700"
              }`}
          >
            {subjects.length} Subjects
          </span>
        </div>

        {/* SUBJECT GRID */}
        {!isLoading && subjects.length === 0 && (searchTerm || (selectedYear && selectedSem)) ? (
          <div
            className={`glass-panel reveal reveal-in mb-8 rounded-3xl border p-10 text-center ${isDark ? "border-white/10 bg-white/[0.04]" : "border-black/5 bg-white/70"
              }`}
          >
            <p className="text-lg font-semibold">No subjects found</p>
            <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              {searchTerm
                ? `Nothing matches "${searchTerm}". Try the subject name or its full code.`
                : "No subjects listed for this semester yet."}
            </p>
          </div>
        ) : (
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {isLoading
              ? [...Array(8)].map((_, index) => <SkeletonCard key={index} />)
              : subjects.map((subject, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className={`glass-panel glass-shine reveal reveal-in group relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-400 hover:-translate-y-2 ${isDark
                    ? "border-white/10 bg-white/[0.04] hover:border-cyan-400/60 hover:shadow-[0_0_40px_-12px_rgba(34,211,238,0.4)]"
                    : "border-black/5 bg-white/80 hover:border-cyan-400/60 hover:shadow-2xl"
                    }`}
                >
                  <span className="shine" />
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${isDark
                        ? "bg-cyan-500/10 text-cyan-300"
                        : "bg-cyan-50 text-cyan-700"
                        }`}
                    >
                      {subject.code}
                    </span>
                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-slate-400"}`}>
                      {subject.year}
                    </span>
                  </div>

                  <h3 className="mb-1.5 text-lg font-bold sm:text-xl">{subject.name}</h3>
                  <p className={`mb-6 text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    {subject.semester}
                  </p>

                  <div className="mt-auto">
                    {studyMaterials[subject.code] ? (
                      <a
                        href={studyMaterials[subject.code].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`glass-shine glass-btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border px-5 py-3 text-sm font-semibold backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] ${isDark
                          ? "border-cyan-400/30 bg-cyan-400/[0.08] text-cyan-200 hover:border-cyan-300/70 hover:bg-cyan-400/[0.14] hover:shadow-[0_0_28px_-6px_rgba(34,211,238,0.55)]"
                          : "border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-700 hover:border-cyan-500/60 hover:bg-cyan-500/[0.14] hover:shadow-[0_0_28px_-8px_rgba(14,165,233,0.35)]"
                          }`}
                      >
                        <span className="shine" />
                        <span>📖</span>
                        <span>View Material</span>
                      </a>
                    ) : (
                      <div
                        className={`rounded-xl border px-4 py-3 text-sm ${isDark
                          ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
                          : "border-yellow-400/30 bg-yellow-50 text-yellow-700"
                          }`}
                      >
                        Study material will be uploaded soon.
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* FOOTER */}
        <footer
          className={`glass-panel reveal reveal-in mt-16 rounded-3xl border p-6 text-center sm:p-8 ${isDark ? "border-white/10 bg-white/[0.04]" : "border-black/5 bg-white/70"
            }`}
        >
          <h3 className="mb-2 text-lg font-bold sm:text-xl">
            T.B.G. Polytechnic Smart Campus
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            One Place for Notes, Assignments, Previous Year Question Papers,
            Practicals & Study Resources.
          </p>
          <p className={`mt-4 text-xs tracking-widest ${isDark ? "text-gray-500" : "text-slate-400"}`}>
            © 2026 T.B.G. Polytechnic, Ambajogai
          </p>
        </footer>
      </div>

      <style>{`
        .glass-panel {
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
        }

        .glass-shine { position: relative; }
        .glass-shine .shine {
          position: absolute;
          top: 0;
          left: -160%;
          width: 55%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.14), transparent);
          transform: skewX(-20deg);
          transition: left 0.75s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .glass-shine:hover .shine { left: 160%; }

        .search-glow { transition: filter 0.4s ease; }
        .search-glow:hover, .search-glow:focus-within {
          filter: drop-shadow(0 0 18px rgba(34,211,238,0.25));
        }

        .reveal { opacity: 0; }
        .reveal-in { animation: fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes driftA {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(35px,-25px) scale(1.06); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-25px,20px) scale(1.05); }
        }
        .animate-drift { animation: driftA 20s ease-in-out infinite; }
        .animate-drift-slow { animation: driftB 26s ease-in-out infinite; }
        .animate-drift-slower { animation: driftA 32s ease-in-out infinite; }

        html { scroll-behavior: smooth; }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal-in { animation: none !important; opacity: 1 !important; transform: none !important; }
          .animate-drift, .animate-drift-slow, .animate-drift-slower { animation: none !important; }
          .glass-shine .shine { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;