# Move37 Video Editor

A modern, interactive video editor built with Next.js, React, and Redux. Supports video upload, timeline scene management, draggable overlays, and audio/image integration for creative video projects.

---

## Features

- **Video Upload & Preview:**
  - Upload your own videos and preview them instantly in the browser.
- **Timeline with Thumbnails:**
  - Visual timeline for organizing scenes, now with video thumbnails for quick navigation.
- **Scene Management:**
  - Add, remove, and reorder scenes with a simple drag-and-drop interface.
- **Audio & Image Overlays:**
  - Add audio tracks and overlay images to your video scenes.
- **Rendering & Download:**
  - Render the final video with all overlays and download the exported result.
- **Responsive UI:**
  - Clean, modern design with responsive layout for desktop and tablet.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## Usage

- **Upload a video** using the upload section.
- **Manage scenes** in the timeline. Each scene displays a video thumbnail for easy navigation.
- **Add overlays** like images or audio to enhance your video.
- **Render and download** the final video with all your edits.

---

## Code Structure

- `/components/preview/VideoPreview.tsx` – Main video preview and render actions
- `/components/timeline/Timeline.tsx` – Timeline with draggable scenes and thumbnails
- `/components/audio/AudioManager.tsx` – Manage audio overlays
- `/components/image-overlay/ImageOverlay.tsx` – Image overlay features

---