import React, { useState } from 'react';
import { Building, Menu, X, User, Settings, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { User as UserType, PageType } from '../../types';
import { navigationItems } from '../../data/navigation';

interface HeaderProps {
  currentPage: PageType;
  user: UserType | null;
  onNavigate: (page: PageType) => void;
  onUserRoleChange: (role: string) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  user,
  onNavigate,
  onUserRoleChange,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 group"
            >
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Building className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-gray-900 font-semibold">DormDash</span>
            </button>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>

                {/* Dashboard Button */}
                {(user.role === 'landlord' || user.role === 'agent' || user.role === 'admin') && (
                  <Button
                    onClick={() => onNavigate(
                      user.role === 'landlord' ? 'landlord-dashboard' : 
                      user.role === 'agent' ? 'agent-dashboard' : 'admin-dashboard'
                    )}
                    className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Dashboard
                  </Button>
                )}

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="hidden md:flex items-center space-x-2 border-gray-200 hover:bg-gray-50"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm text-blue-600 font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-700">{user.name}</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5 text-sm text-gray-500">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs capitalize">{user.role}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate('profile')}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={onLogout}
                      className="text-red-600 focus:text-red-600"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('search')}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Browse Properties
                </Button>
                <Button
                  onClick={() => onNavigate('auth')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Login / Sign Up
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block px-4 py-3 text-base w-full text-left rounded-lg transition-all ${
                  currentPage === item.id 
                    ? 'text-blue-600 bg-blue-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {user && (
              <>
                <div className="px-4 py-2 border-t mt-2 pt-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  
                  {/* Dashboard link for mobile */}
                  {(user.role === 'landlord' || user.role === 'agent' || user.role === 'admin') && (
                    <button
                      onClick={() => {
                        onNavigate(
                          user.role === 'landlord' ? 'landlord-dashboard' : 
                          user.role === 'agent' ? 'agent-dashboard' : 'admin-dashboard'
                        );
                        setIsMenuOpen(false);
                      }}
                      className="block w-full px-4 py-3 text-left text-blue-600 bg-blue-50 rounded-lg mb-2 font-medium"
                    >
                      Dashboard
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg mb-2"
                  >
                    Profile & Settings
                  </button>
                  
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            {!user && (
              <div className="px-4 py-2 border-t mt-2 pt-4">
                <button
                  onClick={() => {
                    onNavigate('auth');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full px-4 py-3 text-center bg-blue-600 text-white rounded-lg font-medium"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
