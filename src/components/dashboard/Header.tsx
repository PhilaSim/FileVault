import React, { useState } from 'react';
import { LogOut, User, Settings as SettingsIcon, Menu, X, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  const isAdmin = user?.email === "simelane1@gmail.com";

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/dashboard" className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="ml-2 text-xl font-bold text-gray-900">FileVault</h1>
            </Link>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 p-2 hover:bg-gray-50 transition-colors"
            >
              <img
                className="w-8 h-8 rounded-full"
                src={user?.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                alt={user?.name}
              />
              <div className="hidden sm:block text-left">
                <p className="text-gray-700 font-medium">{user?.name}</p>
                {isAdmin && (
                  <p className="text-xs text-red-600 flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
                  </p>
                )}
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </Link>
                )}
                
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Settings
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
