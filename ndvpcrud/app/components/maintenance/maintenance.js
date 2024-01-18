// AppState.js

import { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [maintenanceMessage, setMaintenanceMessage] = useState('');

  const setMaintenanceAlert = (message) => {
    setMaintenanceMessage(message);
  };

  const clearMaintenanceAlert = () => {
    setMaintenanceMessage('');
  };

  return (
    <AppStateContext.Provider
      value={{
        maintenanceMessage,
        setMaintenanceAlert,
        clearMaintenanceAlert,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
