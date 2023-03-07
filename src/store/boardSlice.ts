import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

import { BoardTileType } from 'types/boardTileType'

const initialState = {
  boardInfo: [[{ value: 0, isOpen: false, isFlag: false }]] as BoardTileType[][],
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
    setOpenBoardBomb: (state) => {
      const bombBoard = state.boardInfo.map((board) =>
        board.map((item) => {
          if (item.value === -1) return { ...item, isOpen: true }
          return item
        })
      )
      state.boardInfo = bombBoard
    },
    setAddFlag: (state, action) => {
      const { selectedColumn, selectedRow } = action.payload
      state.boardInfo[selectedColumn][selectedRow].isFlag = true
    },
    setDeleteFlag: (state, action) => {
      const { selectedColumn, selectedRow } = action.payload
      state.boardInfo[selectedColumn][selectedRow].isFlag = false
    },
  },
})

export const { setNewBoard, setOpenBoardTile, setOpenBoardBomb, setAddFlag, setDeleteFlag } = boardSlice.actions
export default boardSlice
