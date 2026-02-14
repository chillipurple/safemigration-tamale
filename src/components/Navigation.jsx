import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🔍', label: 'Scan' },
    { path: '/education', icon: '🎓', label: 'Learn' },
    { path: '/resources', icon: '🆘', label: 'Help' },
    { path: '/profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-4xl mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-3 px-4 transition-colors ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
