import React from "react";

export function TaskInstructions({ next }) {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h1>Task Instructions</h1>
            <p>You are about to take part in a group discussion task...</p>
            {/* add your instructions here */}
            <button onClick={next} style={{ padding: '0.75rem 2rem', background: '#1A3C5E', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                I understand — Continue
            </button>
        </div>
    );
}