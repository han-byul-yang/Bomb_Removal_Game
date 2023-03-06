import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

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
    setOpenBoardBomb: (state, action) => {
      const { selectedColumn, selectedRow } = action.payload
      const searchItem = { value: -1, isOpen: false }
      /* const bombBoardIndexs = _.find(board, (subArray) => {
        const index = _.findIndex(subArray, { value: -1 })
        return index !== -1
      }) */
      /* const bombBoardIndexs = _.flatMap(board, (subArray, index) => {
        return _.filter(subArray, { value: -1 }).map(() => subArray)
      }) */
      state.boardInfo[selectedColumn][selectedRow].isOpen = true
    },
  },
})

export const { setNewBoard, setOpenBoardTile, setOpenBoardBomb } = boardSlice.actions
export default boardSlice
