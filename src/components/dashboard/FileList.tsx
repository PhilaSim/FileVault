import React, { useState } from 'react';
import { Download, Trash2, Edit, FileText, Lock, Unlock, Calendar, Tag, MoreVertical } from 'lucide-react';
import { useFiles } from '../../hooks/useFiles';
import { FileRecord } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import LoadingSpinner from '../ui/LoadingSpinner';
import toast from 'react-hot-toast';

const FileList: React.FC = () => {
  const { files, isLoading, deleteFile } = useFiles();
  const [selectedFile, setSelectedFile] = useState<FileRecord | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDownload = (file: FileRecord) => {
    if (file.fileUrl) {
      const link = document.createElement('a');
      link.href = file.fileUrl;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('File downloaded successfully!');
    } else {
      toast.error('File not available for download');
    }
  };

  const handleDelete = (file: FileRecord) => {
    setSelectedFile(file);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedFile) {
      deleteFile(selectedFile.id);
      toast.success('File deleted successfully!');
      setShowDeleteModal(false);
      setSelectedFile(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Files</h2>
          <p className="text-gray-600">Manage your uploaded files</p>
        </div>
        <div className="text-sm text-gray-500">
          {files.length} file(s) total
        </div>
      </div>

      {/* Files Grid */}
      {files.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No files yet</h3>
          <p className="text-gray-500 mb-6">Start by uploading your first file to see it here.</p>
          <Button variant="primary">
            Upload File
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <div key={file.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              {/* File Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getFileIcon(file.fileType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{file.fileName}</h3>
                    <p className="text-sm text-gray-500">{file.fileType}</p>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* File Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Size:</span>
                  <span className="text-gray-900">{formatFileSize(file.fileSize)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Uploaded:</span>
                  <span className="text-gray-900 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(file.uploadDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Access:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    file.access === 'Public' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {file.access === 'Public' ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                    {file.access}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {file.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center flex-wrap gap-1">
                    <Tag className="w-3 h-3 text-gray-400 mr-1" />
                    {file.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleDownload(file)}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(file)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete File"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <span className="font-medium">{selectedFile?.fileName}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Delete File
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FileList;