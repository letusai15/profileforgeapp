import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  geminiKey: string;
  setGeminiKey: (key: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [geminiKey, setGeminiKey] = useState<string>('');

  return (
    <SettingsContext.Provider value={{ geminiKey, setGeminiKey }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
