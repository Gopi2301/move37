import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react';
import { Scene } from '@/lib/redux/slices/timelineSlice'
import { Button } from '../ui/Button';

interface SceneItemProps {
  scene: Scene;
  index: number;
  moveScene: (fromIndex: number, toIndex: number) => void;
  handleRemoveScene: (id: string) => void;
}
const DraggableScene = ({scene, index, moveScene, handleRemoveScene}: SceneItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const[, drop] = useDrop({
    accept:'SCENE',
    hover(item:{index:number}, monitor){
        if(!ref.current) return;
        const dragIndex = item.index;
        const hoverIndex = index;
        if(dragIndex === hoverIndex) return;
        moveScene(dragIndex, hoverIndex);
        item.index = hoverIndex;
    }
  })
  const [{isDragging}, drag] = useDrag({
    type:'SCENE',
    item: {index},
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
    })
    drag(drop(ref));
    return (
    <div
      ref={ref}
      className={`min-w-[120px] bg-white dark:bg-gray-900 border rounded-lg shadow p-3 flex flex-col items-center cursor-move transition-opacity ${isDragging ? 'opacity-50' : ''}`}
    >
      <span className="font-medium text-sm mb-1">{scene.label}</span>
      <span className="text-xs text-gray-500">{scene.start}s - {scene.end}s</span>
      <Button size='sm' variant='destructive' className='mt-2' onClick={() => handleRemoveScene(scene.id)}>
        Remove
      </Button>
    </div>
  )
}

export default DraggableScene