import { configureStore } from '@reduxjs/toolkit'

import gameSettingSlice from './gameSettingSlice'
import boardSlice from './boardSlice'
import bombCountSlice from './bombCountSlice'
import timerSlice from './timerSlice'
import clickSlice from './clickSlice'

const store = configureStore({
  reducer: {
    gameSetting: gameSettingSlice.reducer,
    board: boardSlice.reducer,
    bombCount: bombCountSlice.reducer,
    timer: timerSlice.reducer,
    click: clickSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
