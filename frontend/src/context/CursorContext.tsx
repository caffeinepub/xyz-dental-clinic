import React, { createContext, useContext, useState } from 'react';

type CursorIcon = 'default' | 'dental';

interface CursorContextType {
  cursorIcon: CursorIcon;
  setCursorIcon: (icon: CursorIcon) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorIcon: 'default',
  setCursorIcon: () => {},
});

export function CursorContextProvider({ children }: { children: React.ReactNode }) {
  const [cursorIcon, setCursorIcon] = useState<CursorIcon>('default');
  return (
    <CursorContext.Provider value={{ cursorIcon, setCursorIcon }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  return useContext(CursorContext);
}
