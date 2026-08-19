import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Placement from "./pages/Placement";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import CollegeDetails from "./Components/CollegeDetails";
import Contact from "./pages/Contact";
import RaiseComplaint from "./pages/RaiseComplaint";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#050b14] text-white overflow-x-hidden">
        <Navbar />
        <main className="w-full relative z-10 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/raise-complaint" element={<RaiseComplaint />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              }
            />
            <Route
              path="/college-details"
              element={
                <ProtectedRoute>
                  <div style={{ scrollBehavior: 'smooth' }}>
                    <div id="college-details" className="pt-20">
                      <CollegeDetails />
                    </div>
                    <div id="placements" className="pt-20">
                      <Placement />
                    </div>
                    <div id="dashboard" className="pt-20">
                      <Dashboard />
                    </div>
                    <div id="library" className="pt-20">
                      <Library />
                    </div>
                    <div id="contact" className="pt-20">
                      <Contact />
                    </div>
                    <div id="about" className="pt-20">
                      <About />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/placements"
              element={
                <ProtectedRoute>
                  <Placement />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;