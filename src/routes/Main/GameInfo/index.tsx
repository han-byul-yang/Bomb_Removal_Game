import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import makeGameBoard from 'utils/makeGameBoard'
import { setIncreaseSecond, setInitSecond } from 'store/timerSlice'
import { RootState } from 'store'
import { setNewBoard } from 'store/boardSlice'
import { setInitCount } from 'store/clickSlice'
import { setInitCountBomb } from 'store/bombCountSlice'

import { SadIcon, SmileIcon } from 'assets/svgs'
import styles from './gameInfo.module.scss'

interface GameInfoProps {
  startTimer: boolean
  setStartTimer: Dispatch<SetStateAction<boolean>>
  isBombError: boolean
  setIsBombError: Dispatch<SetStateAction<boolean>>
}

const GameInfo = ({ startTimer, setStartTimer, isBombError, setIsBombError }: GameInfoProps) => {
  const { column, row } = useSelector((state: RootState) => state.gameSetting.gameSettingInfo)
  const bombCount = useSelector((state: RootState) => state.bombCount.bombCount)
  const timerSecond = useSelector((state: RootState) => state.timer.timerSecond)
  const dispatch = useDispatch()

  useEffect(() => {
    let timerId: NodeJS.Timer
    if (startTimer) {
      timerId = setInterval(() => {
        dispatch(setIncreaseSecond())
      }, 1000)
    }

    return () => {
      clearInterval(timerId)
    }
  }, [dispatch, startTimer])

  const handleRestartGameClick = () => {
    setIsBombError(false)
    setStartTimer(false)
    const newBoard = makeGameBoard(column, row)
    dispatch(setNewBoard({ newBoard }))
    dispatch(setInitCount())
    dispatch(setInitSecond())
    dispatch(setInitCountBomb())
  }

  return (
    <div className={styles.informations}>
      <div className={styles.infoItem}>{bombCount}</div>
      {isBombError ? (
        <SadIcon className={styles.faceIcon} onClick={handleRestartGameClick} />
      ) : (
        <SmileIcon className={styles.faceIcon} onClick={handleRestartGameClick} />
      )}
      <div className={styles.infoItem}>{timerSecond}</div>
    </div>
  )
}

export default GameInfo
