import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { isAdminAuthenticated } from '../../components/AdminGuard';
import { useGetAllAppointments, useUpdateAppointmentStatus } from '../../hooks/useQueries';
import { AppointmentStatus } from '../../backend';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function Appointments() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');

  // Hooks must be called unconditionally — before any early return
  const { data: appointments = [], isLoading, refetch } = useGetAllAppointments(5000);
  const updateStatus = useUpdateAppointmentStatus();

  if (!isAdminAuthenticated()) {
    navigate({ to: '/' });
    return null;
  }

  const filtered =
    filter === 'all'
      ? appointments
      : appointments.filter((a) => a.status === filter);

  const statusColors: Record<string, string> = {
    pending: '#f59e0b',
    confirmed: '#0d9488',
    completed: '#10b981',
    cancelled: '#ef4444',
  };

  const formatDate = (ns: bigint) => {
    const ms = Number(ns) / 1_000_000;
    return new Date(ms).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Header */}
      <div
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => navigate({ to: '/admin' })}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 style={{ color: '#1a1a1a', fontWeight: 800, fontSize: '1.3rem', margin: 0 }}>
            Appointments
          </h1>
          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
                display: 'inline-block',
                animation: 'pulse-live 1.5s ease-in-out infinite',
              }}
            />
            <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 600 }}>LIVE</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #d1d5db',
                color: '#1a1a1a',
                borderRadius: '8px',
                width: '160px',
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: '#FFFFFF', color: '#1a1a1a' }}>
              <SelectItem value="all" style={{ color: '#1a1a1a' }}>All</SelectItem>
              <SelectItem value="pending" style={{ color: '#1a1a1a' }}>Pending</SelectItem>
              <SelectItem value="confirmed" style={{ color: '#1a1a1a' }}>Confirmed</SelectItem>
              <SelectItem value="completed" style={{ color: '#1a1a1a' }}>Completed</SelectItem>
              <SelectItem value="cancelled" style={{ color: '#1a1a1a' }}>Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => refetch()}
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #d1d5db',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              color: '#6b7280',
            }}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            Loading appointments...
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '60px',
              textAlign: 'center',
              color: '#6b7280',
              border: '1px solid #e5e7eb',
            }}
          >
            No appointments found.
          </div>
        ) : (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              border: '1px solid #e5e7eb',
            }}
          >
            <Table>
              <TableHeader>
                <TableRow style={{ background: '#f8fafc' }}>
                  <TableHead style={{ color: '#1a1a1a', fontWeight: 700 }}>ID</TableHead>
                  <TableHead style={{ color: '#1a1a1a', fontWeight: 700 }}>Patient</TableHead>
                  <TableHead style={{ color: '#1a1a1a', fontWeight: 700 }}>Contact</TableHead>
                  <TableHead style={{ color: '#1a1a1a', fontWeight: 700 }}>Service</TableHead>
                  <TableHead style={{ color: '#1a1a1a', fontWeight: 700 }}>Date</TableHead>
                  <TableHead style={{ color: '#1a1a1a', fontWeight: 700 }}>Status</TableHead>
                  <TableHead style={{ color: '#1a1a1a', fontWeight: 700 }}>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((appt) => (
                  <TableRow key={String(appt.id)} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <TableCell style={{ color: '#374151', fontWeight: 600 }}>
                      #{String(appt.id)}
                    </TableCell>
                    <TableCell style={{ color: '#1a1a1a', fontWeight: 600 }}>
                      {appt.patientName}
                    </TableCell>
                    <TableCell style={{ color: '#374151' }}>{appt.contactInfo}</TableCell>
                    <TableCell style={{ color: '#374151' }}>{appt.serviceType}</TableCell>
                    <TableCell style={{ color: '#374151' }}>
                      {formatDate(appt.preferredDate)}
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          background: `${statusColors[appt.status] ?? '#6b7280'}20`,
                          color: statusColors[appt.status] ?? '#6b7280',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          textTransform: 'capitalize',
                        }}
                      >
                        {appt.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={appt.status}
                        onValueChange={(val) =>
                          updateStatus.mutate({
                            appointmentId: appt.id,
                            newStatus: val as AppointmentStatus,
                          })
                        }
                      >
                        <SelectTrigger
                          style={{
                            background: '#FFFFFF',
                            border: '1.5px solid #d1d5db',
                            color: '#1a1a1a',
                            borderRadius: '8px',
                            width: '140px',
                            fontSize: '0.85rem',
                          }}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent style={{ background: '#FFFFFF', color: '#1a1a1a' }}>
                          <SelectItem value="pending" style={{ color: '#1a1a1a' }}>Pending</SelectItem>
                          <SelectItem value="confirmed" style={{ color: '#1a1a1a' }}>Confirmed</SelectItem>
                          <SelectItem value="completed" style={{ color: '#1a1a1a' }}>Completed</SelectItem>
                          <SelectItem value="cancelled" style={{ color: '#1a1a1a' }}>Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse-live {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
