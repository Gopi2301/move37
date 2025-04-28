"use client"
import { Button } from "@/components/ui/Button";
import VideoPreview from "@/components/preview/VideoPreview";
import ImageOverlay from "@/components/image-overlay/ImageOverlay";
import SubtitleManager from "@/components/subtitles/SubtitleManager";
import AudioManager from "@/components/audio/AudioManager";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Timeline from "@/components/timeline/Timeline";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function EditorPage() {
  return (
<DndProvider backend={HTML5Backend}>
   <div className="flex flex-col min-h-screen bg-background">
    <header className="px-8 py-4 flex justify-between ">
      <h1 className="h1">Video Editor</h1>
      <Button variant="outline">Export Video</Button>
    </header>
    <main className="flex flex-1 flex-col lg:flex-row gap-6 p-6">
       {/* Left: Timeline & Controls with Tabs */}
      <section className="flex-1 flex bg-gray-50 rounded-2xl ">
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="mb-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="subtitles">Subtitles</TabsTrigger>
          <TabsTrigger value="image">Image Overlay</TabsTrigger>
          </TabsList>
          <TabsContent value="timeline">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4">
                {/* <h2 className="font-semibold mb-2">Timeline</h2> */}
                {/* TODO: Timeline scenes, drag & reorder, cut/edit controls */}
                <Timeline />
              </div>
            </TabsContent>
            <TabsContent value="audio">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4">
                {/* <h2 className="font-semibold mb-2">Audio Management</h2> */}
                <AudioManager />
              </div>
            </TabsContent>
            <TabsContent value="subtitles">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4">
                {/* <h2 className="font-semibold mb-2">Subtitles & Text Overlay</h2> */}
                <SubtitleManager />
              </div>
            </TabsContent>
            <TabsContent value="image">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
                {/* <h2 className="font-semibold mb-2">Image Overlay</h2> */}
                <ImageOverlay />
              </div>
            </TabsContent>

        </Tabs>
      </section>
      {/* Right: Preview & Overlay */}
      <aside className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex-1 flex flex-col">
            <h2 className="font-semibold mb-2">Preview</h2>
            <VideoPreview />
            <div className="flex justify-end mt-4">
              <Button variant="default" loading="false">Render</Button>
            </div>
          </div>
        </aside>
    </main>
   </div>
</DndProvider>
  );
}
