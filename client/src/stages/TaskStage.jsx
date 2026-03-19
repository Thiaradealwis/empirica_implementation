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
    console.log(scenario);

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
        <div style={{width: '90%', display: 'flex', height: '90vh', gap: '5px', padding: '12px'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1em',width: '40%', overflowY: 'auto', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6'}}>
                {mediatorOn ? (<h2>During this discussion you will have access to a mediator who may intervene at any point. If you wish to talk to the mediator directly please include '@mediator' in your message</h2>)
                :
                    (<h2>During this discussion there will be no mediator present. Please carry out the task as below.</h2>)}
                <h2>Your Task Information</h2>
                <p style={{ whiteSpace: 'pre-wrap' }}>{content.shared}</p>
                <p style={{ whiteSpace: 'pre-wrap' }}>{content[roleKey]}</p>
            </div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{width: '100%', height: '95%'}}>
                    <iframe
                        src={chatUrl}
                        style={{width: '100%', height: '100%', border: 'none', borderRadius: '8px'}}
                        title='Discussion Chat'
                    />
                </div>
                <ReadyButton player={player} />
            </div>
        </div>
    );
}