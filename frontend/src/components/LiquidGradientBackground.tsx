import React from 'react';

export default function LiquidGradientBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(20, 184, 166, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)',
          animation: 'liquidSmoke 12s ease-in-out infinite',
        }}
      />
    </div>
  );
}
