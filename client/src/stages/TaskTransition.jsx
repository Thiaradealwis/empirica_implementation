import { usePlayer, useGame } from "@empirica/core/player/classic/react";
import React from "react";

export function TaskTransition({ }) {
    const game = useGame();
    const scenarioOrder = game.get('scenarioOrder');

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h1>Round 1 Complete</h1>
            <p>Thank you for completing the first task.</p>
            <h2>Next Task</h2>
            <p>The second task will begin shortly. This time the scenario will be different...</p>
            {/* add whatever info you want here */}
            <p style={{ color: '#666', fontStyle: 'italic' }}>
                The next round will begin automatically in a moment.
            </p>
        </div>
    );
}