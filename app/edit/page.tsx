"use client";
import {useAppSelector} from "@/lib/redux/hook";

export default function EditPage() {
  const {currentVideo} = useAppSelector((state) => state.videos);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Video {currentVideo?.file.name}</h1>
      <p className="text-gray-600">This is a placeholder for the video editing feature.</p>
    </div>
  );
}
