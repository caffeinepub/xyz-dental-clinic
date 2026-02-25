import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useGetClinicStatus,
  useSetClinicStatus,
  useGetAllAppointments,
} from '@/hooks/useQueries';
import { ClinicStatus } from '../../backend';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: clinicStatus, isLoading: statusLoading } = useGetClinicStatus();
  const { mutate: setClinicStatus, isPending: settingStatus } = useSetClinicStatus();
  const { data: appointments, isLoading: appointmentsLoading } = useGetAllAppointments({
    refetchInterval: 30000,
  });

  const isOpen = clinicStatus === ClinicStatus.open;
  const isEmergency = clinicStatus === ClinicStatus.emergency;

  const handleMainToggle = (checked: boolean) => {
    const newStatus = checked ? ClinicStatus.open : ClinicStatus.closed;
    setClinicStatus(newStatus, {
      onSuccess: () => {
        toast.success(`Clinic is now ${checked ? 'Open' : 'Closed'}`);
      },
      onError: () => {
        toast.error('Failed to update clinic status');
      },
    });
  };

  const handleEmergencyToggle = (checked: boolean) => {
    const newStatus = checked ? ClinicStatus.emergency : ClinicStatus.open;
    setClinicStatus(newStatus, {
      onSuccess: () => {
        toast.success(`Emergency mode ${checked ? 'enabled' : 'disabled'}`);
      },
      onError: () => {
        toast.error('Failed to update clinic status');
      },
    });
  };

  const formatDate = (time: bigint) => {
    try {
      const ms = Number(time) / 1_000_000;
      return new Date(ms).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return 'N/A';
    }
  };

  const adminCards = [
    {
      title: 'Appointments',
      description: 'View and manage all patient appointments',
      icon: '📅',
      path: '/admin/appointments',
    },
    {
      title: 'Service Manager',
      description: 'Edit service names, descriptions, and photos',
      icon: '🦷',
      path: '/admin/service-manager',
    },
    {
      title: 'Before/After Manager',
      description: 'Upload and manage before/after photo pairs',
      icon: '🖼️',
      path: '/admin/before-after-manager',
    },
    {
      title: 'Review Approver',
      description: 'Approve or reject pending patient reviews',
      icon: '⭐',
      path: '/admin/review-approver',
    },
    {
      title: 'Doctor Scheduler',
      description: 'Manage doctors and their availability',
      icon: '👨‍⚕️',
      path: '/admin/doctor-scheduler',
    },
    {
      title: 'Content Manager',
      description: 'Manage website content and announcements',
      icon: '📝',
      path: '/admin/content-manager',
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Master Control Panel — Dr. Smile Dental</p>
        </div>

        {/* Main Switch + Emergency Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Main Clinic Toggle */}
          <div className="glass-card p-6 rounded-2xl border border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">🏥 Main Switch</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {statusLoading ? 'Loading...' : isOpen ? 'Clinic is currently OPEN' : isEmergency ? 'EMERGENCY mode active' : 'Clinic is currently CLOSED'}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Switch
                  checked={isOpen}
                  onCheckedChange={handleMainToggle}
                  disabled={settingStatus || statusLoading || isEmergency}
                  className="scale-150"
                />
                <span className={`text-xs font-bold ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
                  {isOpen ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Toggle */}
          <div className="glass-card p-6 rounded-2xl border border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">🚨 Emergency Mode</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Show emergency banner on website
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Switch
                  checked={isEmergency}
                  onCheckedChange={handleEmergencyToggle}
                  disabled={settingStatus || statusLoading}
                  className="scale-150"
                />
                <span className={`text-xs font-bold ${isEmergency ? 'text-orange-500' : 'text-muted-foreground'}`}>
                  {isEmergency ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="glass-card rounded-2xl border border-border/40 p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">📋 Recent Appointments</h2>
          {appointmentsLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading appointments...</div>
          ) : !appointments || appointments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No appointments yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.slice(0, 10).map((apt) => (
                    <TableRow key={String(apt.id)}>
                      <TableCell className="font-medium">{apt.patientName}</TableCell>
                      <TableCell>{apt.contactInfo}</TableCell>
                      <TableCell>{apt.serviceType}</TableCell>
                      <TableCell>{formatDate(apt.preferredDate)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            apt.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : apt.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : apt.status === 'completed'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {String(apt.status)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {appointments.length > 10 && (
                <div className="mt-3 text-center">
                  <button
                    onClick={() => navigate({ to: '/admin/appointments' })}
                    className="text-primary text-sm hover:underline"
                  >
                    View all {appointments.length} appointments →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Admin Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminCards.map((card) => (
            <button
              key={card.path}
              onClick={() => navigate({ to: card.path })}
              className="glass-card p-6 rounded-2xl border border-border/40 text-left hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
