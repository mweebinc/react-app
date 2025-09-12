import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavSidebar({ menus = [], isMobile, setShow, className = '' }) {
  const location = useLocation();

  const handleNavClick = () => {
    if (isMobile) {
      setShow(false);
    }
  };

  return (
    <div className={`bg-white h-full flex flex-col ${className}`}>
      {/* Logo/Brand */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Test Dashboard</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menus.map((menu, index) => (
            <li key={index}>
              <Link
                to={menu.path}
                onClick={handleNavClick}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === menu.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="mr-3 text-lg">{menu.icon}</span>
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">U</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Test User</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavSidebar;
