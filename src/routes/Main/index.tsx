import { useState } from 'react'

import { BoardTileType } from 'types/boardTileType'
import LevelDropdown from './LevelDropdown'

import styles from './main.module.scss'

const Main = () => {
  const [matrixBoard, setMatrixBoard] = useState<BoardTileType[][]>([])
  const [isOpenLevelDropdown, setIsOpenLevelDropdown] = useState(false)
  const [isOpenCustomSettingModal, setIsOpenCustomSettingModal] = useState(false)

  const handleGameButtonClick = () => {
    setIsOpenLevelDropdown(true)
  }

  return (
    <div className={styles.background}>
      <div className={styles.boardContainer}>
        <button type='button' onClick={handleGameButtonClick}>
          Game
        </button>
        <div className={styles.gameSetting}>
          {isOpenLevelDropdown && (
            <LevelDropdown
              setIsOpenLevelDropdown={setIsOpenLevelDropdown}
              setIsOpenCustomSettingModal={setIsOpenCustomSettingModal}
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
  )
}

export default Main
