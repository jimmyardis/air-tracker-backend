import React, { useState } from 'react';
import { Upload, Lock, CheckCircle, Shield } from 'lucide-react';
import axios from 'axios';

const PhotoUpload = ({ onComplete }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('photo', file);

        try {
            // In production, use the configured API_URL
            await axios.post('http://localhost:3000/api/photos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            setTimeout(() => {
                onComplete("Photo uploaded successfully.");
            }, 2000);
        } catch (err) {
            console.error(err);
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    if (success) {
        return (
            <div className="secure-widget success">
                <CheckCircle size={32} color="#10B981" />
                <p>Photo Encrypted & Stored</p>
            </div>
        );
    }

    return (
        <div className="secure-widget">
            <div className="secure-header">
                <Shield size={16} />
                <span>HIPAA Secure Upload</span>
            </div>

            {!file ? (
                <label className="drop-zone">
                    <Upload size={24} />
                    <span>Tap to Select Photo</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                </label>
            ) : (
                <div className="file-preview">
                    <p>{file.name}</p>
                    <button
                        className="action-btn"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading ? 'Encrypting...' : 'Secure Send'} <Lock size={14} />
                    </button>
                </div>
            )}

            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default PhotoUpload;
