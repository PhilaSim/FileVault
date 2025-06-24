import { useState, useEffect } from 'react';
import { FileRecord } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useFiles = () => {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadFiles();
    }
  }, [user]);

  const loadFiles = () => {
    setIsLoading(true);
    const allFiles = JSON.parse(localStorage.getItem('files') || '[]');
    const userFiles = allFiles
      .filter((file: FileRecord) => file.uploadedBy === user?.id)
      .map((file: FileRecord) => ({
        ...file,
        tags: Array.isArray(file.tags) ? file.tags : []
      }));
    setFiles(userFiles);
    setIsLoading(false);
  };

  const addFile = (file: Omit<FileRecord, 'id' | 'uploadedBy' | 'uploadDate'>) => {
    if (!user) return;

    const newFile: FileRecord = {
      ...file,
      id: Date.now().toString(),
      uploadedBy: user.id,
      uploadDate: new Date().toISOString(),
      tags: Array.isArray(file.tags) ? file.tags : []
    };

    const allFiles = JSON.parse(localStorage.getItem('files') || '[]');
    allFiles.push(newFile);
    localStorage.setItem('files', JSON.stringify(allFiles));
    
    setFiles(prev => [...prev, newFile]);
  };

  const deleteFile = (fileId: string) => {
    const allFiles = JSON.parse(localStorage.getItem('files') || '[]');
    const updatedFiles = allFiles.filter((file: FileRecord) => file.id !== fileId);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
    
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const updateFile = (fileId: string, updates: Partial<FileRecord>) => {
    const allFiles = JSON.parse(localStorage.getItem('files') || '[]');
    const updatedFiles = allFiles.map((file: FileRecord) => 
      file.id === fileId ? { 
        ...file, 
        ...updates,
        tags: Array.isArray(updates.tags) ? updates.tags : (Array.isArray(file.tags) ? file.tags : [])
      } : file
    );
    localStorage.setItem('files', JSON.stringify(updatedFiles));
    
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { 
        ...file, 
        ...updates,
        tags: Array.isArray(updates.tags) ? updates.tags : (Array.isArray(file.tags) ? file.tags : [])
      } : file
    ));
  };

  return {
    files,
    isLoading,
    addFile,
    deleteFile,
    updateFile,
    refreshFiles: loadFiles
  };
};