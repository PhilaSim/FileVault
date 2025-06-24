import React, { useState, useMemo } from 'react';
import { Search, Filter, X, FileText, Calendar, Tag, Lock, Unlock } from 'lucide-react';
import { useFiles } from '../../hooks/useFiles';
import { FileRecord } from '../../types';
import Button from '../ui/Button';

const FileSearch: React.FC = () => {
  const { files } = useFiles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('');
  const [selectedAccess, setSelectedAccess] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [dateRange, setDateRange] = useState('');

  // Get unique values for filters
  const fileTypes = useMemo(() => {
    const types = [...new Set(files.map(f => f.fileType))];
    return types.sort();
  }, [files]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    files.forEach(file => {
      file.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [files]);

  // Filter files based on search criteria
  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // File type filter
      const matchesFileType = selectedFileType === '' || file.fileType === selectedFileType;

      // Access filter
      const matchesAccess = selectedAccess === '' || file.access === selectedAccess;

      // Tag filter
      const matchesTag = selectedTag === '' || file.tags.includes(selectedTag);

      // Date range filter
      const matchesDate = dateRange === '' || (() => {
        const uploadDate = new Date(file.uploadDate);
        const now = new Date();
        
        switch (dateRange) {
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return uploadDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return uploadDate >= monthAgo;
          case 'year':
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            return uploadDate >= yearAgo;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesFileType && matchesAccess && matchesTag && matchesDate;
    });
  }, [files, searchQuery, selectedFileType, selectedAccess, selectedTag, dateRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFileType('');
    setSelectedAccess('');
    setSelectedTag('');
    setDateRange('');
  };

  const activeFiltersCount = [
    searchQuery,
    selectedFileType,
    selectedAccess,
    selectedTag,
    dateRange
  ].filter(Boolean).length;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Search Files</h2>
          <p className="text-gray-600">Find and filter your files</p>
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-500"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filters ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search files by name or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
            <select
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {fileTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
            <select
              value={selectedAccess}
              onChange={(e) => setSelectedAccess(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">All Access</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Search Results ({filteredFiles.length})
          </h3>
          <Filter className="w-5 h-5 text-gray-400" />
        </div>

        {filteredFiles.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-500">
              {activeFiltersCount > 0 
                ? 'Try adjusting your search criteria or filters'
                : 'No files match your current search'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredFiles.map((file) => (
              <div key={file.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{file.fileName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{file.fileType}</span>
                        <span>{formatFileSize(file.fileSize)}</span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(file.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {file.tags.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Tag className="w-3 h-3 text-gray-400" />
                        <div className="flex space-x-1">
                          {file.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {file.tags.length > 2 && (
                            <span className="text-xs text-gray-500">+{file.tags.length - 2}</span>
                          )}
                        </div>
                      </div>
                    )}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      file.access === 'Public' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {file.access === 'Public' ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                      {file.access}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileSearch;