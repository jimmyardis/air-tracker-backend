import React, { useState } from 'react';
import { DollarSign, Check } from 'lucide-react';

const FinancingFlow = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        income: '',
        credit: 'good'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API check lag
        setStep(2);
        setTimeout(() => {
            setStep(3);
        }, 1500);
    };

    if (step === 2) {
        return (
            <div className="secure-widget">
                <p>Checking eligibility...</p>
                <div className="loader-line"></div>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div className="secure-widget success">
                <DollarSign size={32} color="#d4a373" />
                <h3>You're Pre-Qualified!</h3>
                <p>0% APR options available.</p>
                <button className="action-btn text-sm" onClick={() => onComplete("I verified my financing eligibility.")}>
                    Continue Chat
                </button>
            </div>
        );
    }

    return (
        <div className="secure-widget">
            <div className="secure-header">
                <DollarSign size={16} />
                <span>Soft Credit Check (No Impact)</span>
            </div>

            <form onSubmit={handleSubmit} className="finance-form">
                <label>
                    Est. Monthly Income
                    <select
                        value={formData.income}
                        onChange={e => setFormData({ ...formData, income: e.target.value })}
                        required
                    >
                        <option value="">Select...</option>
                        <option value="2000-4000">$2k - $4k</option>
                        <option value="4000-8000">$4k - $8k</option>
                        <option value="8000+">$8k+</option>
                    </select>
                </label>

                <label>
                    Credit Estimate
                    <select
                        value={formData.credit}
                        onChange={e => setFormData({ ...formData, credit: e.target.value })}
                    >
                        <option value="excellent">Excellent (720+)</option>
                        <option value="good">Good (640-719)</option>
                        <option value="fair">Fair (580-639)</option>
                    </select>
                </label>

                <button type="submit" className="action-btn">Check Options</button>
            </form>
        </div>
    );
};

export default FinancingFlow;
