import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import useClickOutside from 'hooks/useClickOuside'
import { RootState } from 'store'

import { XIcon } from 'assets/svgs'
import styles from './winModal.module.scss'

interface WinModalProps {
  setIsOpenWinModal: Dispatch<SetStateAction<boolean>>
}

const WinModal = ({ setIsOpenWinModal }: WinModalProps) => {
  const { column, row, bomb } = useSelector((state: RootState) => state.gameSetting.gameSettingInfo)
  const { timerSecond } = useSelector((state: RootState) => state.timer)
  const { tileClicked } = useSelector((state: RootState) => state.click)
  const targetRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenWinModal(false)
  }
  const { clickOutsideEvent, removeClickOutsideEvent } = useClickOutside({ targetRef, clickOutsideHandle })

  useEffect(() => {
    clickOutsideEvent()

    return () => removeClickOutsideEvent()
  }, [clickOutsideEvent, removeClickOutsideEvent])

  const handleCloseModalClick = () => {
    setIsOpenWinModal(false)
  }

  return (
    <div className={styles.background}>
      <div className={styles.winModal} ref={targetRef}>
        <XIcon className={styles.xIcon} onClick={handleCloseModalClick} />
        <p className={styles.title}>YOU WON!!</p>
        <p className={styles.subText}>Congratulations on winning Minesweeper</p>
        <p>Game Time: {timerSecond} seconds</p>
        <p>You Clicked: {tileClicked} times</p>
        <p>
          Game Parameters: {column} x {row} and {bomb} bombs{' '}
        </p>
      </div>
    </div>
  )
}

export default WinModal
