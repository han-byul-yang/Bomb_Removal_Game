import { useState } from 'react'

import LevelDropdown from './LevelDropdown'
import ModalPortal from 'components/Modal/ModalPortal'
import GameBoard from './GameBoard'
import GameInfo from './GameInfo'
import LevelCustomModal from 'components/Modal/LevelCustomModal'
import WinModal from 'components/Modal/WinModal'

import styles from './main.module.scss'

const Main = () => {
  const [isBombError, setIsBombError] = useState(false)
  const [startTimer, setStartTimer] = useState(false)
  const [isOpenLevelDropdown, setIsOpenLevelDropdown] = useState(false)
  const [isOpenLevelCustomModal, setIsOpenLevelCustomModal] = useState(false)
  const [isOpenWinModal, setIsOpenWinModal] = useState(false)

  const handleGameButtonClick = () => {
    setIsOpenLevelDropdown(true)
  }

  return (
    <>
      <div className={styles.background}>
        <div className={styles.boardContainer}>
          <button type='button' className={styles.levelButton} onClick={handleGameButtonClick}>
            Game
          </button>
          <div className={styles.gameSetting}>
            {isOpenLevelDropdown && (
              <LevelDropdown
                setIsOpenLevelDropdown={setIsOpenLevelDropdown}
                setIsOpenLevelCustomModal={setIsOpenLevelCustomModal}
                setIsBombError={setIsBombError}
                setStartTimer={setStartTimer}
              />
            )}
          </div>
          <div className={styles.gameBoardbox}>
            <GameInfo
              isBombError={isBombError}
              setIsBombError={setIsBombError}
              startTimer={startTimer}
              setStartTimer={setStartTimer}
            />
            <GameBoard
              isBombError={isBombError}
              setIsBombError={setIsBombError}
              setStartTimer={setStartTimer}
              setIsOpenWinModal={setIsOpenWinModal}
            />
          </div>
        </div>
      </div>
      {isOpenLevelCustomModal && (
        <ModalPortal>
          <LevelCustomModal setIsOpenLevelCustomModal={setIsOpenLevelCustomModal} />
        </ModalPortal>
      )}
      {isOpenWinModal && (
        <ModalPortal>
          <WinModal setIsOpenWinModal={setIsOpenWinModal} />
        </ModalPortal>
      )}
    </>
  )
}

export default Main
