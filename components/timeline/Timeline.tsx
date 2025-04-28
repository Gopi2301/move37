"use client"
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { addScene, removeScene, Scene } from "@/lib/redux/slices/timelineSlice";
import { Button } from "@/components/ui/Button";
import { nanoid } from "nanoid";

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

  return (
    <div className="p-4 border rounded bg-background">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Timeline Scenes</h3>
        <Button size="sm" variant="default" onClick={handleAddScene}>+ Add Scene</Button>
      </div>
      <div className="flex flex-row gap-4 overflow-x-auto py-2">
        {scenes.map((scene) => (
          <div key={scene.id} className="min-w-[120px] bg-white dark:bg-gray-900 border rounded-lg shadow p-2 flex flex-col items-center">
            <span className="font-medium text-sm mb-1">{scene.label}</span>
            <span className="text-xs text-gray-500">{scene.start}s - {scene.end}s</span>
            <Button size="sm" variant="destructive" className="mt-2" onClick={() => handleRemoveScene(scene.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
