
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
  password: 'Password123',
  role: 'user' // new field to distinguish between user and contractor
};

// Mock contractor data
const mockContractor = {
  firstName: 'Mike',
  lastName: 'Johnson',
  email: 'mike.johnson@example.com',
  contactNumber: '+1 (555) 987-6543',
  profilePicture: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  password: 'Password123',
  role: 'contractor',
  companyName: 'Johnson Home Services',
  state: 'California',
  serviceCities: ['Los Angeles', 'San Francisco', 'San Diego'],
  reviews: [
    {
      id: 1,
      userId: 'user123',
      userName: 'Sarah Wilson',
      rating: 5,
      comment: 'Excellent service! Mike was professional and completed the work efficiently.',
      date: '2023-10-15'
    },
    {
      id: 2,
      userId: 'user456',
      userName: 'Robert Brown',
      rating: 4,
      comment: 'Very good work, arrived on time and cleaned up afterwards.',
      date: '2023-09-22'
    },
    {
      id: 3,
      userId: 'user789',
      userName: 'Jennifer Lee',
      rating: 5,
      comment: 'Highly recommend! Great attention to detail and fair pricing.',
      date: '2023-08-05'
    },
    {
      id: 4,
      userId: 'user101',
      userName: 'David Garcia',
      rating: 3,
      comment: 'Good service but took longer than expected.',
      date: '2023-07-12'
    }
  ]
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // State to toggle between user and contractor views (for demo purposes)
  const [showContractor, setShowContractor] = useState(false);

  useEffect(() => {
    // Simulate fetching user data from backend or localStorage
    const fetchUser = async () => {
      try {
        // For demo purposes, toggle between user and contractor
        // In a real app, you would fetch the appropriate user based on login
        setUser(showContractor ? mockContractor : mockUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Could not load user data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [showContractor]);

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

  // Update contractor company and service areas
  const updateContractorInfo = async (updatedData) => {
    try {
      setLoading(true);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update contractor info
      setUser(prev => ({
        ...prev,
        ...updatedData
      }));
      
      toast.success('Contractor information updated successfully');
    } catch (error) {
      console.error('Error updating contractor info:', error);
      toast.error('Failed to update contractor information');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes - toggle between user and contractor
  const toggleUserType = () => {
    setShowContractor(prev => !prev);
  };

  const value = {
    user,
    loading,
    updateUserProfile,
    updatePassword,
    updateContractorInfo,
    toggleUserType, // For demo purposes
    isContractor: user?.role === 'contractor'
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
