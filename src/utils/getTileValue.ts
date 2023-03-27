/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { BoardTileType } from 'types/boardTileType'

//  확인하려는 타일 주변 8개 타일의 bomb 개수를 확인해서 타일 값을 리턴
function getTileValue(board: BoardTileType[][], rowCheck: number, columnCheck: number) {
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
