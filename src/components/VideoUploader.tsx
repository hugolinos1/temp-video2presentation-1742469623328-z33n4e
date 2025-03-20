
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Check, Upload, X, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const VideoUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const supportedFormats = ['video/mp4', 'video/avi', 'video/quicktime']; // mp4, avi, mov
  const maxSizeInBytes = 500 * 1024 * 1024; // 500MB
  const maxDurationInSeconds = 30 * 60; // 30 minutes

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!supportedFormats.includes(file.type)) {
      setFileError(`Unsupported file format. Please upload MP4, AVI, or MOV files.`);
      return false;
    }

    // Check file size
    if (file.size > maxSizeInBytes) {
      setFileError(`File is too large. Maximum size is 500MB.`);
      return false;
    }

    // Reset error state if validation passes
    setFileError(null);
    return true;
  };

  const checkVideoDuration = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        if (video.duration > maxDurationInSeconds) {
          setFileError(`Video is too long. Maximum duration is 30 minutes.`);
          resolve(false);
        } else {
          resolve(true);
        }
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        setFileError(`Could not validate video duration. Please try another file.`);
        resolve(false);
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      
      if (validateFile(droppedFile)) {
        const isValidDuration = await checkVideoDuration(droppedFile);
        if (isValidDuration) {
          setFile(droppedFile);
        }
      }
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      
      if (validateFile(selectedFile)) {
        const isValidDuration = await checkVideoDuration(selectedFile);
        if (isValidDuration) {
          setFile(selectedFile);
        }
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    setFile(null);
    setFileError(null);
    setUploadProgress(0);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Simulate completion delay
          setTimeout(() => {
            setIsUploading(false);
            toast({
              title: "Upload complete!",
              description: "Your video is ready for processing.",
            });
            navigate('/processing');
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-scale-in">
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 transition-all duration-200",
          "flex flex-col items-center justify-center text-center",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          fileError ? "border-destructive/50 bg-destructive/5" : "",
          (file && !fileError) ? "border-green-500/50 bg-green-500/5" : ""
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".mp4,.avi,.mov,video/mp4,video/avi,video/quicktime"
          onChange={handleFileInputChange}
        />

        {fileError ? (
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upload Error</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">{fileError}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={removeFile}
            >
              Try Again
            </Button>
          </div>
        ) : file ? (
          <div className="w-full space-y-4">
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              {isUploading ? (
                <Clock className="h-6 w-6 text-primary animate-pulse" />
              ) : (
                <Check className="h-6 w-6 text-green-500" />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium truncate max-w-md mx-auto">
                {file.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

            {isUploading ? (
              <div className="space-y-2 w-full max-w-md mx-auto">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
                </p>
              </div>
            ) : (
              <div className="flex space-x-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeFile}
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
                <Button
                  size="sm"
                  onClick={handleUpload}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upload your video</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Drag and drop your video file here, or click to browse your files.
                <br />
                MP4, AVI, or MOV (max 500MB, up to 30 minutes)
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
            >
              Browse Files
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
