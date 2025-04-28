import { configureStore } from '@reduxjs/toolkit'
import { videoReducer } from './slices/videoSlice'
import { timelineReducer } from './slices/timelineSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      videos: videoReducer,
      timeline: timelineReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export default makeStore
export const store = makeStore()