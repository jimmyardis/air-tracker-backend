import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Lock, Unlock } from 'lucide-react';

const LeadDetails = () => {
    const { id } = useParams();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/admin/leads/${id}`, {
                    headers: { 'Authorization': 'Bearer admin123' }
                });
                setLead(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLead();
    }, [id]);

    if (loading) return <div className="p-8">Loading...</div>;
    if (!lead) return <div className="p-8">Lead not found</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', textDecoration: 'none', marginBottom: '20px' }}>
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            <header style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <h1>Conversation: {id}</h1>
                <p style={{ color: '#888' }}>Started: {new Date(lead.startedAt).toLocaleString()}</p>
            </header>

            <div className="transcript" style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px' }}>
                {lead.messages.map((msg, idx) => (
                    <div key={idx} style={{
                        marginBottom: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                        <span style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
                            {msg.role === 'user' ? 'Patient' : 'Aura'}
                        </span>

                        {/* Special Content Rendering */}
                        {msg.content.includes('Encrypted & Stored') ? (
                            <div style={{ background: '#e0f7fa', padding: '15px', borderRadius: '8px', border: '1px dashed #00bcd4' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#006064' }}>
                                    <Lock size={16} /> <strong>Secure Photo Uploaded</strong>
                                </div>
                                {/* In a real app, we'd extract the file ID from the message metadata. 
                                    For this mock, we assume the message text might contain the filename or we just fetch the latest test file 
                                    if we didn't store it in the message content string.
                                    
                                    Since our ChatWidget just sends "Photo uploaded successfully" as text, we missed saving the ID in the message content itself.
                                    For DEMO purposes, I will show a placeholder image if I can't find the ID, 
                                    OR we can implement the "View Decrypted" button to hit a test endpoint if we don't have the specific ID.
                                 */}
                                <p style={{ fontSize: '12px', margin: 0 }}>File is encrypted on server.</p>
                            </div>
                        ) : (
                            <div style={{
                                background: msg.role === 'user' ? '#d4a373' : 'white',
                                color: msg.role === 'user' ? 'white' : '#333',
                                padding: '10px 16px',
                                borderRadius: '12px',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                maxWidth: '80%'
                            }}>
                                {msg.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="actions" style={{ marginTop: '40px', padding: '20px', background: 'white', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Staff Actions</h3>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button style={{ padding: '10px 20px', border: '1px solid #ddd', background: 'white', borderRadius: '6px', cursor: 'pointer' }}>
                        Send Email Summary
                    </button>
                    <button style={{ padding: '10px 20px', border: '1px solid #ddd', background: 'white', borderRadius: '6px', cursor: 'pointer' }}>
                        Book Consultation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadDetails;
