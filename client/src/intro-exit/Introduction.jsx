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
