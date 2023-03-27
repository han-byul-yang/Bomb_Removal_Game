/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { BoardTileType } from 'types/boardTileType'

const getTileValue = (board: BoardTileType[][], checkColumn: number, checkRow: number) => {
  let tileValue = 0
  for (let i = checkColumn - 1; i < checkColumn + 2; i++) {
    for (let v = checkRow - 1; v < checkRow + 2; v++) {
      if (!board[i] || !board[i][v]) continue
      if (board[i][v].isBomb) tileValue += 1
    }
  }
  return tileValue
}

export default getTileValue
