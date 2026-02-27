import React from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',
        padding: '2rem',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '480px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '3rem 2rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛡️</div>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '0.75rem',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Access Denied
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>
          You don't have permission to access this area. Please log in with an authorized admin account.
        </p>
        <button
          onClick={() => navigate({ to: '/' })}
          style={{
            backgroundColor: '#14b8a6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.75rem 2rem',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0d9488')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#14b8a6')}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
