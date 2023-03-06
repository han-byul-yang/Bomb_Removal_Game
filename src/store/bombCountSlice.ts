import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bombCount: 0,
}

const bombCountSlice = createSlice({
  name: 'bombCountSlice',
  initialState,
  reducers: {
    setInitBomb: (state) => {
      state.bombCount = 0
    },
    setAllocateBomb: (state, action) => {
      const { bomb } = action.payload
      state.bombCount = bomb
    },
    setDecreaseBomb: (state) => {
      state.bombCount -= 1
    },
  },
})

export const { setInitBomb, setDecreaseBomb, setAllocateBomb } = bombCountSlice.actions
export default bombCountSlice
