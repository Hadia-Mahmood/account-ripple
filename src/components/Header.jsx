
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/UserContext';
import { Briefcase } from 'lucide-react';

const Header = () => {
  const { user, isContractor } = useUserContext();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-gray-200/50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">MyAccount</h1>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <Link 
              to="/account" 
              className="flex items-center space-x-2 py-1.5 px-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              <div className="relative">
                <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                  <AvatarImage src={user.profilePicture} alt={user.firstName} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                {isContractor && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-0.5">
                    <Briefcase className="h-3 w-3" />
                  </div>
                )}
              </div>
              <span className="text-sm font-medium">My Account</span>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
