import { Award, GraduationCap, Stethoscope } from 'lucide-react';

export default function DoctorProfile() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <img
              src="/assets/generated/doctor-profile.dim_600x800.png"
              alt="Dr. Sarah Johnson"
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
            />
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Meet Dr. Sarah Johnson</h2>
              <p className="text-xl text-teal font-medium">Lead Dentist & Founder</p>
            </div>

            <p className="text-lg text-muted-foreground">
              With over 15 years of experience in cosmetic and restorative dentistry, Dr. Johnson
              is committed to providing exceptional care with a gentle touch.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-royal-blue/10 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-royal-blue" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p className="text-muted-foreground">
                    DDS from Harvard School of Dental Medicine
                    <br />
                    Advanced Cosmetic Dentistry Certification
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal/10 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-teal" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Specializations</h3>
                  <p className="text-muted-foreground">
                    Cosmetic Dentistry, Implantology, Orthodontics
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-royal-blue/10 rounded-lg">
                  <Award className="h-6 w-6 text-royal-blue" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Awards & Recognition</h3>
                  <p className="text-muted-foreground">
                    Top Dentist Award 2023
                    <br />
                    Excellence in Patient Care 2022
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
