import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem('adminAuth') === 'true';
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const navigate = useNavigate();
  const { identity, isInitializing } = useInternetIdentity();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Wait for Internet Identity to finish initializing before checking auth
    if (isInitializing) return;

    const hasSessionAuth = sessionStorage.getItem('adminAuth') === 'true';
    const hasIdentity = !!identity;

    if (hasSessionAuth && hasIdentity) {
      // Fully authenticated admin
      setChecked(true);
    } else if (hasSessionAuth && !hasIdentity) {
      // Session flag exists but no II identity — clear stale session and redirect
      sessionStorage.removeItem('adminAuth');
      navigate({ to: '/' });
    } else {
      // No admin session at all
      navigate({ to: '/' });
    }
  }, [isInitializing, identity, navigate]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
