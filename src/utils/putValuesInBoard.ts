/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { BoardTileType } from 'types/boardTileType'

// 주변 8개 타일의 bomb 개수 더하기
const bombCountNearTiles = (board: BoardTileType[][], checkColumn: number, checkRow: number) => {
  let bombCount = 0
  for (let i = checkColumn - 1; i < checkColumn + 2; i++) {
    for (let v = checkRow - 1; v < checkRow + 2; v++) {
      if (!board[i] || !board[i][v]) continue
      if (board[i][v].value === -1) bombCount += 1
    }
  }
  return bombCount
}

// 주변 bomb개수의 합을 보드 타일들의 value에 할당하기
function putValuesInBoard(board: BoardTileType[][]) {
  for (let i = 0; i < board.length; i++) {
    for (let v = 0; v < board[i].length; v++) {
      if (board[i][v]?.value) continue
      const bombCount = bombCountNearTiles(board, i, v)
      board[i][v] = { value: bombCount, isOpen: false, isFlag: false }
    }
  }

  return board
}

export default putValuesInBoard
