import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { currentUser, updateAccount } = useAuth();
  
  // Initialize form state with current user data
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    password: '', 
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  
  if (!currentUser) {
    return <div className="text-center p-5 text-white">Loading or not logged in...</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    let fieldsToUpdate = { name: formData.name, email: formData.email };

    // Password Update Validation 
    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setError('New passwords do not match.');
        return;
      }
      if (formData.password.length < 6) {
        setError('New password must be at least 6 characters long.');
        return;
      }
      // Only include password in update object if it's being changed
      fieldsToUpdate.password = formData.password;
    }

    // Call the update function from AuthContext
    const result = updateAccount(currentUser.id, fieldsToUpdate);

    if (result.success) {
      setMessage('Account updated successfully!');
      // Clear password fields after successful update
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } else {
      setError(result.error || 'Failed to update account.');
    }
  };

  return (
    <div className="center-content">
      <div className="col-lg-6 col-md-9 col-sm-11">
        <div className="card custom-card-shadow bg-light border-0">
          <div className="card-header bg-info text-white text-center rounded-top-4">
            <h3 className="mb-0 fw-bold">Manage Your Account</h3>
            <p className="mb-0">Username: {currentUser.username}</p>
          </div>
          <div className="card-body p-4 p-md-5">
            {message && <div className="alert alert-success" role="alert">{message}</div>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <h5 className="mb-3 text-secondary">General Information</h5>
              <div className="row g-3">
                {/* Name Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                    <label htmlFor="name">Full Name</label>
                  </div>
                </div>
                {/* Email Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="email">Email address</label>
                  </div>
                </div>
              </div>

              <h5 className="mb-3 mt-4 text-secondary">Change Password (Optional)</h5>
              <div className="row g-3">
                {/* New Password Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="password" className="form-control" id="password" placeholder="New Password" value={formData.password} onChange={handleChange} />
                    <label htmlFor="password">New Password</label>
                    <div className="form-text">Leave blank to keep current password.</div>
                  </div>
                </div>
                {/* Confirm New Password Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                  </div>
                </div>
              </div>
              
              <div className="d-grid gap-2 mt-4">
                <button type="submit" className="btn btn-info btn-lg text-white">
                  Update Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;