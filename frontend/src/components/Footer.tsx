import React, { useState } from 'react';
import HiddenAdminLoginModal from './HiddenAdminLoginModal';

export default function Footer() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const hostname = typeof window !== 'undefined' ? encodeURIComponent(window.location.hostname) : 'unknown-app';

  return (
    <footer style={{ background: '#0a1628', color: '#e2e8f0', padding: '60px 0 0 0', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', paddingBottom: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '20px' }}>🦷</span>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>XYZ Dental Clinic</span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '14px' }}>
              Providing exceptional dental care with a gentle touch. Your smile is our passion and priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '16px', fontSize: '16px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Home', 'Services', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#38bdf8')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '16px', fontSize: '16px' }}>Our Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Dental Implants', 'Invisalign', 'Kids Dentistry', 'Smile Makeover', 'Laser Dentistry'].map(service => (
                <li key={service}>
                  <span style={{ color: '#94a3b8', fontSize: '14px' }}>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '16px', fontSize: '16px' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#38bdf8', fontSize: '16px', marginTop: '2px' }}>📍</span>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>123 Dental Street, Health City, HC 12345</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#38bdf8', fontSize: '16px' }}>📞</span>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>+91 63521 74912</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#38bdf8', fontSize: '16px' }}>✉️</span>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>info@xyzdentalclinic.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#38bdf8', fontSize: '16px' }}>🕐</span>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>Mon–Sat: 9AM – 7PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #1e3a5f', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
              © {currentYear} XYZ Dental Clinic. All rights reserved.
            </p>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
              Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#38bdf8', textDecoration: 'none' }}
              >
                caffeine.ai
              </a>
            </p>
          </div>

          {/* Tooth Logo Admin Trigger */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
            <button
              onClick={() => setAdminModalOpen(true)}
              title="Admin Access"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                opacity: 0.3,
                transition: 'opacity 0.3s, transform 0.3s',
                borderRadius: '50%',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.8';
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.15)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.3';
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              }}
            >
              <img
                src="/assets/generated/tooth-logo-footer.dim_48x48.png"
                alt="Admin"
                style={{ width: '28px', height: '28px', display: 'block' }}
                onError={e => {
                  const parent = (e.currentTarget as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = '<span style="font-size:22px;display:block;">🦷</span>';
                  }
                }}
              />
            </button>
          </div>
        </div>
      </div>

      <HiddenAdminLoginModal open={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </footer>
  );
}
