/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import _ from 'lodash'

import { BoardTileType } from 'types/boardTileType'

// 빈 행렬보드에 클릭한 타일 주변 8개 타일을 제외한 곳에 랜덤으로 bomb(value === -1)과 데이터 객체 할당하기
function putRandomBombInBoard(
  board: BoardTileType[][],
  column: number,
  row: number,
  bomb: number,
  selectedColumn: number,
  selctedRow: number
) {
  const newBoard = _.cloneDeep(board.map((arr) => arr.map((obj) => _.cloneDeep(obj))))
  let loopCount = bomb
  for (let i = 0; i < loopCount; i++) {
    const randomNumber = Math.floor(Math.random() * (row * column))
    const randomNumberColumn = Math.floor(randomNumber / row)
    const randomNumberRow = randomNumber % row
    if (newBoard[randomNumberColumn][randomNumberRow].isBomb) {
      loopCount += 1
    } else if (
      (randomNumberColumn === selectedColumn && randomNumberRow === selctedRow) ||
      (randomNumberColumn === selectedColumn && randomNumberRow === selctedRow + 1) ||
      (randomNumberColumn === selectedColumn && randomNumberRow === selctedRow - 1) ||
      (randomNumberColumn === selectedColumn - 1 && randomNumberRow === selctedRow) ||
      (randomNumberColumn === selectedColumn - 1 && randomNumberRow === selctedRow + 1) ||
      (randomNumberColumn === selectedColumn - 1 && randomNumberRow === selctedRow - 1) ||
      (randomNumberColumn === selectedColumn + 1 && randomNumberRow === selctedRow) ||
      (randomNumberColumn === selectedColumn + 1 && randomNumberRow === selctedRow + 1) ||
      (randomNumberColumn === selectedColumn + 1 && randomNumberRow === selctedRow - 1)
    ) {
      loopCount += 1
    } else {
      newBoard[randomNumberColumn][randomNumberRow].isBomb = true
    }
  }

  return newBoard
}

export default putRandomBombInBoard
