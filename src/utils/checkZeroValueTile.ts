/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import _ from 'lodash'

import { BoardTileType } from 'types/boardTileType'

function checkRowValueZero(board: BoardTileType[][], row: number, checkColumn: number, selectedRow: number) {
  const newBoard = _.cloneDeep(board)
  for (let i = selectedRow; i < row; i++) {
    if (newBoard[checkColumn][i].value === 0) newBoard[checkColumn][i].isOpen = true
    else break
  }
  // 중복 부분
  for (let i = selectedRow; i >= 0; i--) {
    if (newBoard[checkColumn][i].value === 0) newBoard[checkColumn][i].isOpen = true
    else break
  }
  return newBoard
}

function checkColumnValueZero(board: BoardTileType[][], column: number, checkRow: number, selectedColumn: number) {
  const newBoard = _.cloneDeep(board)
  for (let i = selectedColumn + 1; i < column; i++) {
    if (newBoard[i][checkRow].value === 0) {
      newBoard[i][checkRow].isOpen = true
    } else break
  }
  for (let i = selectedColumn - 1; i >= 0; i--) {
    if (newBoard[i][checkRow].value === 0) {
      newBoard[i][checkRow].isOpen = true
    } else break
  }

  return newBoard
}

function checkZeroValueTile(
  board: BoardTileType[][],
  row: number,
  column: number,
  selectedColumn: number,
  selectedRow: number
) {
  const checkedRowZeroValueBoard = checkRowValueZero(board, row, selectedColumn, selectedRow)
  for (let i = 0; i < row; i++) {
    if (checkedRowZeroValueBoard[selectedColumn][i].value === 0 && checkedRowZeroValueBoard[selectedColumn][i].isOpen) {
      const checkedColumnZeroValueBoard = checkColumnValueZero(checkedRowZeroValueBoard, column, i, selectedColumn)
    } else {
      continue
    }
  }
}
