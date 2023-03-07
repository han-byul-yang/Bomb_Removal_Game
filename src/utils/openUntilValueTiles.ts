/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import _ from 'lodash'

import { BoardTileType } from 'types/boardTileType'

// 대상 타일(유저의 클릭으로 선택된 타일 또는 순회하는 타일 주변의 8개 타일들)이 value값 0을 가지는 경우 주변 8개의 타일을 open한다.
// open한 타일들 중 value값이 0인 타일들이 있을 경우 그 타일들이 각각 대상 타일이 되고 동작을 반복한다.
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
  openNearTilesRecursion(newBoard, selectedColumn, selctedRow)
  return newBoard
}

export default openUntilValueTiles
