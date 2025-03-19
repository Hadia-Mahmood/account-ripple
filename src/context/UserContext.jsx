
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Create a Context for user data
const UserContext = createContext();

// Mock user data (in a real app, this would come from your backend)
const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  contactNumber: '+1 (555) 123-4567',
  profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  password: 'Password123'
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data from backend or localStorage
    const fetchUser = async () => {
      try {
        // In a real app, you would fetch from your API
        // For now, we'll use mock data
        setUser(mockUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Could not load user data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  // Update user profile
  const updateUserProfile = async (updatedData) => {
    try {
      // In a real app, you would send this data to your API
      // Simulate API call with a timeout
      setLoading(true);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the user state with the new data
      setUser(prev => ({
        ...prev,
        ...updatedData
      }));
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user password
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      
      // Validate current password
      if (currentPassword !== user.password) {
        throw new Error('Current password is incorrect');
      }
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update password
      setUser(prev => ({
        ...prev,
        password: newPassword
      }));
      
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Failed to update password');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    updateUserProfile,
    updatePassword
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
