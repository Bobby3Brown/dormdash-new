import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Edit2, Home, List, MapPin, CheckCircle, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User as UserType, PageType } from '../types';
import { toast } from 'sonner@2.0.3';

interface ProfilePageProps {
  user: UserType;
  onNavigate: (page: PageType) => void;
  onUpdateUser: (user: UserType) => void;
}

export function ProfilePage({ user, onNavigate, onUpdateUser }: ProfilePageProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSaveProfile = () => {
    onUpdateUser(editedUser);
    setIsEditMode(false);
    toast.success('Profile updated successfully!');
  };

  const handleInputChange = (field: keyof UserType, value: string) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    { 
      label: user.role === 'landlord' ? 'Properties Listed' : 'Properties Managed', 
      value: '6', 
      icon: Home 
    },
    { 
      label: user.role === 'landlord' ? 'Total Inquiries' : 'Active Clients', 
      value: user.role === 'landlord' ? '47' : '12', 
      icon: List 
    },
    { 
      label: 'Account Status', 
      value: user.verified ? 'Verified' : 'Pending', 
      icon: CheckCircle 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl sm:text-3xl bg-blue-100 text-blue-600">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Profile Picture</DialogTitle>
                      <DialogDescription>
                        Upload a new profile picture to personalize your account.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="text-center py-6">
                      <Input type="file" accept="image/*" className="mb-4" />
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Upload Photo
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div>
                    <h1 className="text-2xl sm:text-3xl text-gray-900">{user.name}</h1>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 mt-1">
                      <Badge className="capitalize">
                        {user.role}
                      </Badge>
                      {user.verified && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="mt-4 sm:mt-0"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="space-y-2 mt-4 text-sm text-gray-600">
                  <div className="flex items-center justify-center sm:justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    {user.phone}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined {user.registrationDate || 'Recently'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Dialog */}
        {isEditMode && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Edit Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={editedUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    value={editedUser.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex space-x-3 pt-2">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditMode(false);
                    setEditedUser(user);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => onNavigate(user.role === 'landlord' ? 'landlord-dashboard' : 'agent-dashboard')}
              className="w-full bg-blue-600 hover:bg-blue-700 justify-start"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
            
            {user.role === 'landlord' && (
              <Button
                onClick={() => onNavigate('landlord-dashboard')}
                variant="outline"
                className="w-full justify-start"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Add New Property
              </Button>
            )}

            <Button
              onClick={() => onNavigate('search')}
              variant="outline"
              className="w-full justify-start"
            >
              <List className="h-4 w-4 mr-2" />
              View All Listings
            </Button>

            <Separator className="my-2" />

            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600"
            >
              Account Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600"
            >
              Notification Preferences
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600"
            >
              Help & Support
            </Button>
          </CardContent>
        </Card>

        {/* Role-Specific Info */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-white border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg text-gray-900 mb-3">
              {user.role === 'landlord' ? '🏠 Landlord Benefits' : '🤝 Agent Benefits'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {user.role === 'landlord' ? (
                <>
                  <li>✓ List unlimited properties</li>
                  <li>✓ Boost listings for better visibility</li>
                  <li>✓ Direct communication with students</li>
                  <li>✓ Verified badge for trusted properties</li>
                </>
              ) : (
                <>
                  <li>✓ Manage multiple client properties</li>
                  <li>✓ Earn 5-10% commission on rentals</li>
                  <li>✓ Track all commissions in one place</li>
                  <li>✓ Build your property portfolio</li>
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
