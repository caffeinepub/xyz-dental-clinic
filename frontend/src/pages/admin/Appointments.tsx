import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllAppointments, useUpdateAppointmentStatus } from '../../hooks/useQueries';
import { AppointmentStatus } from '../../backend';

export default function Appointments() {
  const navigate = useNavigate();
  const { data: appointments, isLoading, error } = useGetAllAppointments();
  const updateStatus = useUpdateAppointmentStatus();
  const [filter, setFilter] = useState<string>('all');

  const filtered = appointments?.filter(a => filter === 'all' || a.status === filter) ?? [];

  const formatDate = (ts: bigint) => {
    try {
      return new Date(Number(ts) / 1_000_000).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  };

  const statusColors: Record<string, { bg: string; color: string }> = {
    pending: { bg: '#fffbeb', color: '#d97706' },
    confirmed: { bg: '#f0fdf4', color: '#16a34a' },
    completed: { bg: '#eff6ff', color: '#2563eb' },
    cancelled: { bg: '#fef2f2', color: '#dc2626' },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => navigate({ to: '/admin/dashboard' })}
          style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '18px' }}>📅 Appointments</div>
          <div style={{ color: '#94a3b8', fontSize: '12px' }}>All patient bookings</div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: filter === f ? '2px solid #0ea5e9' : '2px solid #e2e8f0',
                background: filter === f ? '#0ea5e9' : '#fff',
                color: filter === f ? '#fff' : '#64748b',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {isLoading && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
            Loading appointments...
          </div>
        )}

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '20px', color: '#dc2626', textAlign: 'center' }}>
            Failed to load appointments. Please ensure you are logged in as admin.
          </div>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
            <p>No appointments found.</p>
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '14px 20px' }}>
              {['Patient Name', 'Phone Number', 'Service', 'Date', 'Status'].map(h => (
                <div key={h} style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
              ))}
            </div>

            {/* Table Rows */}
            {filtered.map((appt, idx) => {
              const sc = statusColors[appt.status] || { bg: '#f8fafc', color: '#64748b' };
              return (
                <div
                  key={String(appt.id)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                    gap: '0',
                    padding: '16px 20px',
                    borderBottom: idx < filtered.length - 1 ? '1px solid #f1f5f9' : 'none',
                    alignItems: 'center',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>{appt.patientName}</div>
                  <div style={{ color: '#374151', fontSize: '14px' }}>{appt.contactInfo}</div>
                  <div style={{ color: '#374151', fontSize: '14px' }}>{appt.serviceType}</div>
                  <div style={{ color: '#374151', fontSize: '14px' }}>{formatDate(appt.preferredDate)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: sc.bg, color: sc.color, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>
                      {appt.status}
                    </span>
                    {appt.status === AppointmentStatus.pending && (
                      <button
                        onClick={() => updateStatus.mutate({ appointmentId: appt.id, newStatus: AppointmentStatus.confirmed })}
                        disabled={updateStatus.isPending}
                        style={{ background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '16px', textAlign: 'right' }}>
          Total: {filtered.length} appointment{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
