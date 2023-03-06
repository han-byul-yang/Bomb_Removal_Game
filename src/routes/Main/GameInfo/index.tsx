import { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import makeGameBoard from 'utils/makeGameBoard'
import { setIncreaseSecond, setInitSecond } from 'store/timerSlice'
import { RootState } from 'store'
import { setNewBoard } from 'store/boardSlice'
import { setInitCount } from 'store/clickSlice'

import { SadIcon, SmileIcon } from 'assets/svgs'
import styles from './gameInfo.module.scss'

interface GameInfoProps {
  startTimer: boolean
  setStartTimer: Dispatch<React.SetStateAction<boolean>>
  isBombError: boolean
  setIsBombError: Dispatch<React.SetStateAction<boolean>>
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
    if (!startTimer) {
      dispatch(setInitSecond())
    }

    return () => clearInterval(timerId)
  }, [dispatch, startTimer])

  const handleRestartGameClick = () => {
    setIsBombError(false)
    setStartTimer(false)
    const newBoard = makeGameBoard(column, row)
    dispatch(setNewBoard({ newBoard }))
    dispatch(setInitCount())
    dispatch(setInitSecond())
  }

  return (
    <div className={styles.informations}>
      <div>{bombCount}</div>
      {isBombError ? (
        <SadIcon className={styles.faceIcon} onClick={handleRestartGameClick} />
      ) : (
        <SmileIcon className={styles.faceIcon} onClick={handleRestartGameClick} />
      )}
      <div>{timerSecond}</div>
    </div>
  )
}

export default GameInfo
