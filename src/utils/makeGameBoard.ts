/* eslint-disable no-plusplus */
function makeGameBoard(column: number, row: number) {
  const columnArray = new Array(column)
  const board = [...columnArray]
  for (let i = 0; i < column; i++) {
    board[i] = new Array(row).fill(undefined)
  }
  return board
}

export default makeGameBoard
