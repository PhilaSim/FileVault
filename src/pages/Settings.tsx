import React, { useState } from 'react';
import { User, Lock, Camera, Save, Shield, Users, FileText, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/dashboard/Header';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = user?.email === "simelane1@gmail.com";

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const success = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (success) {
        toast.success('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        toast.error('Current password is incorrect');
      }
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setProfileData(prev => ({
          ...prev,
          profilePicture: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProfileSettings = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
      
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={profileData.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
              alt="Profile"
            />
            <label className="absolute bottom-0 right-0 bg-cyan-500 rounded-full p-2 cursor-pointer hover:bg-cyan-600 transition-colors">
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Profile Photo</h4>
            <p className="text-sm text-gray-500">Click the camera icon to upload a new photo</p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={profileData.name}
            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={profileData.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );

  const renderPasswordSettings = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
      
      <form onSubmit={handlePasswordChange} className="space-y-6">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            minLength={6}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="flex items-center"
          >
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );

  const renderAdminPanel = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-red-100 rounded-full mr-4">
          <Shield className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Admin Panel</h3>
          <p className="text-sm text-gray-600">Administrative tools and system management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
          <h4 className="font-medium text-gray-900 mb-3">System Overview</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users:</span>
              <span className="font-medium">{JSON.parse(localStorage.getItem('users') || '[]').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Files:</span>
              <span className="font-medium">{JSON.parse(localStorage.getItem('files') || '[]').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Admin Status:</span>
              <span className="font-medium text-red-600">Active</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Quick Actions</h4>
          <Link to="/admin">
            <Button 
              variant="primary" 
              className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
            >
              <Shield className="w-4 h-4 mr-2" />
              Open Admin Dashboard
            </Button>
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/admin">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                onClick={() => {
                  // This will navigate to admin with users tab
                  setTimeout(() => {
                    const event = new CustomEvent('admin-tab-change', { detail: 'users' });
                    window.dispatchEvent(event);
                  }, 100);
                }}
              >
                <Users className="w-4 h-4 mr-1" />
                Users
              </Button>
            </Link>
            <Link to="/admin">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                onClick={() => {
                  // This will navigate to admin with files tab
                  setTimeout(() => {
                    const event = new CustomEvent('admin-tab-change', { detail: 'files' });
                    window.dispatchEvent(event);
                  }, 100);
                }}
              >
                <FileText className="w-4 h-4 mr-1" />
                Files
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Features */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Administrative Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900">User Management</h5>
            <p className="text-xs text-gray-600 mt-1">View and manage all user accounts</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <FileText className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900">File Oversight</h5>
            <p className="text-xs text-gray-600 mt-1">Monitor and manage all uploaded files</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <BarChart3 className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h5 className="font-medium text-gray-900">System Analytics</h5>
            <p className="text-xs text-gray-600 mt-1">View usage statistics and insights</p>
          </div>
        </div>
      </div>

      {/* Warning Notice */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-yellow-800">Administrator Access</h5>
            <p className="text-sm text-yellow-700 mt-1">
              You have administrative privileges. Use these tools responsibly and ensure user privacy is maintained.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuToggle={() => {}}
        isMobileMenuOpen={false}
      />
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Settings Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'profile', name: 'Profile', icon: User },
                { id: 'password', name: 'Password', icon: Lock },
                ...(isAdmin ? [{ id: 'admin', name: 'Admin Panel', icon: Shield }] : [])
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? (tab.id === 'admin' ? 'border-red-500 text-red-600' : 'border-cyan-500 text-cyan-600')
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        {activeTab === 'profile' && renderProfileSettings()}
        {activeTab === 'password' && renderPasswordSettings()}
        {activeTab === 'admin' && isAdmin && renderAdminPanel()}
      </div>
    </div>
  );
};

export default Settings;