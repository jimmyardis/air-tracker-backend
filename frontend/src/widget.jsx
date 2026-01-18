import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './components/ChatWidget';
import { setApiUrl } from './api/chatService';
import './index.css';

// Default ID
const DEFAULT_CONTAINER_ID = 'med-concierge-chat-widget';

function mountWidget(config = {}) {
    const containerId = config.containerId || DEFAULT_CONTAINER_ID;

    if (config.apiUrl) {
        setApiUrl(config.apiUrl);
    }

    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);
    }

    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <ChatWidget />
        </React.StrictMode>
    );
}

// Expose to window
window.MedBot = {
    init: (config) => {
        mountWidget(config);
    }
};

// Also auto-mount if a default container exists (for dev/testing)
// or if we want legacy behavior
if (document.getElementById(DEFAULT_CONTAINER_ID)) {
    mountWidget();
}
