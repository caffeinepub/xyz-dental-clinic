import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { Loader2, ShieldCheck } from 'lucide-react';

interface HiddenAdminLoginModalProps {
  open: boolean;
  onClose: () => void;
}

const ADMIN_USERNAME = '6352174912';
const ADMIN_PASSWORD = '63521';

type Step = 'credentials' | 'ii-login' | 'success';

export default function HiddenAdminLoginModal({ open, onClose }: HiddenAdminLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<Step>('credentials');
  const { login, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();

  // When identity becomes available after II login, complete admin auth
  useEffect(() => {
    if (step === 'ii-login' && identity) {
      sessionStorage.setItem('adminAuth', 'true');
      setStep('success');
      setTimeout(() => {
        onClose();
        navigate({ to: '/admin/dashboard' });
      }, 800);
    }
  }, [identity, step, navigate, onClose]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setUsername('');
      setPassword('');
      setError('');
      setStep('credentials');
    }
  }, [open]);

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // If already logged in with II, skip II step
      if (identity) {
        sessionStorage.setItem('adminAuth', 'true');
        setStep('success');
        setTimeout(() => {
          onClose();
          navigate({ to: '/admin/dashboard' });
        }, 800);
        return;
      }
      // Proceed to II login
      setStep('ii-login');
      try {
        await login();
      } catch (err: any) {
        console.error('II login error:', err);
        setError('Login failed. Please try again.');
        setStep('credentials');
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && step !== 'ii-login') onClose(); }}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <img src="/assets/generated/tooth-logo-icon.dim_64x64.png" alt="tooth" className="w-6 h-6" />
            Admin Access
          </DialogTitle>
        </DialogHeader>

        {step === 'credentials' && (
          <form onSubmit={handleCredentialSubmit} className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="off"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="off"
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Continue
            </Button>
          </form>
        )}

        {step === 'ii-login' && (
          <div className="flex flex-col items-center gap-4 py-6">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {isLoggingIn
                ? 'Waiting for Internet Identity authentication...'
                : 'Connecting to Internet Identity...'}
            </p>
            <p className="text-xs text-gray-400 text-center">
              Please complete the login in the popup window.
            </p>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center gap-4 py-6">
            <ShieldCheck className="w-10 h-10 text-green-500" />
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              Admin access granted! Redirecting...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
