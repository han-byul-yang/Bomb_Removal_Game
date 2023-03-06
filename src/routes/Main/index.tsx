import { useState } from 'react'

import { BoardTileType } from 'types/boardTileType'
import LevelDropdown from './LevelDropdown'
import ModalPortal from 'components/Modal/ModalPortal'
import GameBoard from './GameBoard'
import LevelCustomModal from 'components/Modal/LevelCustomModal'

import styles from './main.module.scss'

const Main = () => {
  const [matrixBoard, setMatrixBoard] = useState<BoardTileType[][]>([])
  const [isOpenLevelDropdown, setIsOpenLevelDropdown] = useState(false)
  const [isOpenLevelCustomModal, setIsOpenLevelCustomModal] = useState(false)

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
              />
            )}
          </div>
          <div className={styles.gameBoardbox}>
            <div className={styles.information}>
              <div>clicked num</div>
              <div>face icon</div>
              <div>timer</div>
            </div>
            <GameBoard />
          </div>
        </div>
      </div>
      {isOpenLevelCustomModal && (
        <ModalPortal>
          <LevelCustomModal setIsOpenLevelCustomModal={setIsOpenLevelCustomModal} />
        </ModalPortal>
      )}
    </>
  )
}

export default Main
