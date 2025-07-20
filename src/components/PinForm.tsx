import React, { useState } from 'react';
import { PinFormData } from '../types';
import './PinForm.css';

interface PinFormProps {
  isOpen: boolean;
  onSubmit: (data: PinFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const PinForm: React.FC<PinFormProps> = ({ isOpen, onSubmit, onCancel, loading = false }) => {
  const [remarks, setRemarks] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ remarks });
    setRemarks('');
  };

  const handleCancel = () => {
    setRemarks('');
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="pin-form-overlay">
      <div className="pin-form-modal">
        <h3>Add Pin</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="remarks">Remarks (optional):</label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter any remarks about this location..."
              rows={3}
              disabled={loading}
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Saving...' : 'Save Pin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PinForm; 