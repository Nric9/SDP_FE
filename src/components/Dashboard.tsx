import React, { useState } from 'react';
import { FileUploader } from './FileUploader';
import { ResultsCard } from './ResultsCard';
import { DetectionResult, UploadStatus } from '../types';
import toast from 'react-hot-toast';

export const Dashboard: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setUploadStatus('uploading');
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Simulate detection result
      // In a real application, this would be an API call to your ML model
      const mockResults: DetectionResult = {
        status: Math.random() > 0.7 
          ? 'Fire' 
          : Math.random() > 0.5 
            ? 'Smoke' 
            : 'No Fire',
        confidence: Math.floor(70 + Math.random() * 30),
        timestamp: new Date().toLocaleString(),
        imageUrl: URL.createObjectURL(file),
      };
      
      setResult(mockResults);
      setUploadStatus('success');
      toast.success('Image analysis complete!');
    } catch (error) {
      console.error('Error processing image:', error);
      setUploadStatus('error');
      toast.error('Failed to analyze image. Please try again.');
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <section className="mb-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Forest Fire Detection
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Upload an image of a forest area to detect potential fire or smoke. Our system will analyze the image and provide results with confidence levels.
            </p>
          </div>
          
          <FileUploader 
            onFileSelect={handleFileSelect} 
            uploadStatus={uploadStatus}
            setUploadStatus={setUploadStatus}
          />
        </section>
        
        <ResultsCard 
          result={result} 
          isLoading={uploadStatus === 'uploading'} 
        />
      </div>
    </div>
  );
};