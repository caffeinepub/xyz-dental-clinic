import { useState } from 'react';
import { useGetClinicStatus, useSetClinicStatus } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Building2, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { data: clinicStatus } = useGetClinicStatus();
  const setClinicStatus = useSetClinicStatus();

  const handleStatusChange = async (value: string) => {
    try {
      await setClinicStatus.mutateAsync(value as any);
      toast.success('Clinic status updated successfully');
    } catch (error) {
      console.error('Failed to update clinic status:', error);
      toast.error('Failed to update clinic status');
    }
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your clinic settings and content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link to="/admin/appointments">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>View and manage patient appointments</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/admin/content">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Content Manager</CardTitle>
              <CardDescription>Upload photos and manage reviews</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/admin/doctors">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Doctor Scheduler</CardTitle>
              <CardDescription>Manage doctor availability</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Clinic Status
          </CardTitle>
          <CardDescription>
            Control the clinic's operational status. Changes will be reflected immediately on the public website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={clinicStatus || 'open'}
            onValueChange={handleStatusChange}
            disabled={setClinicStatus.isPending}
          >
            <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="open" id="open" />
              <Label htmlFor="open" className="flex items-center gap-2 cursor-pointer flex-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-semibold">Open</div>
                  <div className="text-sm text-muted-foreground">Clinic is operating normally</div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="closed" id="closed" />
              <Label htmlFor="closed" className="flex items-center gap-2 cursor-pointer flex-1">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="font-semibold">Closed</div>
                  <div className="text-sm text-muted-foreground">Clinic is temporarily closed</div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="emergency" id="emergency" />
              <Label htmlFor="emergency" className="flex items-center gap-2 cursor-pointer flex-1">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <div className="font-semibold">Emergency</div>
                  <div className="text-sm text-muted-foreground">Emergency situation - urgent calls only</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
