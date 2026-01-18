import axios from 'axios';

let API_URL = 'http://localhost:3000/api/chat';

export const setApiUrl = (url) => {
    // Ensure no trailing slash
    const cleanUrl = url.replace(/\/$/, "");
    API_URL = `${cleanUrl}/api/chat`; // Append /api/chat path
};

export const chatService = {
    startConversation: async () => {
        const response = await axios.post(`${API_URL}/start`);
        return response.data; // { conversationId, message }
    },

    sendMessage: async (conversationId, content) => {
        const response = await axios.post(`${API_URL}/message`, {
            conversationId,
            content,
        });
        return response.data; // { role: 'assistant', content: '...' }
    }
};
