import { usePlayer } from "@empirica/core/player/classic/react";
import React, { useState } from "react";

export function Introduction({ next }) {
    const player = usePlayer();
    const [confirmed, setConfirmed] = useState(false);

    const handleContinue = () => {
        if (!confirmed) return;
        player.set("consentGiven", true);
        player.set("consentTimestamp", new Date().toISOString());
        next();
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <p>You are taking part in a short study exploring how AI systems can support group decision-making. During this task:
                You will complete two decision problems as part of a group. Each discussion will last 10 minutes
                One of these discussions will be supported by an AI mediator, the other will not
                The information provided to you may not be the same as the information provided to your fellow participants, so please ensure you discuss and share your information and thoughts to reach the best conclusion.
                Using the system:
                You will be assigned a colour when you enter the chat system, please try to avoid revealing any personal information about yourself during the discussion.
                Please do not copy and paste information from your task information pane into the chat.
                All chat logs will be recorded and stored, all messages are anonymous.
                If, during your task with the AI mediator, you wish to call the mediator, you may do so by including the tag “@mediator” in your message.
                If you happen to finish your discussion before the 10 minutes is over, you may move on using the button marked, “”. Please only press this once you are sure you are all in agreement that you would like to move on. </p>
            <h1>Consent Form</h1>
            <p>Please complete the consent form below before continuing.</p>

            <iframe
                src="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=MH_ksn3NTkql2rGM8aQVG-tihBA1rupNjYA3OGj3xU1UNkpJMDhTRVJOUFBKNTIwN0hHRk9UTlFMRS4u"
                width="100%"
                height="600px"
                style={{ border: 'none', borderRadius: '8px', marginBottom: '1.5rem' }}
                title="Consent Form"
            />

            <div style={{ margin: '1rem 0', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={e => setConfirmed(e.target.checked)}
                        style={{ marginTop: '3px' }}
                    />
                    <span>I confirm I have completed and submitted the consent form above.</span>
                </label>
            </div>

            <button
                onClick={handleContinue}
                disabled={!confirmed}
                style={{
                    padding: '0.75rem 2rem',
                    background: confirmed ? '#1A3C5E' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: confirmed ? 'pointer' : 'not-allowed',
                    fontSize: '1rem'
                }}
            >
                Continue
            </button>
        </div>
    );
}
