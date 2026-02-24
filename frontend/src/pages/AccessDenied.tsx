import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="container min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <ShieldAlert className="h-24 w-24 text-destructive mx-auto" />
        <h1 className="text-4xl font-bold">Access Denied</h1>
        <p className="text-lg text-muted-foreground">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        <Button onClick={() => navigate({ to: '/' })} size="lg">
          Return to Home
        </Button>
      </div>
    </div>
  );
}
