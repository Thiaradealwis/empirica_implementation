import {useGame, usePlayers, useStage} from "@empirica/core/player/classic/react";
import { useState } from "react";

export default function ReadyButton({ player}) {
    const stage = useStage();
    const game = useGame();
    const players = usePlayers();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        if (!clicked) {
            setClicked(true);
            // mark this player as ready
            player.stage.set("submit", true);
        }
    };

    return (
        <button onClick={handleClick} disabled={clicked}>
            {clicked ? "Waiting for others..." : "Ready to Move On"}
        </button>
    );
}