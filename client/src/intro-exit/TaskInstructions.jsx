import React from "react";

export function TaskInstructions({ next }) {
    return (
        <div style={{
            maxWidth: '650px',
            margin: '0 auto',
            padding: '2rem',
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontFamily: 'sans-serif',
            lineHeight: '1.6'
        }}>
            <h1 style={{marginBottom: '1.5rem', color: '#1A3C5E'}}>
                Task Instructions
            </h1>

            <p style={{marginBottom: '1rem'}}>
                You are taking part in a short study exploring how AI systems can support group decision-making.
            </p>

            <div style={{marginBottom: '1.5rem'}}>
                <p>You will complete two decision problems as part of a group. Each discussion will last 10 minutes</p>
                <p>One of these discussions will be supported by an AI mediator, the other will not</p>
                <p>The information provided to you may not be the same as the information provided to your fellow
                    participants, so please ensure you discuss and share your information and thoughts to reach the best
                    conclusion.</p>
            </div>

            <div style={{marginBottom: '1.5rem'}}>
                <p><strong>Using the system:</strong></p>
                <p>You will be assigned a colour when you enter the chat system, please try to avoid revealing any
                    personal information about yourself during the discussion.</p>
                <p><strong>Please do not copy and paste </strong>information from your task information pane into the
                    chat.</p>
                <br></br>
                <p>All chat logs will be recorded and stored, all messages are <strong>anonymous</strong>.</p>
                <p>If, during your task with the AI mediator, you wish to call the mediator, you may do so by including
                    the tag <strong>“@mediator”</strong> in your message.</p>
                <br></br>
                <p>If you happen to finish your discussion before the 20 minutes is over, you may move on using the
                    button marked, “Ready to Move On”. Please only press this once you are sure you are all in agreement that you would
                    like to move on.</p>
            </div>

            <div style={{textAlign: 'center', marginTop: '2rem'}}>
                <button
                    onClick={next}
                    style={{
                        padding: '0.8rem 2.5rem',
                        background: '#1A3C5E',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500'
                    }}
                >
                    I understand — Continue
                </button>
            </div>
        </div>
    );
}