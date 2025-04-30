import React, { useRef, useState } from "react";

interface OverlayImage {
  src: string;
  x: number; // percent
  y: number; // percent
  width: number; // percent
  height: number; // percent
  border: boolean;
  opacity: number;
  animation: boolean;
}

const defaultOverlay: OverlayImage = {
  src: "",
  x: 50,
  y: 50,
  width: 30,
  height: 30,
  border: false,
  opacity: 1,
  animation: false,
};

const ImageOverlay = () => {
  const [overlay, setOverlay] = useState<OverlayImage>(defaultOverlay);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setOverlay((prev) => ({ ...prev, src: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - overlay.x,
      y: e.clientY - overlay.y,
    };
  };
  const onMouseMove = (e: MouseEvent) => {
    if (dragging) {
      // Get parent dimensions
      const parent = document.getElementById("overlay-parent");
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      let newX = ((e.clientX - rect.left) / rect.width) * 100;
      let newY = ((e.clientY - rect.top) / rect.height) * 100;
      setOverlay((prev) => ({ ...prev, x: Math.max(0, Math.min(100, newX)), y: Math.max(0, Math.min(100, newY)) }));
    }
    if (resizing) {
      const parent = document.getElementById("overlay-parent");
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      let newWidth = ((e.clientX - rect.left) / rect.width) * 100 - overlay.x + overlay.width / 2;
      let newHeight = ((e.clientY - rect.top) / rect.height) * 100 - overlay.y + overlay.height / 2;
      setOverlay((prev) => ({ ...prev, width: Math.max(5, Math.min(100, newWidth)), height: Math.max(5, Math.min(100, newHeight)) }));
    }
  };
  const onMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  React.useEffect(() => {
    if (dragging || resizing) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }
  });

  // Style controls
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setOverlay((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "opacity" ? Number(value) : value,
    }));
  };

  return (
    <div className="p-4 border rounded bg-background">
      <h3 className="font-semibold mb-2">Image Overlay</h3>
      <div className="mb-4 flex gap-2 items-center flex-wrap">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <label className="flex items-center gap-1">
          <input type="checkbox" name="border" checked={overlay.border} onChange={handleChange} /> Border
        </label>
        <label className="flex items-center gap-1">
          Opacity
          <input type="range" name="opacity" min={0.1} max={1} step={0.01} value={overlay.opacity} onChange={handleChange} />
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" name="animation" checked={overlay.animation} onChange={handleChange} /> Animation
        </label>
      </div>
      <div
        id="overlay-parent"
        className="relative w-full h-64 bg-black rounded flex items-center justify-center overflow-hidden"
        style={{ minHeight: 256 }}
      >
        <span className="text-white opacity-20 text-6xl select-none absolute inset-0 flex items-center justify-center">VIDEO</span>
        {overlay.src && (
          <div
            style={{
              position: "absolute",
              left: `${overlay.x}%`,
              top: `${overlay.y}%`,
              width: `${overlay.width}%`,
              height: `${overlay.height}%`,
              transform: "translate(-50%, -50%)",
              border: overlay.border ? "2px solid #fff" : undefined,
              opacity: overlay.opacity,
              transition: overlay.animation ? "all 0.5s cubic-bezier(.4,2,.6,1)" : "box-shadow 0.2s, border 0.2s, opacity 0.2s, transform 0.2s",
              boxShadow: overlay.border ? "0 0 10px #fff8" : undefined,
              cursor: dragging ? "grabbing" : "grab",
              zIndex: 10,
              background: "rgba(255,255,255,0.01)",
              filter: dragging ? "drop-shadow(0 0 8px #3b82f6)" : undefined,
            }}
            onMouseDown={onMouseDown}
          >
            <img src={overlay.src} alt="overlay" style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", userSelect: "none" }} />
            {/* Resize handle */}
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 16,
                height: 16,
                background: "#fff8",
                borderRadius: 8,
                border: "1px solid #ccc",
                cursor: "nwse-resize",
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseDown={e => {
                e.stopPropagation();
                setResizing(true);
                resizeStart.current = { x: e.clientX, y: e.clientY, width: overlay.width, height: overlay.height };
              }}
            >
              <svg width={12} height={12}>
                <rect x={2} y={2} width={8} height={8} fill="#888" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageOverlay;
