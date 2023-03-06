import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import makeGameBoard from 'utils/makeGameBoard'
import { RootState } from 'store'
import { setNewBoard } from 'store/boardSlice'

import styles from './gameBoard.module.scss'

const GameBoard = () => {
  const { column, row, bomb } = useSelector((state: RootState) => state.gameSetting.gameSettingInfo)
  const gameBoard = useSelector((state: RootState) => state.board.boardInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    const newBoard = makeGameBoard(column, row)
    dispatch(setNewBoard({ newBoard }))
  }, [column, dispatch, row])

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
                        <button type='button'> </button>
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
