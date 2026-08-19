import React from "react";
import myPhoto from "../assets/my-clg.png";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/10 bg-[#050b14] pt-12 pb-6 mt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-16 w-16 shrink-0 flex items-center justify-center">
                                <img src={myPhoto} alt="Logo" className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 tracking-widest">
                                    T.B.G. POLYTECHNIC
                                </h2>
                                <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/80 mt-1 font-semibold">
                                    Ambajogai
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                            Empowering students with quality technical education, modern infrastructure, and industry-ready skills since 1983.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <div className="h-0.5 w-10 bg-cyan-400 rounded-full mb-4" />
                        <ul className="flex flex-col gap-3">
                            {['Home', 'College Details', 'Placement', 'Contact', 'About Me'].map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <span className="h-1 w-1 bg-cyan-400 rounded-full" />
                                    <span className="text-sm text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors duration-300">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Admission & Contact</h3>
                        <div className="h-0.5 w-10 bg-cyan-400 rounded-full mb-4" />
                        <ul className="flex flex-col gap-3 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-400 text-lg leading-none">📍</span>
                                <span>T.B. Girwalkar Polytechnic, Ambajogai, Maharashtra</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-cyan-400 text-lg leading-none">✉️</span>
                                <span>principaltbgpamb@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-cyan-400 text-lg leading-none">🌐</span>
                                <span>http://www.tbgpoly.ac.in</span>
                            </li>
                            <li className="flex flex-col gap-2 mt-2 pt-3 border-t border-white/10">
                                <span className="text-white font-semibold">Admission Contacts:</span>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <span>📞 9860768165</span>
                                    <span>📞 8087564633</span>
                                    <span>📞 8806662545</span>
                                    <span>📞 9403776528</span>
                                    <span>📞 9422330192</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 mt-2 text-cyan-300 font-medium bg-cyan-950/30 p-3 rounded-lg border border-cyan-900/50">
                                <span className="text-2xl leading-none">👨‍🏫</span>
                                <div className="flex flex-col">
                                    <span>Principal: Prof. L.V. Bagale</span>
                                    <span>📞 8806660279</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p> {currentYear} T.B. Girwalkar Polytechnic. </p>
                    <p>Designed & Developed by <span className="text-cyan-400 font-semibold text-sm">Aditya Kshirsagar</span></p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;