import React, { useState, useEffect } from 'react';
import { UserCircle, Heart, Settings, LogOut, Upload, Bell, Palette } from 'lucide-react';
import { 
  getUserProfile, 
  saveUserProfile, 
  getTheme, 
  saveTheme,
  getNotificationsEnabled,
  saveNotificationsEnabled,
  clearUserData
} from '../utils/storage';
import type { Theme, UserProfile } from '../types';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [theme, setTheme] = useState<Theme>(getTheme());
  const [notificationsEnabled, setNotificationsEnabled] = useState(getNotificationsEnabled());
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfile = { ...profile, avatar: reader.result as string };
        saveUserProfile(newProfile);
        setProfile(newProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameSave = () => {
    const newProfile = { ...profile, name: editName };
    saveUserProfile(newProfile);
    setProfile(newProfile);
    setIsEditing(false);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const handleNotificationsToggle = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    saveNotificationsEnabled(newState);
    
    if (newState && 'Notification' in window) {
      Notification.requestPermission();
    }
  };

  const handleLogout = () => {
    clearUserData();
    window.location.href = '/';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <UserCircle className="text-pink-500 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-4xl">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profile.name.substring(0, 2).toUpperCase()
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-pink-500 rounded-full p-2 cursor-pointer hover:bg-pink-600 transition-colors">
              <Upload size={16} className="text-white" />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          
          {isEditing ? (
            <div className="mt-4 w-full max-w-xs">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleNameSave}
                  className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800 mt-4">{profile.name}</h2>
              <p className="text-gray-500 mb-4">
                Joined {new Date(profile.joinDate).toLocaleDateString()}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2 px-4 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg transition-colors duration-200 flex justify-center items-center"
              >
                <Settings size={16} className="mr-2" />
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-pink-100">
            <h3 className="font-medium text-gray-700">App Settings</h3>
          </div>
          
          <div className="divide-y divide-pink-100">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Palette size={18} className="text-pink-400 mr-3" />
                <span className="text-gray-700">Theme</span>
              </div>
              <select 
                className="bg-pink-50 text-pink-800 text-sm rounded-lg px-3 py-1.5 border border-pink-100"
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value as Theme)}
              >
                <option value="pink-paradise">Pink Paradise</option>
                <option value="purple-dream">Purple Dream</option>
                <option value="pastel-rainbow">Pastel Rainbow</option>
              </select>
            </div>
            
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Bell size={18} className="text-pink-400 mr-3" />
                <span className="text-gray-700">Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notificationsEnabled}
                  onChange={handleNotificationsToggle}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-500"></div>
              </label>
            </div>
            
            <div className="p-4">
              <button 
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full text-red-500 hover:text-red-600 font-medium py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center justify-center">
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-center text-gray-500 text-sm">
            GirlyMood App Version 1.0.0
          </p>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Sign Out</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to sign out? Your mood data will remain saved on this device.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;