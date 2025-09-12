import { createContext } from 'react';

export const AppContext = createContext({
  user: null,
  setUser: () => {},
  schemas: [],
  setSchemas: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});
