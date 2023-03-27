/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { BoardTileType } from 'types/boardTileType'

const getTileValue = (board: BoardTileType[][], rowCheck: number, columnCheck: number) => {
  let tileValue = 0
  for (let i = rowCheck - 1; i < rowCheck + 2; i++) {
    for (let v = columnCheck - 1; v < columnCheck + 2; v++) {
      if (!board[i] || !board[i][v]) continue
      if (board[i][v].isBomb) tileValue += 1
    }
  }
  return tileValue
}

export default getTileValue
