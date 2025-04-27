import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {

    videos: [] as Video[],
    loading: false,
    error:  null as string | null, // Update the type of error to string | null
    currentVideo: null as {file: File; url:string} | null
}
interface Video {
    id: number,
    title: string,

}
const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        fetchVideosStart(state) {
            state.loading = true;
        },
        fetchVideosSuccess(state, action: PayloadAction<Video[]>) {
            state.loading = false;
            state.videos = action.payload;
        },
        fetchVideosFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentVideo(state, action:PayloadAction <{file: File; url:string} | null>) {
            state.currentVideo = action.payload;
        },
        clearCurrentVideo(state) {
            state.currentVideo = null;
        }
    }
});
export const { fetchVideosStart, fetchVideosSuccess, fetchVideosFailure, setCurrentVideo, clearCurrentVideo } = videoSlice.actions;
export const videoReducer = videoSlice.reducer;