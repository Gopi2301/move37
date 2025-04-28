"use client"
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { addScene, removeScene, Scene } from "@/lib/redux/slices/timelineSlice";
import { Button } from "@/components/ui/Button";
import { nanoid } from "nanoid";
import DraggableScene from "../draggableScene/DraggableScene";
const Timeline = () => {
  const scenes = useSelector((state: RootState) => state.timeline.scenes);
  const dispatch = useDispatch();

  const handleAddScene = () => {
    const newScene: Scene = {
      id: nanoid(),
      label: `Scene ${scenes.length + 1}`,
      start: scenes.length > 0 ? scenes[scenes.length - 1].end : 0,
      end: (scenes.length > 0 ? scenes[scenes.length - 1].end : 0) + 10,
    };
    dispatch(addScene(newScene));
  };

  const handleRemoveScene = (id: string) => {
    dispatch(removeScene(id));
  };
  const moveScene =(fromIndex:number, toIndex:number) => {
    const updatedScenes = [...scenes];
    const [movedScene] = updatedScenes.splice(fromIndex, 1);
    updatedScenes.splice(toIndex, 0, movedScene);
    dispatch({ type: 'timeline/reorderScenes', payload: { from: fromIndex, to: toIndex } });
  };

  return (
    <div className="p-4 border rounded bg-background">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Timeline Scenes</h3>
        <Button size="sm" variant="default" onClick={handleAddScene}>+ Add Scene</Button>
      </div>
      <div className="flex flex-row gap-4 overflow-x-auto py-2 bg-gray-200 dark:bg-gray-800 rounded-lg min-h-[100px] items-end relative">
        {/* Timeline horizontal strip */}
        <div className="absolute left-0 right-0 top-1/2 h-2 bg-blue-400/40 rounded-full -translate-y-1/2 z-0"></div>
        {scenes.map((scene, index) => (
          <div key={scene.id} className="relative z-10 flex flex-col items-center">
            {/* Marker/thumbnail for each scene */}
            <div className="w-12 h-16 bg-white dark:bg-gray-900 border-2 border-blue-400 rounded shadow flex items-center justify-center mb-1">
              {/* Placeholder for frame/thumbnail */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="28" height="28" rx="4" fill="#E0E7EF" stroke="#60A5FA" strokeWidth="2" />
                <path d="M8 24L14 18L18 22L24 16" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {/* DraggableScene below marker */}
            <DraggableScene
              scene={scene}
              index={index}
              moveScene={moveScene}
              handleRemoveScene={handleRemoveScene}
            />
          </div>
        ))}
      </div>
    </div>

  );
};

export default Timeline;
