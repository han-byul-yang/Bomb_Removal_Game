/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { BoardTileType } from 'types/boardTileType'

const valueNearTiles = (board: BoardTileType[][], checkColumn: number, checkRow: number) => {
  let valueCount = 0
  for (let i = checkColumn - 1; i < checkColumn + 2; i++) {
    for (let v = checkRow - 1; v < checkRow + 2; v++) {
      if (!board[i] || !board[i][v]) continue
      if (board[i][v].value === -1) valueCount += 1
    }
  }
  return valueCount
}

function putValuesInBoard(board: BoardTileType[][]) {
  for (let i = 0; i < board.length; i++) {
    for (let v = 0; v < board[i].length; v++) {
      if (board[i][v]?.value) continue
      const valueCount = valueNearTiles(board, i, v)
      board[i][v] = { value: valueCount, isOpen: false, isFlag: false }
    }
  }

  return board
}

export default putValuesInBoard
