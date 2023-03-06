import { configureStore } from '@reduxjs/toolkit'

import gameSettingSlice from './gameSettingSlice'
import boardSlice from './boardSlice'

const store = configureStore({
  reducer: {
    gameSetting: gameSettingSlice.reducer,
    board: boardSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
