import React, { createContext, useContext, useState, ReactNode } from 'react';

type CursorIcon = 'default' | 'dental';

interface CursorContextType {
  cursorIcon: CursorIcon;
  setCursorIcon: (icon: CursorIcon) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorIcon: 'default',
  setCursorIcon: () => {},
});

export function CursorContextProvider({ children }: { children: ReactNode }) {
  const [cursorIcon, setCursorIcon] = useState<CursorIcon>('default');
  // No cursor:none applied — native cursor is always visible
  return (
    <CursorContext.Provider value={{ cursorIcon, setCursorIcon }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  return useContext(CursorContext);
}
