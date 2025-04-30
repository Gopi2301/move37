import React, { useState } from "react";

// Type for a subtitle block
export interface SubtitleBlock {
  id: string;
  text: string;
  start: number; // in seconds
  end: number; // in seconds
  font: string;
  color: string;
  size: number;
  position: { x: number; y: number };
}

const defaultFont = "Arial";
const defaultColor = "#fff";
const defaultSize = 32;
const defaultPosition = { x: 50, y: 90 }; // percent (relative to video)

interface SubtitleManagerProps {
  onChange?: (subtitles: SubtitleBlock[]) => void;
}

interface InputState {
  text: string;
  start: number;
  end: number;
  font: string;
  color: string;
  size: number;
  position: { x: number; y: number };
  draggingIdx: number | null;
}

const SubtitleManager = ({ onChange }: SubtitleManagerProps) => {
  const [subtitles, setSubtitles] = useState<SubtitleBlock[]>([]);
  const [input, setInput] = useState<InputState>({
    text: "",
    start: 0,
    end: 2,
    font: defaultFont,
    color: defaultColor,
    size: defaultSize,
    position: defaultPosition,
    draggingIdx: null,
  });

  // Add subtitle block
  const addSubtitle = () => {
    if (!input.text.trim()) return;
    const newSubtitles = [
      ...subtitles,
      {
        ...input,
        id: Math.random().toString(36).slice(2),
      },
    ];
    setSubtitles(newSubtitles);
    setInput({ ...input, text: "", draggingIdx: null });
    if (onChange) onChange(newSubtitles);
  };

  // Remove subtitle block
  const removeSubtitle = (id: string) => {
    const newSubtitles = subtitles.filter(s => s.id !== id);
    setSubtitles(newSubtitles);
    if (onChange) onChange(newSubtitles);
  };

  // Change input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: name === "start" || name === "end" || name === "size"
        ? Number(value)
        : value,
    }));
  };

  // Change position handler
  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      position: {
        ...prev.position,
        [name]: Number(value),
      },
    }));
  };

  // Drag-and-drop for timing
  const onDragStart = (idx: number) => {
    setInput(prev => ({ ...prev, draggingIdx: idx }));
  };
  const onDragOver = () => {
    // No-op for now; can use to highlight
  };
  const onDrop = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) return;
    const reordered = [...subtitles];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    setSubtitles(reordered);
    if (onChange) onChange(reordered);
  };

  return (
    <div className="p-4 border rounded bg-background">
      <h3 className="font-semibold mb-2">Add Subtitle</h3>
      <div className="flex flex-wrap gap-2 mb-4 items-end">
        <input
          type="text"
          name="text"
          placeholder="Subtitle text"
          value={input.text}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-40"
        />
        <input
          type="number"
          name="start"
          placeholder="Start (s)"
          min={0}
          value={input.start}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-20"
        />
        <input
          type="number"
          name="end"
          placeholder="End (s)"
          min={0}
          value={input.end}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-20"
        />
        <select name="font" value={input.font} onChange={handleChange} className="border rounded px-2 py-1">
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
        <input
          type="color"
          name="color"
          value={input.color}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-10"
        />
        <input
          type="number"
          name="size"
          min={10}
          max={100}
          value={input.size}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-14"
        />
        <label className="text-xs">X%</label>
        <input
          type="number"
          name="x"
          min={0}
          max={100}
          value={input.position.x}
          onChange={handlePositionChange}
          className="border rounded px-2 py-1 w-12"
        />
        <label className="text-xs">Y%</label>
        <input
          type="number"
          name="y"
          min={0}
          max={100}
          value={input.position.y}
          onChange={handlePositionChange}
          className="border rounded px-2 py-1 w-12"
        />
        <button type="button" onClick={addSubtitle} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Subtitles</h4>
      <ul className="space-y-2">
        {subtitles.map((sub, idx) => (
          <li
            key={sub.id}
            className="flex items-center gap-2 bg-gray-100 rounded p-2"
            draggable
            onDragStart={() => onDragStart(idx)}
            onDragOver={e => { e.preventDefault(); onDragOver(); }}
            onDrop={() => {
              if (input.draggingIdx !== null) {
                onDrop(input.draggingIdx, idx);
              }
            }}
          >
            <span className="flex-1">[{sub.start}s - {sub.end}s] &quot;{sub.text}&quot;</span>
            <span style={{fontFamily: sub.font, color: sub.color, fontSize: sub.size, background: '#222', padding: '2px 6px', borderRadius: 4}}>
              {sub.text}
            </span>
            <button onClick={() => removeSubtitle(sub.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubtitleManager;
