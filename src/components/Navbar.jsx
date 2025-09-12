import React, { useContext } from 'react';
import { MainLayoutContext } from './MainLayoutContext';

function Navbar({ title = 'App', children, loading = false }) {
  const { show, setShow } = useContext(MainLayoutContext);

  const onClickToggle = () => {
    setShow(!show);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onClickToggle}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {loading && (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
          )}
          {children}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
