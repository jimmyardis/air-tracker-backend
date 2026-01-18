import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/admin/leads', {
                headers: { 'Authorization': 'Bearer admin123' }
            });
            setLeads(res.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch leads. Are you authorized?');
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8">Loading Leads...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="admin-container" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px', color: '#2c3e50' }}>Admin Dashboard</h1>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <div className="stat-card" style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3>Total Leads</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{leads.length}</p>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                    <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                        <th style={{ padding: '15px' }}>ID</th>
                        <th style={{ padding: '15px' }}>Date</th>
                        <th style={{ padding: '15px' }}>Msgs</th>
                        <th style={{ padding: '15px' }}>Last Message</th>
                        <th style={{ padding: '15px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map(lead => (
                        <tr key={lead.id} style={{ borderTop: '1px solid #eee' }}>
                            <td style={{ padding: '15px' }}>{lead.id.substring(0, 8)}...</td>
                            <td style={{ padding: '15px' }}>{new Date(lead.startedAt).toLocaleDateString()}</td>
                            <td style={{ padding: '15px' }}>{lead.messageCount}</td>
                            <td style={{ padding: '15px', color: '#666' }}>{lead.lastMessage}</td>
                            <td style={{ padding: '15px' }}>
                                <Link to={`/admin/leads/${lead.id}`} style={{ color: '#3498db', textDecoration: 'none', fontWeight: '600' }}>
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
