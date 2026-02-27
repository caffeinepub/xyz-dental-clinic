import React, { ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface AdminGuardProps {
  children: ReactNode;
}

// Check if admin is logged in via hardcoded credentials stored in sessionStorage
function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem('adminAuth') === 'true';
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const navigate = useNavigate();

  if (!isAdminAuthenticated()) {
    // Redirect to home if not authenticated
    setTimeout(() => navigate({ to: '/' }), 0);
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <h2 style={{ color: '#0f172a', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Access Denied</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Please log in as admin to access this area.</p>
          <button
            onClick={() => navigate({ to: '/' })}
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', color: '#fff', border: 'none', borderRadius: '25px', padding: '12px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
