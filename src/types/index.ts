export type Theme = 'light' | 'dark';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export type DetectionResult = {
  status: 'Fire' | 'No Fire' | 'Smoke' | null;
  confidence: number;
  timestamp: string;
  imageUrl: string;
};

export type ToastType = 'success' | 'error' | 'info';

export interface FileWithPreview extends File {
  preview?: string;
}