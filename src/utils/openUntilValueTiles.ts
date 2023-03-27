/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import _ from 'lodash'

import getTileValue from './getTileValue'
import { BoardTileType } from 'types/boardTileType'

// 클릭한 타일 또는 확인하는 대상 타일의 주변 8개의 타일을 검사(isOpen, isBomb, isFlag)한 후
// tileOpenTargetSet에 추가하여 대상 타일의 중복을 막는다.
function addTargetTilesInToSet(
  board: BoardTileType[][],
  tileOpenTargetSet: Set<string>,
  rowCheck: number,
  columnCheck: number
) {
  for (let i = rowCheck - 1; i < rowCheck + 2; i++) {
    for (let v = columnCheck - 1; v < columnCheck + 2; v++) {
      if (!board[i] || !board[i][v]) continue
      if (board[i][v].isOpen) continue
      if (board[i][v].isFlag) continue
      if (board[i][v].isBomb) continue
      tileOpenTargetSet.add(`${i},${v}`)
    }
  }
}

// addTargetTilesInToSet 함수에서 tileOpenTargetSet의 타일들을 forEach로 순회하면서 open한다.
// 이후 타일 값이 0인 타일만 다시 addTargetTilesInToSet을 이용한 주변 타일 검사 대상이 된다.
function openValueTiles(board: BoardTileType[][], tileOpenTargetSet: Set<string>) {
  tileOpenTargetSet.forEach((mark) => {
    const targetRow = Number(mark.split(',')[0])
    const targetColumn = Number(mark.split(',')[1])
    const tileValue = getTileValue(board, targetRow, targetColumn)
    board[targetRow][targetColumn].value = tileValue
    board[targetRow][targetColumn].isOpen = true
    if (tileValue !== 0) return
    addTargetTilesInToSet(board, tileOpenTargetSet, targetRow, targetColumn)
  })
}

function openUntilValueTiles(board: BoardTileType[][], selectedRow: number, selectedColumn: number) {
  const boardCopy = _.cloneDeep(board.map((arr) => arr.map((obj) => _.cloneDeep(obj))))
  const tileOpenTargetSet: Set<string> = new Set()
  addTargetTilesInToSet(boardCopy, tileOpenTargetSet, selectedRow, selectedColumn)
  openValueTiles(boardCopy, tileOpenTargetSet)
  return boardCopy
}

export default openUntilValueTiles
