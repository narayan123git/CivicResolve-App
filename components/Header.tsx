
import React from 'react';
import { NavLink } from 'react-router-dom';
import type { UserRole } from '../types';

interface HeaderProps {
  currentRole: UserRole;
}

const Header: React.FC<HeaderProps> = ({ currentRole }) => {
  const linkStyle = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkStyle = "bg-blue-600 text-white";
  const inactiveLinkStyle = "text-gray-600 hover:bg-blue-100 hover:text-blue-700";

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="ml-3 text-2xl font-bold text-gray-800">CivicResolve AI</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <NavLink
              to="/"
              className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
            >
              Citizen
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
            >
              Admin
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
