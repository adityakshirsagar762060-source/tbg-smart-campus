import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Loader2,
  ArrowRight,
  GraduationCap,
  Sparkles,
  BookOpen,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const mascotVariant = {
  hidden: { opacity: 0, y: -24, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

function StudentLogin() {
  const navigate = useNavigate();

  const huskyNormal = "/husky-normal.png";
  const huskyCover = "/husky-cover.png";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  const emailFloated = isEmailFocused || email.length > 0;
  const passwordFloated = isPasswordFocused || password.length > 0;

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 8,
      })),
    []
  );

  const handleMascotMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 16, y: py * -16 });
  };

  const spawnRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      localStorage.setItem("isLoggedIn", "true");
      if (rememberMe) {
        localStorage.setItem("studentEmail", email);
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#030712] px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.14),transparent_45%),radial-gradient(circle_at_82%_6%,rgba(99,102,241,0.16),transparent_45%),radial-gradient(circle_at_50%_105%,rgba(139,92,246,0.14),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse at center, black 35%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 35%, transparent 78%)",
          }}
        />
        <div className="absolute -top-52 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[130px] animate-[drift1_13s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-indigo-500/15 blur-[120px] animate-[drift2_15s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-violet-500/15 blur-[120px] animate-[drift2_17s_ease-in-out_infinite_reverse]" />

        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-cyan-200/50"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animation: `particleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      <style>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50% { transform: translate(-50%, 26px) scale(1.08); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -18px) scale(1.1); }
        }
        @keyframes particleDrift {
          0%, 100% { transform: translateY(0) translateX(0); opacity: .15; }
          50% { transform: translateY(-22px) translateX(10px); opacity: .65; }
        }
        @keyframes floatMascot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.035); }
        }
        @keyframes ringSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ringSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes blinkSwap {
          0% { opacity: 0; transform: scale(.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .mascot-float { animation: floatMascot 5s ease-in-out infinite; }
        .mascot-breathe { animation: breathe 4.5s ease-in-out infinite; }
        .ring-orbit { animation: ringSpin 16s linear infinite; }
        .ring-orbit-rev { animation: ringSpinReverse 16s linear infinite; }
        .badge-counter { animation: ringSpinReverse 16s linear infinite; }
        .husky-in { animation: blinkSwap .35s ease forwards; }
        .husky-out { opacity: 0; transform: scale(.9); transition: opacity .2s ease, transform .2s ease; }

        .glass-login {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 55%, rgba(34,211,238,0.06) 100%);
          -webkit-backdrop-filter: blur(22px);
          backdrop-filter: blur(22px);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 12px rgba(34,211,238,0.06), 0 10px 26px -10px rgba(0,0,0,0.55);
          transition: transform .35s cubic-bezier(0.16,1,0.3,1), box-shadow .4s ease, filter .4s ease, border-color .4s ease;
        }
        .glass-login::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 1.5px;
          background: conic-gradient(from 0deg, #22D3EE, #6366F1, #8B5CF6, #22D3EE);
          opacity: 0;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: ringSpin 3.5s linear infinite;
          transition: opacity .4s ease;
          z-index: -1;
        }
        .glass-login:hover::before { opacity: 1; }
        .glass-login::after {
          content: "";
          position: absolute;
          top: 0; left: -65%;
          width: 45%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.65), transparent);
          transform: skewX(-20deg);
          transition: left .8s cubic-bezier(0.16,1,0.3,1);
          z-index: 1;
        }
        .glass-login:hover::after { left: 135%; }
        .glass-login:hover {
          transform: translateY(-3px);
          filter: brightness(1.14);
          border-color: rgba(34,211,238,0.4);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 14px rgba(34,211,238,0.12), 0 18px 42px -12px rgba(34,211,238,0.4), 0 0 24px -4px rgba(139,92,246,0.35);
        }
        .glass-login:active { transform: translateY(-1px) scale(0.985); }

        .social-btn { position: relative; isolation: isolate; overflow: hidden; }
        .social-btn::before {
          content: "";
          position: absolute; inset: -1px;
          border-radius: inherit;
          padding: 1px;
          opacity: 0;
          transition: opacity .35s ease;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: -1;
        }
        .social-btn.google::before {
          background: conic-gradient(from 180deg, #4285F4, #34A853, #FBBC05, #EA4335, #4285F4);
        }
        .social-btn.apple::before {
          background: linear-gradient(135deg, #ffffff, #94a3b8, #ffffff);
        }
        .social-btn:hover::before { opacity: 1; }
        .social-btn.google:hover { box-shadow: 0 14px 32px -10px rgba(66,133,244,.5); }
        .social-btn.apple:hover { box-shadow: 0 14px 32px -10px rgba(255,255,255,.28); }

        .underline-anim { position: relative; }
        .underline-anim::after {
          content: "";
          position: absolute; left: 0; bottom: -2px;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, #22D3EE, #6366F1);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform .35s ease;
        }
        .underline-anim:hover::after { transform: scaleX(1); transform-origin: left; }
      `}</style>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[21rem] xs:max-w-sm sm:max-w-sm md:max-w-md lg:max-w-md"
      >
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative rounded-[28px] sm:rounded-[32px] border border-white/10 bg-white/[0.04] pt-14 pb-7 px-5 sm:pt-16 sm:pb-8 sm:px-9 md:px-10 backdrop-blur-2xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)]"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-white/10 to-transparent opacity-40" />

          <motion.div
            variants={mascotVariant}
            className="absolute -top-14 left-1/2 -translate-x-1/2 sm:-top-16"
          >
            <div
              onMouseMove={handleMascotMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36"
              style={{
                transform: `perspective(700px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: "transform .35s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="absolute -inset-4 rounded-full border border-cyan-400/20 ring-orbit sm:-inset-5" />
              <div className="absolute -inset-7 rounded-full border border-dashed border-indigo-400/15 ring-orbit-rev sm:-inset-9" />

              <div className="absolute -inset-7 ring-orbit sm:-inset-9">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div className="badge-counter flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_0_16px_rgba(34,211,238,0.45)] sm:h-7 sm:w-7">
                    <GraduationCap className="h-3 w-3 text-cyan-200 sm:h-3.5 sm:w-3.5" strokeWidth={2.25} />
                  </div>
                </div>
              </div>
              <div
                className="absolute -inset-7 ring-orbit sm:-inset-9"
                style={{ animationDelay: "-5.333s" }}
              >
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="badge-counter flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_0_14px_rgba(99,102,241,0.4)] sm:h-6 sm:w-6"
                    style={{ animationDelay: "-5.333s" }}
                  >
                    <Sparkles className="h-2.5 w-2.5 text-indigo-200 sm:h-3 sm:w-3" strokeWidth={2.25} />
                  </div>
                </div>
              </div>
              <div
                className="absolute -inset-7 ring-orbit sm:-inset-9"
                style={{ animationDelay: "-10.666s" }}
              >
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="badge-counter flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_0_14px_rgba(139,92,246,0.4)] sm:h-6 sm:w-6"
                    style={{ animationDelay: "-10.666s" }}
                  >
                    <BookOpen className="h-2.5 w-2.5 text-violet-200 sm:h-3 sm:w-3" strokeWidth={2.25} />
                  </div>
                </div>
              </div>

              <div className="mascot-float h-full w-full">
                <div className="mascot-breathe relative h-full w-full rounded-full">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-2xl" />
                  <img
                    src={huskyNormal}
                    alt="Campus mascot"
                    className={`relative h-full w-full object-contain drop-shadow-[0_8px_24px_rgba(34,211,238,0.35)] ${isPasswordFocused ? "husky-out" : "husky-in"
                      }`}
                  />
                  <img
                    src={huskyCover}
                    alt="Campus mascot covering eyes"
                    className={`absolute inset-0 h-full w-full object-contain drop-shadow-[0_8px_24px_rgba(34,211,238,0.35)] ${isPasswordFocused ? "husky-in" : "husky-out"
                      }`}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-center text-[28px] sm:text-[32px] font-extrabold tracking-tight text-white"
            style={{ fontFamily: "'Sora', 'Inter', sans-serif" }}
          >
            Student Login
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-center text-sm text-slate-400"
          >
            Welcome back. Access your Smart Campus Dashboard.
          </motion.p>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 18 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-center text-xs text-red-300"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="mt-7 space-y-4">
            <motion.div variants={fadeUp} className="relative">
              <input
                id="email"
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                className="peer w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-12 pr-4 pt-5 pb-2.5 text-[15px] text-white outline-none backdrop-blur-xl transition-all duration-300 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1),0_0_28px_-6px_rgba(34,211,238,0.35)] focus:scale-[1.01]"
                required
              />
              <Mail
                className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] transition-colors duration-300 ${isEmailFocused ? "text-cyan-300" : "text-slate-500"
                  }`}
              />
              <label
                htmlFor="email"
                className={`pointer-events-none absolute left-12 transition-all duration-300 ${emailFloated
                  ? "top-3 text-[11px] text-cyan-300/90"
                  : "top-1/2 -translate-y-1/2 text-[15px] text-slate-500"
                  }`}
              >
                Email Address
              </label>
              <AnimatePresence>
                {isEmailFocused && (
                  <motion.span
                    initial={{ x: "-100%", opacity: 0.7 }}
                    animate={{ x: "120%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 rounded-2xl bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  />
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                className="peer w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-12 pr-12 pt-5 pb-2.5 text-[15px] text-white outline-none backdrop-blur-xl transition-all duration-300 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1),0_0_28px_-6px_rgba(34,211,238,0.35)] focus:scale-[1.01]"
                required
              />
              <Lock
                className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] transition-colors duration-300 ${isPasswordFocused ? "text-cyan-300" : "text-slate-500"
                  }`}
              />
              <label
                htmlFor="password"
                className={`pointer-events-none absolute left-12 transition-all duration-300 ${passwordFloated
                  ? "top-3 text-[11px] text-cyan-300/90"
                  : "top-1/2 -translate-y-1/2 text-[15px] text-slate-500"
                  }`}
              >
                Password
              </label>
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-all duration-300 hover:text-cyan-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-md"
              >
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
              <AnimatePresence>
                {isPasswordFocused && (
                  <motion.span
                    initial={{ x: "-100%", opacity: 0.7 }}
                    animate={{ x: "120%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 rounded-2xl bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  />
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center justify-between pt-1 text-xs text-slate-400 sm:text-sm"
            >
              <label className="group/check flex cursor-pointer select-none items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md border backdrop-blur-xl transition-all duration-300 ${rememberMe
                    ? "border-cyan-400/60 bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-[0_0_14px_rgba(34,211,238,0.5)]"
                    : "border-white/15 bg-white/5 group-hover/check:border-white/30"
                    }`}
                >
                  <Check
                    strokeWidth={3}
                    className={`h-3.5 w-3.5 text-white transition-all duration-300 ${rememberMe ? "scale-100 opacity-100" : "scale-50 opacity-0"
                      }`}
                  />
                </span>
                <span className="whitespace-nowrap transition-colors group-hover/check:text-slate-200">
                  Remember Me
                </span>
              </label>

              <button
                type="button"
                className="underline-anim whitespace-nowrap text-slate-400 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-sm"
              >
                Forgot Password?
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-2">
              <button
                type="submit"
                onClick={spawnRipple}
                disabled={loading}
                className="glass-login group relative flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-semibold tracking-wide text-white sm:py-4 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                {ripples.map((r) => (
                  <motion.span
                    key={r.id}
                    initial={{ opacity: 0.5, scale: 0 }}
                    animate={{ opacity: 0, scale: 4 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    style={{ left: r.x, top: r.y }}
                    className="pointer-events-none absolute z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100"
                  />
                ))}
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-cyan-200" />
                      Logging In...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight className="h-4 w-4 text-cyan-200 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </motion.div>
          </form>

          <motion.div variants={fadeUp} className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Or Continue With
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center gap-4">
            <button
              aria-label="Continue with Google"
              className="social-btn google flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.02c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.12A12 12 0 0 0 12 24z" />
                <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.61H1.26a12 12 0 0 0 0 10.78z" />
                <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.61l4.01 3.12C6.22 6.88 8.87 4.77 12 4.77z" />
              </svg>
            </button>
            <button
              aria-label="Continue with Apple"
              className="social-btn apple flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#F1F5F9">
                <path d="M16.365 1.43c0 1.14-.462 2.15-1.213 2.9-.85.85-2.05 1.5-3.2 1.4-.14-1.1.44-2.24 1.19-2.98.85-.83 2.28-1.44 3.22-1.32zM20.5 17.34c-.55 1.26-.81 1.82-1.52 2.94-.99 1.55-2.39 3.49-4.12 3.5-1.54.02-1.94-1.01-4.03-1-2.1.01-2.53 1.02-4.07 1.01-1.73-.02-3.05-1.76-4.04-3.31C.14 16.62-.5 12 1.4 9.02c1.06-1.67 2.79-2.68 4.4-2.68 1.7 0 2.77 1.07 4.05 1.07 1.24 0 2.09-1.07 4.03-1.07 1.44 0 2.97.78 4.06 2.14-3.57 1.96-2.99 6.99.56 8.86z" />
              </svg>
            </button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-7 text-center text-[10px] tracking-[0.2em] text-slate-500"
          >
            © 2026 T.B.GIRWALKAR POLYTECHNIC • SMART CAMPUS
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default StudentLogin;