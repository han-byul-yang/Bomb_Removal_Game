import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  gameSettingInfo: {
    column: 8,
    row: 8,
    bomb: 10,
  },
}

const gameSettingSlice = createSlice({
  name: 'gameSettingSlice',
  initialState,
  reducers: {
    setBeginner: (state) => {
      state.gameSettingInfo = { column: 8, row: 8, bomb: 10 }
    },
    setIntermediate: (state) => {
      state.gameSettingInfo = { column: 16, row: 16, bomb: 40 }
    },
    setExpert: (state) => {
      state.gameSettingInfo = { column: 16, row: 32, bomb: 100 }
    },
    customSetting: (state, action) => {
      const { column, row, bomb } = action.payload
      state.gameSettingInfo = { column, row, bomb }
    },
  },
})

export const { setBeginner, setIntermediate, setExpert, customSetting } = gameSettingSlice.actions
export default gameSettingSlice
