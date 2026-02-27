import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useStaggeredTextReveal } from '../hooks/useStaggeredTextReveal';

export default function ContactSection() {
  const headingText = 'Contact Us';
  const { ref: headingRef, wordElements } = useStaggeredTextReveal(headingText);

  return (
    <section id="contact" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2
            ref={headingRef as React.RefObject<HTMLHeadingElement>}
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            {wordElements.map(({ word, style }, i) => (
              <span key={i} style={style}>{word}</span>
            ))}
          </h2>
          <p style={{ color: '#64748b', fontSize: '17px' }}>
            We're here to help. Reach out to us anytime.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {[
            { icon: <Phone size={22} color="#0ea5e9" />, title: 'Phone', value: '+91 63521 74912', sub: 'Mon–Sat, 9am–7pm' },
            { icon: <Mail size={22} color="#0ea5e9" />, title: 'Email', value: 'info@smilecare.in', sub: 'We reply within 24 hours' },
            { icon: <MapPin size={22} color="#0ea5e9" />, title: 'Address', value: '42 Dental Avenue, Bandra West', sub: 'Mumbai, Maharashtra 400050' },
            { icon: <Clock size={22} color="#0ea5e9" />, title: 'Hours', value: 'Mon–Sat: 9am–7pm', sub: 'Sunday: 10am–2pm' },
          ].map(card => (
            <div
              key={card.title}
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(14,165,233,0.12)',
                borderRadius: '16px',
                padding: '28px 24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(14,165,233,0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                {card.icon}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                {card.title}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{card.value}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* WhatsApp */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <a
            href="https://wa.me/916352174912"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #25d366, #128c7e)',
              color: '#fff',
              borderRadius: '12px',
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Map */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(14,165,233,0.12)',
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d72.8347!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM0LjYiTiA3MsKwNTAnMDQuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="350"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Clinic Location"
          />
        </div>
      </div>
    </section>
  );
}
