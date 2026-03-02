import React from 'react';

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem('adminAuthenticated') === 'true';
}

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  if (!isAdminAuthenticated()) {
    window.location.href = '/';
    return null;
  }
  return <>{children}</>;
}
