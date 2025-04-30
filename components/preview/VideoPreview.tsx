import React, { useRef, useEffect, useState } from "react";
import type { SubtitleBlock } from "@/components/subtitles/SubtitleManager";

interface VideoPreviewProps {
  subtitles?: SubtitleBlock[];
}

const mockVideoDuration = 10; // seconds
const mockVideoSrc = "/sample.mp4"; // Place a sample video in public/sample.mp4 for demo

const VideoPreview: React.FC<VideoPreviewProps> = ({ subtitles = [] }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [rendering, setRendering] = useState(false);
  const [renderedUrl, setRenderedUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync video time with slider
  useEffect(() => {
    if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.1) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  // When video plays, update slider
  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  // Filter subtitles to show at current time
  const activeSubtitles = subtitles.filter(
    (sub) => currentTime >= sub.start && currentTime <= sub.end
  );

  // Mock render
  const handleRender = () => {
    setRendering(true);
    setRenderedUrl(null);
    setTimeout(() => {
      setRendering(false);
      setRenderedUrl("/exported.mp4"); // Simulate exported video
    }, 2000);
  };

  return (
    <div className="relative p-4 border rounded bg-background w-full h-96 flex flex-col items-center justify-center overflow-hidden">
      {/* Video area */}
      <div className="relative w-full h-64 flex items-center justify-center bg-black rounded overflow-hidden">
        <video
          ref={videoRef}
          src={mockVideoSrc}
          width={640}
          height={256}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          controls
        />
        {/* Subtitle overlays */}
        {activeSubtitles.map((sub) => (
          <span
            key={sub.id}
            style={{
              position: "absolute",
              left: `${sub.position.x}%`,
              top: `${sub.position.y}%`,
              transform: "translate(-50%, -50%)",
              fontFamily: sub.font,
              color: sub.color,
              fontSize: sub.size,
              background: "rgba(0,0,0,0.5)",
              padding: "2px 8px",
              borderRadius: 6,
              pointerEvents: "none",
              whiteSpace: "pre-line",
              zIndex: 10,
            }}
          >
            {sub.text}
          </span>
        ))}
      </div>
      {/* Timeline scrubber */}
      <div className="w-full mt-2">
        <input
          type="range"
          min={0}
          max={mockVideoDuration}
          step={0.01}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-700 text-right mt-1">
          {currentTime.toFixed(1)}s / {mockVideoDuration}s
        </div>
      </div>
      {/* Render & Export controls */}
      <div className="flex gap-4 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center transition duration-200 active:scale-95 shadow-md hover:shadow-lg relative group"
          onClick={handleRender}
          disabled={rendering}
          aria-label="Render the video with overlays"
        >
          {rendering ? (
            <svg className="animate-spin mr-2" width="20" height="20" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke="#fff" strokeWidth="5" strokeDasharray="90,150"/></svg>
          ) : null}
          {rendering ? "Rendering..." : "Render"}
          <span className="absolute left-1/2 -translate-x-1/2 -top-9 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded shadow transition pointer-events-none whitespace-nowrap z-20">Render the video with overlays</span>
        </button>
        {renderedUrl && (
          <a
            href={renderedUrl}
            download="exported.mp4"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 active:scale-95 shadow-md hover:shadow-lg relative group"
            aria-label="Download the exported video"
          >
            Download
            <span className="absolute left-1/2 -translate-x-1/2 -top-9 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded shadow transition pointer-events-none whitespace-nowrap z-20">Download the exported video</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
