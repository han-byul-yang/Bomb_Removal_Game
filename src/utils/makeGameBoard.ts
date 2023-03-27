/* eslint-disable no-plusplus */

// column * row의 빈 행렬 보드 생성
function makeGameBoard(row: number, column: number) {
  const tileInfo = { value: 0, isOpen: false, isFlag: false, isBomb: false }
  const board = new Array(row)
  for (let i = 0; i < row; i++) {
    board[i] = new Array(column).fill(tileInfo)
  }

  return board
}
export default makeGameBoard
