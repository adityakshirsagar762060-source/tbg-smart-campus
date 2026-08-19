import React, { useState } from "react";
import Footer from "../Components/Footer";

function About() {
  const [isHovered, setIsHovered] = useState(false);

  // Yahan normal aur hover dono alag-alag photos set kar di gayi hain!
  const profileImgNormal = "/aditya-profile.png";
  const profileImgHover = "/aditya-profile-back.png"; // Agar naam thoda alag ho toh yahan change kar lena

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden text-white bg-[#050b14]">
      <div className="flex-grow relative z-10 w-full px-6 sm:px-10 pt-28 pb-16 flex flex-col justify-center">

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <span className="text-cyan-300 font-medium tracking-widest uppercase text-xs bg-cyan-950/70 px-4 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              Portfolio & Profile
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              I'm <br />
              <span className="inline-block bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 bg-clip-text text-transparent pb-2 drop-shadow-[0_0_35px_rgba(34,211,238,0.5)]">
                Aditya Kshirsagar
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 font-semibold tracking-wide">
              MERN Stack Developer <span className="text-cyan-400">•</span> T.B.G. Polytechnic, Ambajogai
            </p>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl border-l-4 border-cyan-400 pl-4 py-3 bg-gradient-to-r from-cyan-500/[0.08] to-transparent rounded-r-2xl backdrop-blur-xl border-t border-r border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              Passionate Diploma Engineering student specializing in MERN Stack development (MongoDB, Express.js, React.js, Node.js). Dedicated to building high-performance, modern web applications with clean architecture and scalable code.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#dashboard"
                className="relative group overflow-hidden bg-white/[0.04] hover:bg-white/[0.08] text-cyan-300 font-extrabold px-8 py-3.5 rounded-xl border border-cyan-500/30 transition-all duration-500 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-105 active:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10">View Dashboard</span>
              </a>
              <a
                href="#library"
                className="relative group overflow-hidden bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold px-8 py-3.5 rounded-xl border border-white/10 transition-all duration-500 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10">Explore Library</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center relative mt-10 lg:mt-0">
            <div className="absolute w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-indigo-600/25 rounded-full blur-3xl pointer-events-none"></div>

            <div
              className="relative w-full max-w-lg cursor-pointer flex justify-center group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={isHovered ? profileImgHover : profileImgNormal}
                alt="Aditya Kshirsagar"
                className="w-full h-[500px] sm:h-[650px] object-contain object-bottom drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)] transition-all duration-500 transform group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
          <div className="bg-gradient-to-br from-cyan-950/30 via-[#08111f]/60 to-blue-950/30 p-8 rounded-3xl border border-cyan-500/20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xl font-bold mb-3 text-cyan-300 tracking-wide">About T.B.G. Polytechnic</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Located in Ambajogai, T.B.G. Polytechnic is a premier institute fostering technical excellence, practical learning, and futuristic engineering skills among students.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-950/30 via-[#08111f]/60 to-indigo-950/30 p-8 rounded-3xl border border-blue-500/20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xl font-bold mb-3 text-blue-300 tracking-wide">Core Expertise</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Specialized in MongoDB, Express.js, React.js, Node.js, Tailwind CSS, and building robust, database-driven campus management web applications.
            </p>
          </div>
        </div>

      </div>

      <Footer />

    </div>
  );
}

export default About;