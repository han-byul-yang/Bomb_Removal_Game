import { createSlice } from '@reduxjs/toolkit'

import { BoardTileType } from 'types/boardTileType'

const initialState = {
  boardInfo: [[{ value: 0, isOpen: false, isFlag: false, isBomb: false }]] as BoardTileType[][],
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
      const { selectedRow, selectedColumn, value } = action.payload
      state.boardInfo[selectedRow][selectedColumn].isOpen = true
      state.boardInfo[selectedRow][selectedColumn].value = value
    },
    setOpenBoardBomb: (state) => {
      const bombBoard = state.boardInfo.map((board) =>
        board.map((item) => {
          if (item.isBomb) return { ...item, isOpen: true }
          return item
        })
      )
      state.boardInfo = bombBoard
    },
    setAddFlag: (state, action) => {
      const { selectedRow, selectedColumn } = action.payload
      state.boardInfo[selectedRow][selectedColumn].isFlag = true
    },
    setDeleteFlag: (state, action) => {
      const { selectedRow, selectedColumn } = action.payload
      state.boardInfo[selectedRow][selectedColumn].isFlag = false
    },
  },
})

export const { setNewBoard, setOpenBoardTile, setOpenBoardBomb, setAddFlag, setDeleteFlag } = boardSlice.actions
export default boardSlice
