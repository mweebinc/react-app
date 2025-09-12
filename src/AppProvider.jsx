import React, { useState } from 'react';
import { AppContext } from './AppContext';

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [schemas, setSchemas] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const value = {
    user,
    setUser,
    schemas,
    setSchemas,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
