import React, { useState, useRef } from "react";
import { GripVertical, Volume2, VolumeX, Music } from "lucide-react";
import Image from 'next/image';

// Mock audio tracks
const initialTracks = [
  { id: "1", name: "Voice Over", muted: false },
  { id: "2", name: "Sound Effect", muted: false },
];

const AudioManager = () => {
  const [tracks, setTracks] = useState(initialTracks);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Rearranging tracks (drag and drop)
  const moveTrack = (from: number, to: number) => {
    if (from === to) return;
    const updated = [...tracks];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setTracks(updated);
  };

  // Toggle mute
  const toggleMute = (id: string) => {
    setTracks(tracks => tracks.map(t => t.id === id ? { ...t, muted: !t.muted } : t));
  };

  // Remove track
  const removeTrack = (id: string) => {
    setTracks(tracks => tracks.filter(t => t.id !== id));
  };

  // Add background music (stub)
  const addMusic = () => {
    setTracks(tracks => [
      ...tracks,
      { id: Math.random().toString(), name: "Background Music", muted: false }
    ]);
  };

  return (
    <div className="p-4 border rounded bg-background">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Audio Tracks</h3>
        <button onClick={addMusic} className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          <Music size={18}/> Add Background Music
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {tracks.map((track, idx) => (
          <div
            key={track.id}
            className="flex items-center gap-3 bg-gray-200 dark:bg-gray-800 rounded p-2 shadow relative"
            draggable
            onDragStart={() => { dragItem.current = idx; }}
            onDragEnter={() => { dragOverItem.current = idx; }}
            onDragEnd={() => {
              if (
                dragItem.current !== null &&
                dragOverItem.current !== null &&
                dragItem.current !== dragOverItem.current
              ) {
                moveTrack(dragItem.current, dragOverItem.current);
              }
              dragItem.current = null;
              dragOverItem.current = null;
            }}
            onDragOver={e => e.preventDefault()}
            style={{ opacity: dragItem.current === idx ? 0.5 : 1, cursor: 'grab' }}
          >
            {/* Drag handle */}
            <div className="cursor-move text-gray-400 hover:text-gray-600">
              <GripVertical size={20}/>
            </div>
            {/* Mock waveform */}
            <div className="w-40 h-8 flex items-center justify-center mr-2">
              <Image src="/audio.png" alt="waveform" width={160} height={32} style={{objectFit: 'contain'}} />
            </div>
            {/* Track name */}
            <span className="font-medium mr-2">{track.name}</span>
            {/* Mute/unmute */}
            <button onClick={() => toggleMute(track.id)} className={`ml-auto px-2 py-1 rounded ${track.muted ? 'bg-gray-400' : 'bg-blue-500 text-white'} hover:bg-blue-600`}>
              {track.muted ? <VolumeX size={18}/> : <Volume2 size={18}/>}
            </button>
            {/* Remove */}
            <button onClick={() => removeTrack(track.id)} className="ml-2 px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioManager;
