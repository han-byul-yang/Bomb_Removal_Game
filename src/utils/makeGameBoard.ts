/* eslint-disable no-plusplus */

// column * row의 빈 행렬 보드 생성
function makeGameBoard(column: number, row: number) {
  const tileInfo = { value: 0, isOpen: false, isFlag: false, isBomb: false }
  const board = new Array(column)
  for (let i = 0; i < column; i++) {
    board[i] = new Array(row).fill(tileInfo)
  }

  return board
}
export default makeGameBoard
