import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bombCount: 0,
}

const bombCountSlice = createSlice({
  name: 'bombCountSlice',
  initialState,
  reducers: {
    setInitBomb: (state, action) => {
      const { bomb } = action.payload
      state.bombCount = bomb
    },
    setDecreaseBomb: (state) => {
      state.bombCount -= 1
    },
  },
})

export const { setInitBomb, setDecreaseBomb } = bombCountSlice.actions
export default bombCountSlice
