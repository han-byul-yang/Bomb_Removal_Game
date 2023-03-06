import { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import makeGameBoard from 'utils/makeGameBoard'
import { RootState } from 'store'
import { setNewBoard } from 'store/boardSlice'

import { SadIcon, SmileIcon } from 'assets/svgs'
import styles from './gameInfo.module.scss'

interface GameInfoProps {
  setCountClicked: Dispatch<React.SetStateAction<number>>
  isBombError: boolean
  setIsBombError: Dispatch<React.SetStateAction<boolean>>
}

const GameInfo = ({ setCountClicked, isBombError, setIsBombError }: GameInfoProps) => {
  const { column, row } = useSelector((state: RootState) => state.gameSetting.gameSettingInfo)
  const gameBoard = useSelector((state: RootState) => state.board.boardInfo)
  const dispatch = useDispatch()

  const handleRestartGameClick = () => {
    setIsBombError(false)
    setCountClicked(0)
    const newBoard = makeGameBoard(column, row)
    dispatch(setNewBoard({ newBoard }))
  }

  return (
    <div className={styles.informations}>
      <div>clicked num</div>
      {isBombError ? (
        <SadIcon className={styles.faceIcon} onClick={handleRestartGameClick} />
      ) : (
        <SmileIcon className={styles.faceIcon} />
      )}
      <div>timer</div>
    </div>
  )
}

export default GameInfo
