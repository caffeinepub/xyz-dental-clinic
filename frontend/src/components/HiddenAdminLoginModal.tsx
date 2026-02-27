import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const ADMIN_USERNAME = '6352174912';
const ADMIN_PASSWORD = '63521';

interface HiddenAdminLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HiddenAdminLoginModal({ open, onOpenChange }: HiddenAdminLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 400));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'true');
      setLoading(false);
      onOpenChange(false);
      setUsername('');
      setPassword('');
      navigate({ to: '/admin/dashboard' });
    } else {
      setError('Invalid username or password. Please try again.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent style={{ maxWidth: '400px', background: '#fff', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '32px' }}>
        <DialogHeader>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(14,165,233,0.3)' }}>
              <span style={{ fontSize: '32px' }}>🦷</span>
            </div>
          </div>
          <DialogTitle style={{ textAlign: 'center', fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>
            Admin Access
          </DialogTitle>
          <DialogDescription style={{ textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
            Enter your credentials to access the admin dashboard.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1.5px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '15px',
                color: '#0f172a',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#0ea5e9')}
              onBlur={e => (e.currentTarget.style.borderColor = '#d1d5db')}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1.5px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '15px',
                color: '#0f172a',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#0ea5e9')}
              onBlur={e => (e.currentTarget.style.borderColor = '#d1d5db')}
            />
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', color: '#dc2626', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {loading ? (
              <>
                <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
