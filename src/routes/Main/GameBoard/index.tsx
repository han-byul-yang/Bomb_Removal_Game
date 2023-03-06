import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import makeGameBoard from 'utils/makeGameBoard'
import putRandomBombInBoard from 'utils/putRandomBombInBoard'
import putValuesInBoard from 'utils/putValuesInBoard'
import { RootState } from 'store'
import { setNewBoard, setOpenBoardTile } from 'store/boardSlice'

import styles from './gameBoard.module.scss'

const GameBoard = () => {
  const [countClicked, setCountClicked] = useState(0)
  const { column, row, bomb } = useSelector((state: RootState) => state.gameSetting.gameSettingInfo)
  const gameBoard = useSelector((state: RootState) => state.board.boardInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    const newBoard = makeGameBoard(column, row)
    dispatch(setNewBoard({ newBoard }))
  }, [column, dispatch, row])

  const handleFirstTileClick = (selectedColumn: number, selectedRow: number) => {
    const bombSettedBoard = putRandomBombInBoard(gameBoard, column, row, bomb, selectedColumn, selectedRow)
    const valueSettedBoard = putValuesInBoard(bombSettedBoard)
    dispatch(setNewBoard({ newBoard: valueSettedBoard }))
  }

  const handleOpenTileClick = (selectedColumn: number, selectedRow: number, value: number) => {
    setCountClicked((prevCount) => prevCount + 1)
    if (countClicked === 0) {
      handleFirstTileClick(selectedColumn, selectedRow)
    }
    if (value !== 0 && value !== -1) {
      dispatch(setOpenBoardTile({ selectedColumn, selectedRow }))
    }
  }

  return (
    <div className={styles.gameBoard}>
      <ul>
        {gameBoard?.map((columnTiles, icolumnTiles) => {
          const columnKey = `column-${icolumnTiles}`
          return (
            <li key={columnKey} className={styles.columnTiles}>
              <ul className={styles.columnTiles}>
                {columnTiles.map((tile, iTile) => {
                  const tileKey = `tile-${iTile}`
                  return (
                    <li key={tileKey} className={styles.tile}>
                      {tile && tile.isOpen ? (
                        <button type='button'>{tile.value}</button>
                      ) : (
                        <button type='button' onClick={() => handleOpenTileClick(icolumnTiles, iTile, tile?.value)}>
                          {' '}
                        </button>
                      )}
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default GameBoard
