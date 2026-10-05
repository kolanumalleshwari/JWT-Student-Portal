import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#dc2626' }}>
            <div style={{ background: '#fef2f2', padding: '0.6rem', borderRadius: '50%', border: '1px solid #fecaca' }}>
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a' }}>{title || 'Confirm Action'}</h3>
          </div>
          <button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: '1.5' }}>
          {message || 'Are you sure you want to proceed with this action? This step cannot be undone.'}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={onCancel} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Delete Student'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
