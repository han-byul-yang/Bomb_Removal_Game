import { Dispatch, useEffect, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'

import makeGameBoard from 'utils/makeGameBoard'
import putRandomBombInBoard from 'utils/putRandomBombInBoard'
import putValuesInBoard from 'utils/putValuesInBoard'
import { RootState } from 'store'
import { setAddFlag, setDeleteFlag, setNewBoard, setOpenBoardBomb, setOpenBoardTile } from 'store/boardSlice'
import { setClickCount } from 'store/clickSlice'
import { setDecreaseBomb, setInitBomb } from 'store/bombCountSlice'

import { BombIcon, FlagIcon } from 'assets/svgs'
import styles from './gameBoard.module.scss'

interface GameBoardProps {
  isBombError: boolean
  setIsBombError: Dispatch<React.SetStateAction<boolean>>
  setStartTimer: Dispatch<React.SetStateAction<boolean>>
}

const GameBoard = ({ isBombError, setIsBombError, setStartTimer }: GameBoardProps) => {
  const { column, row, bomb } = useSelector((state: RootState) => state.gameSetting.gameSettingInfo)
  const gameBoard = useSelector((state: RootState) => state.board.boardInfo)
  const countClicked = useSelector((state: RootState) => state.click.tileClicked)
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
    setStartTimer(true)
    dispatch(setClickCount())
    if (countClicked === 0) {
      handleFirstTileClick(selectedColumn, selectedRow)
      dispatch(setInitBomb({ bomb }))
    }
    if (value === -1) {
      setIsBombError(true)
      dispatch(setOpenBoardBomb({ selectedColumn, selectedRow }))
      setStartTimer(false)
    }
    if (value !== 0 && value !== -1) {
      dispatch(setOpenBoardTile({ selectedColumn, selectedRow }))
    }
  }

  const handleAddFlagClick = (e: MouseEvent<HTMLButtonElement>, selectedColumn: number, selectedRow: number) => {
    e.preventDefault()
    if (countClicked !== 0) {
      dispatch(setDecreaseBomb())
    }
    if (countClicked !== 0) {
      if (gameBoard[selectedColumn][selectedRow].isFlag) dispatch(setDeleteFlag({ selectedColumn, selectedRow }))
      else dispatch(setAddFlag({ selectedColumn, selectedRow }))
    }
  }

  return (
    <div
      className={cx(styles.gameBoard, {
        [styles.bombError]: isBombError,
      })}
    >
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
                        <button type='button' className={styles.openButton}>
                          {/* eslint-disable-next-line no-nested-ternary */}
                          {tile.value === -1 ? (
                            <BombIcon className={styles.bombIcon} />
                          ) : tile.value === 0 ? (
                            'x'
                          ) : (
                            tile.value
                          )}
                        </button>
                      ) : (
                        <button
                          type='button'
                          className={styles.closeButton}
                          onClick={() => handleOpenTileClick(icolumnTiles, iTile, tile?.value)}
                          onContextMenu={(e) => handleAddFlagClick(e, icolumnTiles, iTile)}
                        >
                          {tile?.isFlag ? <FlagIcon className={styles.flagIcon} /> : 0}
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
