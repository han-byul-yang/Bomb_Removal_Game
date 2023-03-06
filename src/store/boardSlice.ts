import { createSlice } from '@reduxjs/toolkit'

import { BoardTileType } from 'types/boardTileType'

const initialState = {
  boardInfo: [[{ value: 0, isOpen: false }]] as BoardTileType[][],
}

const boardSlice = createSlice({
  name: 'boardSlice',
  initialState,
  reducers: {
    setNewBoard: (state, action) => {
      const { newBoard } = action.payload
      state.boardInfo = newBoard
    },
  },
})

export const { setNewBoard } = boardSlice.actions
export default boardSlice
