import React from 'react';

function Placement() {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#030712] px-4 py-24 text-white sm:px-6">
            <div className="ambient-bg" />

            <div className="relative z-10 mx-auto max-w-4xl">
                <h1 className="reveal is-visible mb-4 text-3xl font-black tracking-tight sm:text-4xl">
                    Placement Cell
                </h1>
                <p className="reveal is-visible mb-10 text-sm text-[color:var(--text-secondary)] sm:text-base">
                    Placement drives, recruiter details and student results will appear here.
                </p>

                <div className="glass card placement-empty reveal is-visible">
                    <p className="text-base font-semibold">Placement data coming soon</p>
                    <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                        This section will be updated once official placement records are shared.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Placement;