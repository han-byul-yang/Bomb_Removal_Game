import { configureStore } from '@reduxjs/toolkit'

import gameSettingSlice from './gameSettingSlice'

const store = configureStore({
  reducer: {
    gameSetting: gameSettingSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
