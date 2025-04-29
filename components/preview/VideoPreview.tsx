import React, { useRef, useEffect, useState } from "react";
import type { SubtitleBlock } from "@/components/subtitles/SubtitleManager";

interface VideoPreviewProps {
  subtitles?: SubtitleBlock[];
}

const mockVideoDuration = 10; // seconds

const VideoPreview: React.FC<VideoPreviewProps> = ({ subtitles = [] }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate video playback
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTime((t) => {
        if (t >= mockVideoDuration) return 0;
        return t + 0.1;
      });
    }, 100);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Filter subtitles to show at current time
  const activeSubtitles = subtitles.filter(
    (sub) => currentTime >= sub.start && currentTime <= sub.end
  );

  return (
    <div className="relative p-4 border rounded bg-background w-full h-64 flex items-center justify-center overflow-hidden">
      {/* Mock video area */}
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <span className="text-white opacity-20 text-6xl select-none">VIDEO</span>
      </div>
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
      {/* Timeline scrubber */}
      <div className="absolute bottom-2 left-2 right-2">
        <input
          type="range"
          min={0}
          max={mockVideoDuration}
          step={0.01}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-white text-right mt-1">
          {currentTime.toFixed(1)}s / {mockVideoDuration}s
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
