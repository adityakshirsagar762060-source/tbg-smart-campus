import React, { useState, useEffect } from "react";

function Library() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYearFilter, setSelectedYearFilter] = useState("All");
  const [modalResource, setModalResource] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const resources = {
    "1st Year": [
      { title: "English", code: "311301" },
      { title: "Basic Science", code: "311302" },
      { title: "Basic Mathematics", code: "311303" },
      { title: "Applied Mathematics", code: "312301" },
      { title: "Engineering Graphics", code: "312302" },
      { title: "Workshop Practice", code: "312303" },
    ],
    "2nd Year": [
      { title: "Data Structures", code: "313301" },
      { title: "Computer Architecture & Maintenance", code: "313302" },
      { title: "Java Programming", code: "313303" },
      { title: "VB.NET", code: "313304" },
      { title: "Database Management System", code: "314301" },
      { title: "Data Communication & Networking", code: "314302" },
      { title: "Python Programming", code: "314303" },
      { title: "Software Engineering", code: "314304" },
    ],
    "3rd Year": [
      { title: "Operating System", code: "315319" },
      { title: "Advance Computer Network", code: "315321" },
      { title: "Software Testing", code: "315323" },
      { title: "Cloud Computing", code: "315325" },
      { title: "Data Analytics", code: "315326" },
      { title: "Management", code: "316301" },
      { title: "Emerging Trends in Computer & IT", code: "316302" },
    ],
  };

  const allSubjects = Object.values(resources).flat();
  const totalSubjects = allSubjects.length;
  const filteredResources = selectedYearFilter === "All"
    ? resources
    : { [selectedYearFilter]: resources[selectedYearFilter] };

  const displayedSubjectCount = selectedYearFilter === "All"
    ? totalSubjects
    : resources[selectedYearFilter].length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050b14] px-4 py-20 text-white sm:px-6 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(15,28,48,0.4)_0%,rgba(5,11,20,0.85)_65%,#050b14_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-950/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-4">
            <span className="bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Digital Library
            </span>
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent mt-2 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
              Resource Hub
            </span>
          </h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto font-light">
            Explore curated academic materials, syllabus codes, and essential study resources for Diploma Computer Engineering.
          </p>
        </div>

        <div className="mb-12 sticky top-24 z-20">
          <div className="backdrop-blur-2xl bg-[#08111f]/80 border border-white/10 rounded-3xl p-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-grow">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-400/70">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input
                type="text"
                placeholder="Search subject name or code (e.g., Java, 313303)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-sm backdrop-blur-xl shadow-inner"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto justify-center p-1 bg-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-xl">
              {["All", "1st Year", "2nd Year", "3rd Year"].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYearFilter(yr)}
                  className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ease-out w-full md:w-auto cursor-pointer ${selectedYearFilter === yr
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-[1.02]"
                    : "text-gray-300 hover:bg-white/10 hover:text-white active:scale-95"
                    }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 text-right">
          <span className="text-xs text-cyan-300 font-mono bg-[#08111f]/60 px-5 py-2 rounded-full border border-white/10 backdrop-blur-xl shadow-[0_4px_16px_0_rgba(0,0,0,0.3)]">
            Displaying {displayedSubjectCount} of {totalSubjects} Subjects
          </span>
        </div>

        <div className="space-y-16">
          {Object.keys(filteredResources).map((year) => {
            const filteredSubjects = resources[year].filter(
              (res) =>
                res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                res.code.includes(searchQuery)
            );

            if (filteredSubjects.length === 0) return null;

            return (
              <div key={year}>
                <div className="mb-8 flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-cyan-300 tracking-tight whitespace-nowrap drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    {year}
                  </h2>
                  <div className="flex-grow h-px bg-gradient-to-r from-cyan-500/40 via-white/10 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredSubjects.map((res) => (
                    <div
                      key={res.code}
                      className="group relative bg-[#08111f]/55 p-6 rounded-3xl border border-white/10 backdrop-blur-2xl transition-all duration-500 ease-out overflow-hidden hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_10px_40px_rgba(34,211,238,0.15)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                    >
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_-50%,rgba(34,211,238,0.15),transparent_70%)]" />

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#08111f]/80 text-cyan-300 border border-white/10 backdrop-blur-xl shadow-sm">
                            {res.code}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-300 bg-[#08111f]/80 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xl shadow-sm">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                            </span>
                            Available
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-100 mb-8 leading-tight flex-grow group-hover:text-cyan-200 transition-colors duration-300 drop-shadow-sm">
                          {res.title}
                        </h3>

                        <button
                          onClick={() => setModalResource(res)}
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.03] text-cyan-300 font-semibold text-sm transition-all duration-300 ease-out border border-white/10 backdrop-blur-xl group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.98] cursor-pointer shadow-md"
                        >
                          Get Resources
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {(!Object.keys(filteredResources).length || Object.values(filteredResources).flat().length === 0) && (
          <div className="text-center py-24 px-6 border border-white/10 rounded-3xl bg-[#08111f]/60 backdrop-blur-2xl mt-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-xl font-medium text-gray-200 mb-2">No resources found</h3>
            <p className="text-gray-400">Your search for "{searchQuery}" didn't match any subjects in {selectedYearFilter}.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedYearFilter("All"); }}
              className="mt-8 px-6 py-2.5 bg-white/[0.05] text-cyan-300 rounded-xl text-sm font-medium border border-white/10 hover:bg-white/10 backdrop-blur-xl transition-all cursor-pointer shadow-lg"
            >
              Clear Search & Filters
            </button>
          </div>
        )}
      </div>

      {modalResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl cursor-pointer"
            onClick={() => setModalResource(null)}
          />
          <div className="relative bg-[#08111f]/90 border border-white/15 rounded-3xl max-w-lg w-full p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl z-10">
            <button
              onClick={() => setModalResource(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#08111f] text-cyan-300 border border-white/10 backdrop-blur-xl">
                {modalResource.code}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
              {modalResource.title}
            </h3>
            <p className="text-gray-300 mb-8 text-sm leading-relaxed">
              Access available study materials for <span className="font-semibold text-cyan-300">{modalResource.title}</span>. Click on the options below to download or view files.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => alert(`Downloading Notes for ${modalResource.title}`)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#08111f]/60 border border-white/10 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 text-cyan-300 font-semibold text-sm transition-all duration-300 group backdrop-blur-xl cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  <span>Download Lecture Notes</span>
                </div>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>

              <button
                onClick={() => alert(`Downloading Question Papers for ${modalResource.title}`)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#08111f]/60 border border-white/10 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 text-cyan-300 font-semibold text-sm transition-all duration-300 group backdrop-blur-xl cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                  <span>Previous Year Papers</span>
                </div>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>

              <button
                onClick={() => alert(`Opening Syllabus for ${modalResource.title}`)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#08111f]/60 border border-white/10 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 text-cyan-300 font-semibold text-sm transition-all duration-300 group backdrop-blur-xl cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  <span>Official Syllabus Copy</span>
                </div>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;