import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List, Mail, Calendar } from 'lucide-react';
const Navbar: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/dashboard', label: 'Dash', icon: <List size={20} /> },
    { path: '/contact', label: 'Contact', icon: <Mail size={20} /> },
    { path: '/endpage', label: 'EndPage', icon: <Calendar size={20} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 shadow-lg bg-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <ul className="hidden md:flex space-x-4">
          {navItems.map(({ path, label, icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'bg-blue-100 text-blue-800 shadow-md'
                      : 'text-blue-800 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                {React.cloneElement(icon, {
                  className: "text-blue-900",
                })}
                <span className="relative">
                  {label}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="md:hidden flex items-center space-x-2">
          {navItems.map(({ path, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `p-3 rounded-full transition-all duration-300 transform hover:scale-110 relative overflow-hidden ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-blue-900 hover:bg-blue-200'
                } ${
                  isActive 
                    ? 'after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/20 after:via-transparent after:to-transparent'
                    : ''
                }`
              }
            >
              {React.cloneElement(icon, {
                className: "text-blue-900",
              })}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;