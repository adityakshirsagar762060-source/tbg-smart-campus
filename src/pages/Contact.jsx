import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 min-h-[80vh] flex flex-col justify-center">
            <div className="text-center mb-12">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]">
                    Get In Touch
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-wide">
                    Contact Our Campus
                </h2>
                <div className="h-1 w-16 bg-cyan-400 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <div className="bg-[#0b1524] border border-white/5 p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex flex-col gap-8">
                    <h3 className="text-2xl font-bold text-white">
                        Campus Info
                    </h3>

                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Address</p>
                            <p className="text-base text-slate-200 mt-1 leading-relaxed">
                                T.B. Girwalkar Polytechnic, Morewadi, Ambajogai, Beed, Maharashtra - 431517
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Email Us</p>
                            <p className="text-base text-cyan-400 mt-1 font-medium">
                                office@tbgpoly.ac.in
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Call Campus</p>
                            <p className="text-base text-slate-200 mt-1 font-medium">
                                +91 8806660279
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Working Hours</p>
                            <p className="text-base text-slate-200 mt-1">
                                Monday - Saturday: 10:00 AM - 05:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0b1524] border border-white/5 p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                    <h3 className="text-2xl font-bold text-white mb-6">
                        Send a Message
                    </h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-slate-400 font-medium">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-[#050b14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-slate-400 font-medium">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-[#050b14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-slate-400 font-medium">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-[#050b14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-slate-400 font-medium">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full p-3 bg-[#050b14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full p-3 mt-2 bg-transparent border border-cyan-400 rounded-xl text-cyan-400 text-base font-semibold hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;