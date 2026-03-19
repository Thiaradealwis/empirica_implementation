import React from "react";

export function TaskInstructions({ next }) {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', gap: '2em' }}>
            <h1>Task Instructions</h1>
            <p>You are taking part in a short study exploring how AI systems can support group decision-making. During this task:
                You will complete two decision problems as part of a group. Each discussion will last 10 minutes
                One of these discussions will be supported by an AI mediator, the other will not
                The information provided to you may not be the same as the information provided to your fellow participants, so please ensure you discuss and share your information and thoughts to reach the best conclusion.
                Using the system:
                You will be assigned a colour when you enter the chat system, please try to avoid revealing any personal information about yourself during the discussion.
                Please do not copy and paste information from your task information pane into the chat.
                All chat logs will be recorded and stored, all messages are anonymous.
                If, during your task with the AI mediator, you wish to call the mediator, you may do so by including the tag “@mediator” in your message.
                If you happen to finish your discussion before the 10 minutes is over, you may move on using the button marked, “”. Please only press this once you are sure you are all in agreement that you would like to move on.</p>
            {/* add your instructions here */}
            <button onClick={next} style={{ padding: '0.75rem 2rem', background: '#1A3C5E', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                I understand — Continue
            </button>
        </div>
    );
}