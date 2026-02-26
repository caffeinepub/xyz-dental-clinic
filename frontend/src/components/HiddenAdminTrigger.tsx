import { useRef, useState } from 'react';
import HiddenAdminLoginModal from './HiddenAdminLoginModal';

export default function HiddenAdminTrigger() {
  const [showModal, setShowModal] = useState(false);
  const lastTapRef = useRef<number>(0);

  const handleDoubleClick = () => {
    setShowModal(true);
  };

  // Touch double-tap detection
  const handleTouchEnd = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    if (timeSinceLastTap < 400 && timeSinceLastTap > 0) {
      setShowModal(true);
    }
    lastTapRef.current = now;
  };

  return (
    <>
      <div
        onDoubleClick={handleDoubleClick}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: 50,
          height: 50,
          zIndex: 9999,
          background: 'transparent',
          border: 'none',
          cursor: 'default',
        }}
        aria-hidden="true"
      />
      <HiddenAdminLoginModal
        open={showModal}
        onOpenChange={setShowModal}
      />
    </>
  );
}
