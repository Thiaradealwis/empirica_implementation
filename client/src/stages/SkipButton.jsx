import { useGame, useStage } from "@empirica/core/react";
import { useState } from "react";

export default function ReadyButton({ player }) {
    const stage = useStage();
    const game = useGame();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        if (!clicked) {
            setClicked(true);
            // mark this player as ready
            player.set("readyToNextStage", true);
        }
    };

    // check if everyone is ready
    const allReady = game.players.every(p => p.get("readyToNextStage"));

    // optionally auto-end stage if everyone ready
    if (allReady && stage.isActive) {
        stage.end();
    }

    return (
        <button onClick={handleClick} disabled={clicked}>
            {clicked ? "Waiting for others..." : "Ready to Move On"}
        </button>
    );
}