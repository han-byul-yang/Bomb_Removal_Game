import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tileClicked: 0,
}

const clickSlice = createSlice({
  name: 'clickSlice',
  initialState,
  reducers: {
    setClickCount: (state) => {
      state.tileClicked += 1
    },
    setInitCount: (state) => {
      state.tileClicked = 0
    },
  },
})

export const { setClickCount, setInitCount } = clickSlice.actions
export default clickSlice
