/* eslint-disable no-plusplus */
import { BoardTileType } from 'types/boardTileType'

function putRandomBombInBoard(
  board: BoardTileType[][],
  column: number,
  row: number,
  bomb: number,
  selectedColumn?: number,
  selctedRow?: number
) {
  const newBoard = [...board]
  let loopCount = bomb

  for (let i = 0; i < loopCount; i++) {
    const randomNumber = Math.floor(Math.random() * (row * column))
    const randomNumberColumn = Math.floor(randomNumber / row)
    const randomNumberRow = randomNumber % row
    if (randomNumberColumn === selectedColumn && randomNumberRow === selctedRow) loopCount += 1
    else if (newBoard[randomNumberColumn][randomNumberRow]) loopCount += 1
    else {
      newBoard[randomNumberColumn][randomNumberRow] = { value: -1, isOpen: false }
    }
  }
  return newBoard
}

export default putRandomBombInBoard
