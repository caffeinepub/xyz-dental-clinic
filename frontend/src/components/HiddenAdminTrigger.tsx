import React, { useState } from 'react';
import HiddenAdminLoginModal from './HiddenAdminLoginModal';

export default function HiddenAdminTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastClick, setLastClick] = useState(0);

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClick < 500) {
      setIsOpen(true);
    }
    setLastClick(now);
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '20px',
          height: '20px',
          cursor: 'default',
          zIndex: 9998,
        }}
      />
      <HiddenAdminLoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
