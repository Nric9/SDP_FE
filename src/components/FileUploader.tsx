import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileWarning, X, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { FileWithPreview, UploadStatus } from '../types';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  uploadStatus: UploadStatus;
  setUploadStatus: React.Dispatch<React.SetStateAction<UploadStatus>>;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  uploadStatus,
  setUploadStatus,
}) => {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Reset progress when upload status changes
  useEffect(() => {
    if (uploadStatus === 'idle' || uploadStatus === 'error') {
      setUploadProgress(0);
    }
  }, [uploadStatus]);

  // Simulate upload progress
  useEffect(() => {
    if (uploadStatus === 'uploading') {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [uploadStatus]);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const selectedFile = acceptedFiles[0];
      
      // File size validation (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit');
        return;
      }

      // Create preview
      const fileWithPreview = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      });

      setFile(fileWithPreview);
      onFileSelect(selectedFile);
      setUploadStatus('uploading');
    },
    [onFileSelect, setUploadStatus]
  );

  const removeFile = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setUploadStatus('idle');
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    disabled: uploadStatus === 'uploading' || uploadStatus === 'success',
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative p-8 border-2 border-dashed rounded-xl transition-all duration-200
          ${isDragActive ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10' : ''}
          ${isDragReject ? 'border-red-400 bg-red-50/50 dark:bg-red-900/10' : ''}
          ${
            !isDragActive && !isDragReject
              ? 'border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500'
              : ''
          }
          ${
            uploadStatus === 'uploading' || uploadStatus === 'success'
              ? 'opacity-70 cursor-not-allowed'
              : 'cursor-pointer'
          }
          bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
        `}
      >
        <input {...getInputProps()} />

        {file ? (
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <img 
                src={file.preview} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onLoad={() => { URL.revokeObjectURL(file.preview!) }}
              />
              {uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">Remove file</span>
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Image className="w-10 h-10 text-gray-400 dark:text-gray-300" />
            </div>
            <p className="text-center mb-2 text-gray-700 dark:text-gray-200 font-medium">
              {isDragActive ? 'Drop the image here' : 'Drag & drop image here'}
            </p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              or
            </p>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </button>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <FileWarning className="h-4 w-4" />
              <span>JPG, JPEG, PNG • Max 10MB</span>
            </div>
          </div>
        )}

        {uploadStatus === 'uploading' && (
          <div className="mt-4 w-full">
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 ease-in-out"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
              Analyzing image... {uploadProgress}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};