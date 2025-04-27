"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploading(true);
      setProgress(0);
      const file = acceptedFiles[0];
      setVideoFile(file);
      // Simulate upload progress
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.random() * 20 + 10;
        if (prog >= 100) {
          prog = 100;
          clearInterval(interval);
          setUploading(false);
          setVideoURL(URL.createObjectURL(file));
        }
        setProgress(prog);
      }, 300);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: false,
  });

  return (
    <div className="p-4 border rounded bg-background max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer h-48 mb-4 ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 dark:bg-gray-800"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-600 font-semibold">Drop the video here ...</p>
        ) : (
          <>
            <p className="font-medium text-gray-700 dark:text-gray-200">Drag & drop a video file here, or click to select</p>
            <p className="text-xs text-gray-400 mt-2">MP4, WebM, MOV, etc.</p>
          </>
        )}
      </div>

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {videoURL && !uploading && (
        <div className="mt-4">
          <video
            src={videoURL}
            controls
            className="w-full rounded shadow-md"
            poster=""
          />
          <div className="text-xs text-gray-500 mt-2">
            {videoFile?.name} ({(videoFile?.size! / 1024 / 1024).toFixed(2)} MB)
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
