import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, AlertCircle } from "lucide-react";
import myPhoto from "../assets/my-clg.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const isLoginPage = location.pathname === "/login" || location.pathname === "/student-login";
  const isHomePage = location.pathname === "/";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/college-details") {
      setActiveSection("");
      return;
    }

    const sections = ["college-details", "placements", "dashboard", "library", "contact", "about"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  if (isLoginPage) return null;

  const handleNavClick = (sectionId, isRoute, path) => {
    setMenuOpen(false);
    if (isRoute) {
      navigate(path);
      setActiveSection("");
    } else {
      if (location.pathname !== "/college-details") {
        navigate("/college-details");
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      setActiveSection(sectionId);
    }
  };

  const links = [
    { id: "home", label: "Home", isRoute: true, path: "/" },
    { id: "college-details", label: "College\nDetails", isRoute: false },
    { id: "placements", label: "Placement", isRoute: false },
    { id: "dashboard", label: "Dashboard", isRoute: false },
    { id: "library", label: "Library", isRoute: false },
    { id: "contact", label: "Contact", isRoute: false },
    { id: "about", label: "About\nMe", isRoute: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-4 px-4 sm:px-6">
      <nav className="mx-auto flex max-w-[95rem] items-center justify-between rounded-full border border-cyan-500/20 bg-[#050b14]/80 px-6 py-3 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">

        {/* Logo Section */}
        <div
          onClick={() => {
            navigate("/");
            setActiveSection("");
          }}
          className="cursor-pointer select-none group flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center bg-transparent shrink-0">
            <img src={myPhoto} alt="Logo" className="h-full w-full object-contain scale-[1.2] transition-transform duration-500 group-hover:scale-[1.3]" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-xl font-black tracking-[0.15em] text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              POLYTECHNIC
            </h1>
            <p className="-mt-1 text-[9px] uppercase tracking-[0.35em] text-cyan-400/80 font-bold">
              Ambajogai
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-2 xl:gap-6 md:flex">
          {links.map((link) => {
            const isActive = link.isRoute
              ? (location.pathname === link.path && activeSection === "")
              : (location.pathname === "/college-details" && activeSection === link.id);

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id, link.isRoute, link.path)}
                className={`relative px-2 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 group whitespace-pre-line text-center leading-tight ${isActive ? "text-cyan-300" : "text-gray-300 hover:text-white"
                  }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.8)] ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Side Action Buttons */}
        <div className="hidden md:flex items-center gap-5">

          {/* Raise Complaint - Premium Seamless Link (No Box) */}
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/raise-complaint");
            }}
            className="group flex items-center gap-2 px-2 py-2 text-[13px] font-semibold text-gray-300 transition-all duration-300 hover:text-cyan-300"
          >
            <AlertCircle size={16} className="text-cyan-500/60 group-hover:text-cyan-400 group-hover:animate-pulse transition-colors" />
            <span className="relative">
              Raise Complaint
              <span className="absolute -bottom-1.5 left-1/2 w-0 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </span>
          </button>

          {/* Student Login / Logout - Ghost to Glow Button */}
          <button
            onClick={handleAuthAction}
            className={`relative px-6 py-2.5 text-[13px] font-bold rounded-full overflow-hidden transition-all duration-300 group hover:-translate-y-[1px] active:translate-y-[1px] ${isLoggedIn && !isHomePage
              ? "border border-red-500/40 text-red-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:border-red-400"
              : "border border-cyan-500/50 text-cyan-50 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:border-cyan-300"
              }`}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isLoggedIn && !isHomePage ? "bg-red-500/10" : "bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
              }`} />
            <span className="relative z-10 tracking-wide">{isLoggedIn && !isHomePage ? "Logout" : "Student Login"}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center h-10 w-10 text-cyan-300 transition-transform duration-300 hover:scale-110 active:scale-90"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden mx-auto max-w-7xl overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col gap-2 rounded-3xl border border-cyan-500/20 bg-[#050b14]/95 p-5 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
          {links.map((link) => {
            const isActive = link.isRoute
              ? (location.pathname === link.path && activeSection === "")
              : (location.pathname === "/college-details" && activeSection === link.id);

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id, link.isRoute, link.path)}
                className={`block w-full text-left px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? "text-cyan-300 bg-cyan-500/10 border-l-2 border-cyan-400" : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {link.label.replace('\n', ' ')}
              </button>
            );
          })}

          <div className="h-[1px] w-full bg-white/5 my-3" />

          {/* Mobile Raise Complaint */}
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/raise-complaint");
            }}
            className="flex w-full items-center justify-start gap-3 px-5 py-3 rounded-xl text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-white/5 hover:text-cyan-300 group"
          >
            <AlertCircle size={18} className="text-cyan-500/60 group-hover:text-cyan-400" />
            Raise Complaint
          </button>

          {/* Mobile Auth Button */}
          <button
            onClick={handleAuthAction}
            className={`w-full rounded-xl px-5 py-3 mt-2 text-sm font-bold tracking-wide transition-all duration-300 ${isLoggedIn && !isHomePage
              ? "border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:border-red-500/50"
              : "border border-cyan-500/40 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 hover:border-cyan-500/60 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
              }`}
          >
            {isLoggedIn && !isHomePage ? "Logout" : "Student Login"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;