import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize admin user if it doesn't exist
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const adminEmail = 'simelane1@gmail.com';
    const adminExists = users.find((u: any) => u.email === adminEmail);
    
    if (!adminExists) {
      const adminUser = {
        id: 'admin-001',
        name: 'Phila Simelane',
        email: adminEmail,
        password: 'Palesa123',
        joinDate: new Date().toISOString(),
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${adminEmail}`
      };
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );
    
    console.log('Login attempt:', { email, password });
    console.log('Found user:', foundUser);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      console.log('Login successful for:', userWithoutPassword);
      return true;
    }
    
    console.log('Login failed - user not found');
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find((u: User) => u.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      joinDate: new Date().toISOString(),
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    setIsLoading(false);
    return true;
  };

  const updateProfile = async (profileData: { name: string; email: string; profilePicture: string }): Promise<void> => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? { ...u, name: profileData.name, profilePicture: profileData.profilePicture } : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const updatedUser = { ...user, name: profileData.name, profilePicture: profileData.profilePicture };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userWithPassword = users.find((u: any) => u.id === user.id);
    
    if (!userWithPassword || userWithPassword.password !== currentPassword) {
      return false;
    }

    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? { ...u, password: newPassword } : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      updateProfile, 
      changePassword, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};