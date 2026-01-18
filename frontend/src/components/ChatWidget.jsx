import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader } from 'lucide-react';
import { chatService } from '../api/chatService';
import PhotoUpload from './PhotoUpload';
import FinancingFlow from './FinancingFlow';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen && !conversationId) {
            startChat();
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const startChat = async () => {
        setIsLoading(true);
        try {
            const { conversationId: id, message } = await chatService.startConversation();
            setConversationId(id);
            setMessages([{ role: 'assistant', content: message }]);
        } catch (error) {
            console.error("Failed to start chat", error);
            setMessages([{ role: 'assistant', content: "I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e, customContent = null) => {
        if (e) e.preventDefault();

        // Allow sending system messages (like "Photo Uploaded")
        const userMessage = customContent || inputValue.trim();
        if (!userMessage || !conversationId) return;

        if (!customContent) setInputValue('');

        // Optimistic update
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const response = await chatService.sendMessage(conversationId, userMessage);
            setMessages(prev => [...prev, response]);
        } catch (error) {
            console.error("Failed to send message", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I couldn't process that. Could you say it again?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to parse message content and strip tags
    const renderMessageContent = (content) => {
        // Check for tags
        const requestPhoto = content.includes('[REQUEST_PHOTO]');
        const offerFinance = content.includes('[OFFER_FINANCE]');

        // Clean content
        let cleanContent = content.replace('[REQUEST_PHOTO]', '').replace('[OFFER_FINANCE]', '').trim();

        return (
            <>
                <p>{cleanContent}</p>
                {requestPhoto && (
                    <PhotoUpload onComplete={(msg) => handleSendMessage(null, msg)} />
                )}
                {offerFinance && (
                    <FinancingFlow onComplete={(msg) => handleSendMessage(null, msg)} />
                )}
            </>
        );
    };

    return (
        <div className="chat-widget-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Virtual Care Coordinator</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                {msg.role === 'assistant' ? renderMessageContent(msg.content) : msg.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message assistant">
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <span style={{ animation: 'bounce 1s infinite 0s' }}>.</span>
                                    <span style={{ animation: 'bounce 1s infinite 0.2s' }}>.</span>
                                    <span style={{ animation: 'bounce 1s infinite 0.4s' }}>.</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input-area" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" className="send-btn" disabled={isLoading || !inputValue.trim()}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default ChatWidget;
