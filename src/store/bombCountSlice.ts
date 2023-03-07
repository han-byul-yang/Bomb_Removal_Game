import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bombCount: 0,
}

const bombCountSlice = createSlice({
  name: 'bombCountSlice',
  initialState,
  reducers: {
    setInitCountBomb: (state) => {
      state.bombCount = 0
    },
    setAllocateCountBomb: (state, action) => {
      const { bomb } = action.payload
      state.bombCount = bomb
    },
    setDecreaseCountBomb: (state) => {
      state.bombCount -= 1
    },
    setAddCountBomb: (state) => {
      state.bombCount += 1
    },
  },
})

export const { setInitCountBomb, setDecreaseCountBomb, setAllocateCountBomb, setAddCountBomb } = bombCountSlice.actions
export default bombCountSlice
