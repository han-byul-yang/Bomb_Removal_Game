/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import _ from 'lodash'

import { BoardTileType } from 'types/boardTileType'

const openNearTilesRecursion = (board: BoardTileType[][], checkColumn: number, checkRow: number) => {
  if (board[checkColumn][checkRow].value === 0) {
    for (let i = checkColumn - 1; i < checkColumn + 2; i++) {
      for (let v = checkRow - 1; v < checkRow + 2; v++) {
        if (!board[i] || !board[i][v]) continue
        if (board[i][v].isOpen) continue
        board[i][v].isOpen = true
        openNearTilesRecursion(board, i, v)
      }
    }
  }
}

const openUntilValueTiles = (board: BoardTileType[][], selectedColumn: number, selctedRow: number) => {
  const newBoard = _.cloneDeep(board)

  if (board[selectedColumn][selctedRow].value === 0) {
    openNearTilesRecursion(newBoard, selectedColumn, selctedRow)
  }
  return newBoard
}

export default openUntilValueTiles
