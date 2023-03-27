import { Dispatch, useEffect, MouseEvent, SetStateAction, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import cx from 'classnames'

import makeGameBoard from 'utils/makeGameBoard'
import putRandomBombInBoard from 'utils/putRandomBombInBoard'
import openUntilValueTiles from 'utils/openUntilValueTiles'
import getTileValue from 'utils/getTileValue'
import { RootState } from 'store'
import { setAddFlag, setDeleteFlag, setNewBoard, setOpenBoardBomb, setOpenBoardTile } from 'store/boardSlice'
import { setClickCount } from 'store/clickSlice'
import { setAddCountBomb, setAllocateCountBomb, setDecreaseCountBomb } from 'store/bombCountSlice'

import { BombIcon, FlagIcon } from 'assets/svgs'
import styles from './gameBoard.module.scss'

interface GameBoardProps {
  isBombError: boolean
  setIsBombError: Dispatch<SetStateAction<boolean>>
  setStartTimer: Dispatch<SetStateAction<boolean>>
  setIsOpenWinModal: Dispatch<SetStateAction<boolean>>
}

const GameBoard = ({ isBombError, setIsBombError, setStartTimer, setIsOpenWinModal }: GameBoardProps) => {
  const { column, row, bomb } = useSelector((state: RootState) => state.gameSetting.gameSettingInfo)
  const gameBoard = useSelector((state: RootState) => state.board.boardInfo)
  const countClicked = useSelector((state: RootState) => state.click.tileClicked)
  const dispatch = useDispatch()
  const openTiles = _.flattenDeep(gameBoard).filter((tile) => tile?.isOpen)

  useEffect(() => {
    const newBoard = makeGameBoard(row, column)
    dispatch(setNewBoard({ newBoard }))
  }, [column, dispatch, row])

  const handleFirstTileClick = (selectedRow: number, selectedColumn: number) => {
    const bombSettedBoard = putRandomBombInBoard(gameBoard, row, column, bomb, selectedRow, selectedColumn)
    const openedNearTileBoard = openUntilValueTiles(bombSettedBoard, selectedRow, selectedColumn)
    dispatch(setNewBoard({ newBoard: openedNearTileBoard }))
    dispatch(setAllocateCountBomb({ bomb }))
    setStartTimer(true)
  }

  const handleOpenTileClick = (selectedRow: number, selectedColumn: number) => {
    const tileValue = getTileValue(gameBoard, selectedRow, selectedColumn)
    const selectedTile = gameBoard[selectedRow][selectedColumn]
    dispatch(setClickCount())
    if (countClicked === 0) {
      handleFirstTileClick(selectedRow, selectedColumn)
      return
    }
    if (selectedTile.isBomb) {
      setIsBombError(true)
      setStartTimer(false)
      dispatch(setOpenBoardBomb())
      return
    }
    if (selectedTile.isFlag) {
      return
    }
    if (tileValue === 0 && countClicked !== 0) {
      const newBoard = openUntilValueTiles(gameBoard, selectedRow, selectedColumn)
      dispatch(setNewBoard({ newBoard }))
    }
    if (tileValue !== 0) {
      dispatch(setOpenBoardTile({ selectedColumn, selectedRow, value: tileValue }))
    }
    if (openTiles.length + 1 === column * row - bomb && tileValue !== -1) {
      setIsOpenWinModal(true)
      setStartTimer(false)
    }
  }

  const handleAddFlagClick = (e: MouseEvent<HTMLButtonElement>, selectedRow: number, selectedColumn: number) => {
    e.preventDefault()
    if (countClicked === 0) return
    if (gameBoard[selectedRow][selectedColumn].isFlag) {
      dispatch(setDeleteFlag({ selectedColumn, selectedRow }))
      dispatch(setAddCountBomb())
    } else {
      dispatch(setAddFlag({ selectedColumn, selectedRow }))
      dispatch(setDecreaseCountBomb())
    }
  }

  return (
    <div
      className={cx(styles.gameBoard, {
        [styles.bombError]: isBombError,
      })}
    >
      <ul>
        {gameBoard?.map((rowTiles, iRowTiles) => {
          const rowKey = `row-${iRowTiles}`
          return (
            <li key={rowKey} className={styles.rowTiles}>
              <ul className={styles.rowTiles}>
                {rowTiles.map((tile, iTile) => {
                  const tileKey = `tile-${iTile}`
                  return (
                    <li key={tileKey} className={styles.tile}>
                      {tile && tile.isOpen ? (
                        <button type='button' className={styles.openButton}>
                          {/* eslint-disable-next-line no-nested-ternary */}
                          {tile.isBomb ? (
                            <BombIcon className={styles.bombIcon} />
                          ) : tile.value === 0 ? (
                            'x'
                          ) : (
                            <p className={styles.tileValue}>{tile.value}</p>
                          )}
                        </button>
                      ) : (
                        <button
                          type='button'
                          className={styles.closeButton}
                          onClick={() => handleOpenTileClick(iRowTiles, iTile)}
                          onContextMenu={(e) => handleAddFlagClick(e, iRowTiles, iTile)}
                        >
                          {tile.isFlag ? <FlagIcon className={styles.flagIcon} /> : 0}
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

export default memo(GameBoard)
