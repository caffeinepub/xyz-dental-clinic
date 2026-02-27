import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetClinicStatus, useSetClinicStatus } from '../../hooks/useQueries';
import { ClinicStatus } from '../../backend';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: clinicStatus, isLoading: statusLoading } = useGetClinicStatus();
  const setClinicStatus = useSetClinicStatus();

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate({ to: '/' });
  };

  const handleStatusChange = (status: ClinicStatus) => {
    setClinicStatus.mutate(status);
  };

  const navCards = [
    { title: 'Appointments', icon: '📅', desc: 'View and manage all patient bookings', path: '/admin/appointments', color: '#0ea5e9' },
    { title: 'Services CMS', icon: '⚙️', desc: 'Edit service text and photos', path: '/admin/services', color: '#8b5cf6' },
    { title: 'Reviews', icon: '⭐', desc: 'Approve or reject patient reviews', path: '/admin/reviews', color: '#f59e0b' },
    { title: 'Before & After', icon: '📸', desc: 'Manage gallery pairs', path: '/admin/before-after', color: '#10b981' },
    { title: 'Doctors', icon: '👨‍⚕️', desc: 'Add and manage doctors', path: '/admin/doctors', color: '#06b6d4' },
    { title: 'Content', icon: '📝', desc: 'Add patient reviews', path: '/admin/content', color: '#ec4899' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🦷</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '18px' }}>Admin Dashboard</div>
            <div style={{ color: '#94a3b8', fontSize: '12px' }}>XYZ Dental Clinic</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px 18px', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
        >
          Logout
        </button>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Clinic Status Toggle */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>🏥 Clinic Status</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Control the public-facing clinic open/closed status.</p>

          {statusLoading ? (
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>Loading status...</div>
          ) : (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { value: ClinicStatus.open, label: '✅ Open', color: '#10b981', bg: '#f0fdf4', border: '#86efac' },
                { value: ClinicStatus.closed, label: '🔴 Closed', color: '#ef4444', bg: '#fef2f2', border: '#fca5a5' },
                { value: ClinicStatus.emergency, label: '⚠️ Emergency', color: '#f59e0b', bg: '#fffbeb', border: '#fcd34d' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleStatusChange(opt.value)}
                  disabled={setClinicStatus.isPending}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: `2px solid ${clinicStatus === opt.value ? opt.color : '#e2e8f0'}`,
                    background: clinicStatus === opt.value ? opt.bg : '#fff',
                    color: clinicStatus === opt.value ? opt.color : '#64748b',
                    fontSize: '14px',
                    fontWeight: clinicStatus === opt.value ? 700 : 500,
                    cursor: setClinicStatus.isPending ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    opacity: setClinicStatus.isPending ? 0.7 : 1,
                  }}
                >
                  {opt.label}
                  {clinicStatus === opt.value && ' ✓'}
                </button>
              ))}
            </div>
          )}

          {setClinicStatus.isPending && (
            <p style={{ color: '#0ea5e9', fontSize: '13px', marginTop: '12px' }}>Updating status...</p>
          )}
        </div>

        {/* Navigation Cards */}
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>Quick Access</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {navCards.map(card => (
            <button
              key={card.title}
              onClick={() => navigate({ to: card.path })}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 32px rgba(0,0,0,0.1)`;
                (e.currentTarget as HTMLButtonElement).style.borderColor = card.color;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{card.icon}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>{card.title}</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>{card.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
