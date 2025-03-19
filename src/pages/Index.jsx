
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Key, Shield } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';

const Index = () => {
  const { user } = useUserContext();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-20 sm:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 animate-slide-down">
                Welcome to MyAccount
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-slide-down" style={{ animationDelay: '100ms' }}>
                Manage your personal information and account settings with ease
              </p>
              <div className="flex justify-center space-x-4 animate-slide-down" style={{ animationDelay: '200ms' }}>
                <Link to="/account">
                  <Button size="lg" className="rounded-full px-8">
                    {user ? 'Go to My Account' : 'Get Started'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 blur-3xl opacity-10">
              <div className="aspect-square h-[40rem] bg-gradient-to-br from-purple-600 to-blue-600 rounded-full" />
            </div>
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 blur-3xl opacity-10">
              <div className="aspect-square h-[40rem] bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full" />
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Account Management Made Simple</h2>
              <p className="text-gray-600">
                Easily update your personal information and maintain your account security
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-3">Profile Management</h3>
                <p className="text-gray-600">
                  Update your personal information, profile picture, and contact details anytime.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Key className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium mb-3">Security Controls</h3>
                <p className="text-gray-600">
                  Change your password and set up two-factor authentication for enhanced security.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-3">Privacy Settings</h3>
                <p className="text-gray-600">
                  Control what information is visible and how your data is used.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-4">
              MyAccount
            </h2>
            <p className="text-gray-600 mb-6">
              The simplest way to manage your account information
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
