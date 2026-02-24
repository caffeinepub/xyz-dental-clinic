import { useState } from 'react';
import { useGetAllDoctors, useAddDoctor } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function DoctorScheduler() {
  const { data: doctors = [] } = useGetAllDoctors();
  const addDoctor = useAddDoctor();
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!doctorName.trim() || !specialty.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await addDoctor.mutateAsync({
        name: doctorName.trim(),
        specialty: specialty.trim(),
        availability: [],
      });
      toast.success('Doctor added successfully!');
      setDoctorName('');
      setSpecialty('');
    } catch (error) {
      console.error('Failed to add doctor:', error);
      toast.error('Failed to add doctor');
    }
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link to="/admin/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">Doctor Scheduler</h1>
        <p className="text-muted-foreground">Manage doctor profiles and availability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add New Doctor
            </CardTitle>
            <CardDescription>Add a new doctor to the clinic</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input
                  id="doctorName"
                  placeholder="Dr. John Smith"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  placeholder="e.g., Orthodontics, Endodontics"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={addDoctor.isPending}>
                {addDoctor.isPending ? 'Adding Doctor...' : 'Add Doctor'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Doctors</CardTitle>
            <CardDescription>Total: {doctors.length}</CardDescription>
          </CardHeader>
          <CardContent>
            {doctors.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No doctors added yet</p>
            ) : (
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id.toString()}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
