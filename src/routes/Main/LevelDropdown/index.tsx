import { useState, MouseEvent, Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'

import { setBeginner, setIntermediate, setExpert } from 'store/gameSettingSlice'
import { levelTypes } from 'constants/levelConstant'

import styles from './levelDropdown.module.scss'

interface LevelDropdownProps {
  setIsOpenLevelDropdown: Dispatch<SetStateAction<boolean>>
  setIsOpenCustomSettingModal: Dispatch<SetStateAction<boolean>>
}

const LevelDropdown = ({ setIsOpenLevelDropdown, setIsOpenCustomSettingModal }: LevelDropdownProps) => {
  const dispatch = useDispatch()

  const handleGameLevelClick = (e: MouseEvent<HTMLButtonElement>) => {
    const clickedLevel = e.currentTarget.value
    if (clickedLevel === 'Beginner') dispatch(setBeginner())
    if (clickedLevel === 'Intermediate') dispatch(setIntermediate())
    if (clickedLevel === 'Expert') dispatch(setExpert())
    if (clickedLevel === 'Custom') setIsOpenCustomSettingModal(true)
  }

  return (
    <ul className={styles.levelDropdown}>
      {levelTypes.map((level, index) => {
        const levelKey = `level-${index}`

        return (
          <li key={levelKey}>
            <button type='button' onClick={handleGameLevelClick}>
              {level}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default LevelDropdown
