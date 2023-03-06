import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  timerSecond: 0,
}

const timerSlice = createSlice({
  name: 'timerSlice',
  initialState,
  reducers: {
    setIncreaseSecond: (state) => {
      state.timerSecond += 1
    },
    setInitSecond: (state) => {
      state.timerSecond = 0
    },
  },
})

export const { setIncreaseSecond, setInitSecond } = timerSlice.actions
export default timerSlice
