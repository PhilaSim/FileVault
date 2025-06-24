export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  joinDate: string;
}

export interface FileRecord {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  access: 'Public' | 'Private';
  uploadedBy: string;
  uploadDate: string;
  tags: string[];
  fileUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: { name: string; email: string; profilePicture: string }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  isLoading: boolean;
}