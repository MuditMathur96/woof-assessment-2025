import React, { useState, useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  maxFileSize?: number; // in bytes
  disabled?: boolean;
  onFilesChange: (files: File) => void;
  value:File | null
  className?: string;
  children?: React.ReactNode;
}


const FileUpload: React.FC<FileUploadProps> = ({
  accept = "*/*",
  disabled = false,
  className = "",
  children,
  value,
  onFilesChange
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);



  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      //process files
    }
  }, [disabled]);

  const openFileDialog = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);


  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          h-full relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          
          onChange={(e)=>onFilesChange(e.target.files![0])}
          disabled={disabled}
          className="hidden"
          aria-label="File upload input"
        />
        
        {children || (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {isDragOver ? 'Drop files here' : 'Upload files'}
              </p>
             
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {value?value.name:"Drag and drop files here, or click to browse"}
              </p>
            {!value &&  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Upload file upto 5MB
              </p>}
            </div>
          </div>
        )}
      </div>


     
    </div>
  );
};

export default FileUpload