import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    id: 'root-canal',
    title: 'Root Canal Treatment',
    description: 'Advanced endodontic care to save your natural teeth',
    icon: '/assets/generated/icon-root-canal.dim_256x256.png',
  },
  {
    id: 'braces',
    title: 'Braces & Orthodontics',
    description: 'Straighten your smile with modern orthodontic solutions',
    icon: '/assets/generated/icon-braces.dim_256x256.png',
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    description: 'Professional whitening for a brighter, confident smile',
    icon: '/assets/generated/icon-whitening.dim_256x256.png',
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement with natural-looking results',
    icon: '/assets/generated/icon-implants.dim_256x256.png',
  },
];

export default function ServicesGrid() {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive dental care tailored to your unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                onClick={() => navigate({ to: '/services/$serviceId', params: { serviceId: service.id } })}
              >
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <CardTitle className="text-center group-hover:text-royal-blue transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
