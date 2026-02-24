import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  const whatsappNumber = '1234567890';
  const phoneNumber = '+1 (234) 567-8900';

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">We're here to help you achieve your perfect smile</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 animate-slide-in-left">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-royal-blue/10 rounded-lg">
                <Phone className="h-6 w-6 text-royal-blue" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a href={`tel:${phoneNumber}`} className="text-muted-foreground hover:text-royal-blue transition-colors">
                  {phoneNumber}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-teal/10 rounded-lg">
                <MapPin className="h-6 w-6 text-teal" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-muted-foreground">
                  123 Dental Street
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-royal-blue/10 rounded-lg">
                <Clock className="h-6 w-6 text-royal-blue" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="animated-button w-full md:w-auto"
              onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] animate-slide-in-right">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9476519598093!2d-73.99185368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clinic Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
