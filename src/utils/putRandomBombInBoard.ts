/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import _ from 'lodash'

import { BoardTileType } from 'types/boardTileType'

// 행렬보드에 클릭한 타일 주변 8개 타일을 제외한 곳에 랜덤으로 bomb 할당하기
function putRandomBombInBoard(
  board: BoardTileType[][],
  row: number,
  column: number,
  bomb: number,
  selectedRow: number,
  selctedColumn: number
) {
  const boardCopy = _.cloneDeep(board.map((arr) => arr.map((obj) => _.cloneDeep(obj))))
  let loopCount = bomb
  for (let i = 0; i < loopCount; i++) {
    const randomNumber = Math.floor(Math.random() * (column * row))
    const randomNumberRow = Math.floor(randomNumber / column)
    const randomNumberColumn = randomNumber % column
    if (boardCopy[randomNumberRow][randomNumberColumn].isBomb) {
      loopCount += 1
    } else if (
      (randomNumberRow === selectedRow && randomNumberColumn === selctedColumn) ||
      (randomNumberRow === selectedRow && randomNumberColumn === selctedColumn + 1) ||
      (randomNumberRow === selectedRow && randomNumberColumn === selctedColumn - 1) ||
      (randomNumberRow === selectedRow - 1 && randomNumberColumn === selctedColumn) ||
      (randomNumberRow === selectedRow - 1 && randomNumberColumn === selctedColumn + 1) ||
      (randomNumberRow === selectedRow - 1 && randomNumberColumn === selctedColumn - 1) ||
      (randomNumberRow === selectedRow + 1 && randomNumberColumn === selctedColumn) ||
      (randomNumberRow === selectedRow + 1 && randomNumberColumn === selctedColumn + 1) ||
      (randomNumberRow === selectedRow + 1 && randomNumberColumn === selctedColumn - 1)
    ) {
      loopCount += 1
    } else {
      boardCopy[randomNumberRow][randomNumberColumn].isBomb = true
    }
  }

  return boardCopy
}

export default putRandomBombInBoard
