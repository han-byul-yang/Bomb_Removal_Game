import { useState } from 'react'

import { BoardTileType } from 'types/boardTileType'
import LevelDropdown from './LevelDropdown'
import ModalPortal from 'components/Modal/ModalPortal'
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
          <button type='button' onClick={handleGameButtonClick}>
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
            <div className={styles.gameBoard} />
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
