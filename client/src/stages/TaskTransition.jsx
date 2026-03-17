import { usePlayer, useGame } from "@empirica/core/player/classic/react";
import React from "react";

export function TaskTransition({ }) {
    const game = useGame();
    const scenarioOrder = game.get('scenarioOrder');

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h1>Round 1 Complete</h1>
            <p>Well done — you have completed the first discussion.</p>
            <h2>Next Task</h2>
            <p>You are about to begin the second discussion. This time the scenario will be different...</p>
            {/* add whatever info you want here */}
            <p style={{ color: '#666', fontStyle: 'italic' }}>
                The next round will begin automatically in a moment.
            </p>
        </div>
    );
}