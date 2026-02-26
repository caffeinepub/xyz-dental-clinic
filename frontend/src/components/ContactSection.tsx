import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ContactSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="py-20 px-4 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold font-playfair mb-4">Visit Us Today</h2>
          <p className="text-slate-400 text-lg">We're here to help you achieve your perfect smile</p>
        </div>

        <div
          ref={contentRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-10 transition-all duration-700 delay-200 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                📞
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Phone</h3>
                <p className="text-slate-400">+91 63521 74912</p>
                <a
                  href="https://wa.me/916352174912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-full transition-colors"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Location</h3>
                <p className="text-slate-400">123 Dental Street, Medical Colony<br />Your City – 400001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                🕐
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Hours</h3>
                <p className="text-slate-400">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                <p className="text-slate-400">Sunday: 10:00 AM – 2:00 PM</p>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.123456789!2d72.8777!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzEyLjciTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="300"
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
