/* eslint-disable no-continue */
/* eslint-disable no-plusplus */

import { BoardTileType } from 'types/boardTileType'

function putValuesInBoard(board: BoardTileType[][]) {
  // if (!board[i - 1]) 식으로 해결할 수 있을 듯
  for (let i = 0; i < board.length; i++) {
    for (let v = 0; v < board[i].length; v++) {
      let valueCount = 0
      if (board[i][v]?.value) continue
      if (v > 0 && board[i][v - 1]?.value === -1) valueCount += 1
      if (v < board[i].length - 1 && board[i][v + 1]?.value === -1) valueCount += 1
      if (i > 0 && board[i - 1][v]?.value === -1) valueCount += 1
      if (i > 0 && v > 0 && board[i - 1][v - 1]?.value === -1) valueCount += 1
      if (i > 0 && v < board[i].length - 1 && board[i - 1][v + 1]?.value === -1) valueCount += 1
      if (i < board.length - 1 && board[i + 1][v]?.value === -1) valueCount += 1
      if (i < board.length - 1 && v > 0 && board[i + 1][v - 1]?.value === -1) valueCount += 1
      if (i < board.length - 1 && v < board[i].length - 1 && board[i + 1][v + 1]?.value === -1) valueCount += 1
      board[i][v] = { value: valueCount, isOpen: false }
    }
  }

  return board
}

export default putValuesInBoard
