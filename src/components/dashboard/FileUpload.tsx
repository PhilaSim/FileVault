import React, { useState } from 'react';
import { Upload, X, FileText, Plus } from 'lucide-react';
import { useFiles } from '../../hooks/useFiles';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const FileUpload: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    fileName: '',
    fileType: 'PDF',
    access: 'Private' as 'Public' | 'Private',
    tags: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { addFile } = useFiles();

  const fileTypes = ['PDF', 'DOCX', 'PPTX', 'XLSX', 'TXT', 'JPG', 'PNG', 'OTHER'];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({
        ...prev,
        fileName: prev.fileName || file.name,
        fileType: getFileType(file.name)
      }));
    }
  };

  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'PDF';
      case 'doc':
      case 'docx': return 'DOCX';
      case 'ppt':
      case 'pptx': return 'PPTX';
      case 'xls':
      case 'xlsx': return 'XLSX';
      case 'txt': return 'TXT';
      case 'jpg':
      case 'jpeg': return 'JPG';
      case 'png': return 'PNG';
      default: return 'OTHER';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!formData.fileName.trim()) {
      toast.error('Please enter a file name');
      return;
    }

    setIsUploading(true);

    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create file URL (in real app, this would be uploaded to storage)
      const fileUrl = URL.createObjectURL(selectedFile);

      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];

      addFile({
        fileName: formData.fileName,
        fileType: formData.fileType,
        fileSize: selectedFile.size,
        access: formData.access,
        tags: tagsArray,
        fileUrl
      });

      toast.success('File uploaded successfully!');
      
      // Reset form
      setFormData({
        fileName: '',
        fileType: 'PDF',
        access: 'Private',
        tags: ''
      });
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      toast.error('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-cyan-100 rounded-full">
            <Upload className="w-6 h-6 text-cyan-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">Upload New File</h2>
            <p className="text-gray-600">Add a new file to your vault</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              {selectedFile ? (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-gray-500" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, DOCX, PPTX, XLSX, images, and more
                  </p>
                  <input
                    type="file"
                    id="file-input"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                  />
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    className="mt-4"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* File Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-2">
                File Name
              </label>
              <input
                type="text"
                id="fileName"
                name="fileName"
                value={formData.fileName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Enter file name"
                required
              />
            </div>

            <div>
              <label htmlFor="fileType" className="block text-sm font-medium text-gray-700 mb-2">
                File Type
              </label>
              <select
                id="fileType"
                name="fileType"
                value={formData.fileType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                {fileTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="access" className="block text-sm font-medium text-gray-700 mb-2">
                Access Level
              </label>
              <select
                id="access"
                name="access"
                value={formData.access}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="Private">Private</option>
                <option value="Public">Public</option>
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (optional)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="e.g., homework, project, notes"
              />
              <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isUploading}
              disabled={!selectedFile}
              className="px-8"
            >
              <Plus className="w-5 h-5 mr-2" />
              Upload File
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;