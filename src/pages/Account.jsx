
import React, { useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Briefcase, Camera, Shield, User, Phone, Mail, Key, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import ContractorReviews from '../components/ContractorReviews';
import ServiceLocations from '../components/ServiceLocations';

const Account = () => {
  const { user, loading, updateUserProfile, updatePassword, updateContractorInfo, isContractor, toggleUserType } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        profilePicture: user.profilePicture,
        ...(isContractor && {
          companyName: user.companyName,
          state: user.state,
          serviceCities: user.serviceCities
        })
      });
    }
  }, [user, isContractor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when typing
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        profilePicture: user.profilePicture,
        ...(isContractor && {
          companyName: user.companyName,
          state: user.state,
          serviceCities: user.serviceCities
        })
      });
    }
    setIsEditing(false);
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) {
      return;
    }
    
    try {
      await updatePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      
      // Reset form and close dialog
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordDialogOpen(false);
    } catch (error) {
      // Error handling is done in the context
      console.error('Password change failed:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG or PNG)');
      return;
    }
    
    setUploadingImage(true);
    
    // Simulate image upload
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
        setUploadingImage(false);
        toast.success('Profile picture updated');
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const handleServiceLocationsUpdate = (locationData) => {
    setFormData(prev => ({
      ...prev,
      state: locationData.state,
      serviceCities: locationData.serviceCities
    }));
    
    if (!isEditing) {
      // If we're updating directly from the ServiceLocations component
      updateContractorInfo(locationData);
    }
  };

  // For demo purposes - toggle between user and contractor views
  const handleToggleUserType = () => {
    toggleUserType();
  };

  if (loading && !user) {
    return (
      <div className="container max-w-4xl py-10 animate-fade-in">
        <div className="flex flex-col space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container max-w-4xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>You need to sign in to view this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10 animate-fade-in">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">Account</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and profile information
            </p>
          </div>
          
          {/* For demo purposes only - toggle between user and contractor */}
          <Button onClick={handleToggleUserType} variant="outline">
            Switch to {isContractor ? 'User' : 'Contractor'} View
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="animate-slide-up">
            <Card className="overflow-hidden border-none shadow-md bg-white">
              <CardHeader className="relative p-0 h-32 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="absolute -bottom-16 left-8">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                      <AvatarImage src={formData.profilePicture} />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <label htmlFor="avatar-upload" className="cursor-pointer p-2 bg-white rounded-full">
                          <Camera className="h-5 w-5 text-gray-700" />
                          <input 
                            id="avatar-upload" 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                          />
                        </label>
                      </div>
                    )}
                    
                    {uploadingImage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                        <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-20 pb-8 px-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-medium">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <Input 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleInputChange} 
                            className="max-w-[120px]"
                          />
                          <Input 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleInputChange} 
                            className="max-w-[120px]"
                          />
                        </div>
                      ) : (
                        `${user.firstName} ${user.lastName}`
                      )}
                    </h2>
                    {isContractor && (
                      <p className="text-blue-600 font-medium mt-1">Contractor</p>
                    )}
                  </div>
                  
                  <div>
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <User className="mr-2 h-4 w-4" />
                        First Name
                      </div>
                      {isEditing ? (
                        <Input 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleInputChange} 
                        />
                      ) : (
                        <div className="font-medium">{user.firstName}</div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <User className="mr-2 h-4 w-4" />
                        Last Name
                      </div>
                      {isEditing ? (
                        <Input 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleInputChange} 
                        />
                      ) : (
                        <div className="font-medium">{user.lastName}</div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Address
                      </div>
                      <div className="font-medium">{user.email}</div>
                      <p className="text-xs text-muted-foreground mt-1">Your email cannot be changed</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Number
                      </div>
                      {isEditing ? (
                        <Input 
                          name="contactNumber" 
                          value={formData.contactNumber} 
                          onChange={handleInputChange} 
                        />
                      ) : (
                        <div className="font-medium">{user.contactNumber}</div>
                      )}
                    </div>
                  </div>

                  {/* Contractor-specific fields */}
                  {isContractor && (
                    <>
                      <div className="pt-4 border-t border-gray-100">
                        <h3 className="text-lg font-medium mb-4">Contractor Information</h3>
                        
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <Briefcase className="mr-2 h-4 w-4" />
                            Company Name
                          </div>
                          {isEditing ? (
                            <Input 
                              name="companyName" 
                              value={formData.companyName} 
                              onChange={handleInputChange} 
                            />
                          ) : (
                            <div className="font-medium">{user.companyName}</div>
                          )}
                        </div>
                        
                        <ServiceLocations
                          state={formData.state || user.state}
                          serviceCities={formData.serviceCities || user.serviceCities}
                          isEditing={isEditing}
                          onSave={handleServiceLocationsUpdate}
                        />
                      </div>
                      
                      <div className="pt-6">
                        <ContractorReviews reviews={user.reviews} />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="animate-slide-up">
            <Card className="border-none shadow-md bg-white">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Key className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Last changed: 30 days ago
                      </p>
                    </div>
                  </div>
                  
                  <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Change Password</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Enter your current password and a new password to update your credentials.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                          />
                          {passwordErrors.currentPassword && (
                            <p className="text-sm text-destructive">{passwordErrors.currentPassword}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                          />
                          {passwordErrors.newPassword && (
                            <p className="text-sm text-destructive">{passwordErrors.newPassword}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                          />
                          {passwordErrors.confirmPassword && (
                            <p className="text-sm text-destructive">{passwordErrors.confirmPassword}</p>
                          )}
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleChangePassword}>
                          Update Password
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-amber-100 rounded-full">
                      <Shield className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  
                  <Button variant="outline">Set Up</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
