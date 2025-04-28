import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Scene {
  id: string;
  label: string;
  start: number; // seconds
  end: number;   // seconds
}

interface TimelineState {
  scenes: Scene[];
}

const initialState: TimelineState = {
  scenes: [
    { id: "1", label: "Intro", start: 0, end: 10 },
    { id: "2", label: "Main Scene", start: 10, end: 50 },
    { id: "3", label: "Ending", start: 50, end: 60 },
  ],
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    addScene(state, action: PayloadAction<Scene>) {
      state.scenes.push(action.payload);
    },
    removeScene(state, action: PayloadAction<string>) {
      state.scenes = state.scenes.filter(scene => scene.id !== action.payload);
    },
    reorderScenes(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const [removed] = state.scenes.splice(from, 1);
      state.scenes.splice(to, 0, removed);
    },
    updateScene(state, action: PayloadAction<Scene>) {
      const idx = state.scenes.findIndex(s => s.id === action.payload.id);
      if (idx !== -1) {
        state.scenes[idx] = action.payload;
      }
    },
  },
});

export const { addScene, removeScene, reorderScenes, updateScene } = timelineSlice.actions;
export const timelineReducer = timelineSlice.reducer;
