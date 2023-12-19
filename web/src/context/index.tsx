/* ---------- External ---------- */
import React from 'react';

/* ---------- Providers ---------- */
import { AuthProvider } from '_context/auth';

interface Props {
  children?: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);
