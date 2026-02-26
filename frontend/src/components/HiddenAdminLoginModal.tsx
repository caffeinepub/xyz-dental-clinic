import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ADMIN_USERNAME = '6352174912';
const ADMIN_PASSWORD = '63521';

interface HiddenAdminLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HiddenAdminLoginModal({ open, onOpenChange }: HiddenAdminLoginModalProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 400));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoading(false);
      onOpenChange(false);
      setUsername('');
      setPassword('');
      navigate({ to: '/admin/dashboard' });
    } else {
      setLoading(false);
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setUsername('');
      setPassword('');
      setError('');
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-slate-800 font-playfair flex items-center gap-2">
            <span>🦷</span> Admin Access
          </DialogTitle>
          <DialogDescription>
            Enter your credentials to access the admin panel.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="admin-username">Username</Label>
            <Input
              id="admin-username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Verifying...
              </span>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
