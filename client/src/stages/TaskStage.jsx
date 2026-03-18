import { usePlayer, useRound, useGame } from "@empirica/core/player/classic/react";
import { SCENARIO_TEXT } from "../scenarioContent";
import ReadyButton from "./SkipButton.jsx";

export function TaskStage() {
    const player = usePlayer();
    const round = useRound();
    const game = useGame();

    const scenarioOrder = game.get('scenarioOrder');
    const mediatorSequence = game.get('mediatorSequence');
    const roundIndex = round.get('index') ?? 0;

    console.log("scenarioOrder:", scenarioOrder);
    console.log("mediatorSequence:", mediatorSequence);
    console.log("roundIndex:", roundIndex);

    const scenario = scenarioOrder?.[roundIndex];
    const mediatorOn = mediatorSequence?.[roundIndex];
    const role = player.get('role') || 1;

    if (!scenario || !SCENARIO_TEXT[scenario]) {
        return <div>Loading... (scenario: {String(scenario)}, roundIndex: {String(roundIndex)})</div>;
    }

    const chatUrl = [
        'http://diss-chat-mas.s3-website.eu-north-1.amazonaws.com',
        '?participantID=' + player.id,
        '&groupID=' + game.id,
        '&scenario=' + scenario,
        '&mediator=' + (mediatorOn ? 'on' : 'off'),
        '&round=' + roundIndex
    ].join('');

    const content = SCENARIO_TEXT[scenario];
    const roleKey = 'role' + role;

    return (
        <div style={{display: 'flex', height: '90vh', gap: '12px', padding: '12px'}}>
            <div style={{width: '40%', overflowY: 'auto', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6'}}>
                <h2>Your Task Information</h2>
                <h3>Shared Information</h3>
                <p>{content.shared}</p>
                <h3>Your Private Information</h3>
                <p>{content[roleKey]}</p>
            </div>
            <div style={{width: '60%'}}>
                <iframe
                    src={chatUrl}
                    style={{width: '100%', height: '100%', border: 'none', borderRadius: '8px'}}
                    title='Discussion Chat'
                />
            </div>
            <ReadyButton />
        </div>
    );
}