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
    setOpenBoardTile: (state, action) => {
      const { selectedColumn, selectedRow } = action.payload
      state.boardInfo[selectedColumn][selectedRow].isOpen = true
    },
  },
})

export const { setNewBoard, setOpenBoardTile } = boardSlice.actions
export default boardSlice
