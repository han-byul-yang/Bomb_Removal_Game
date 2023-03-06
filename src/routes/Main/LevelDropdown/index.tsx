import { MouseEvent, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import useClickOutside from 'hooks/useClickOuside'
import { setBeginner, setIntermediate, setExpert } from 'store/gameSettingSlice'
import { levelTypes } from 'constants/levelConstant'

import styles from './levelDropdown.module.scss'

interface LevelDropdownProps {
  setIsOpenLevelDropdown: Dispatch<SetStateAction<boolean>>
  setIsOpenCustomSettingModal: Dispatch<SetStateAction<boolean>>
}

const LevelDropdown = ({ setIsOpenLevelDropdown, setIsOpenCustomSettingModal }: LevelDropdownProps) => {
  const dispatch = useDispatch()
  const targetRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenLevelDropdown(false)
  }
  const { clickOutsideEvent } = useClickOutside({ targetRef, clickOutsideHandle })

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleGameLevelClick = (e: MouseEvent<HTMLButtonElement>) => {
    const clickedLevel = e.currentTarget.value
    if (clickedLevel === 'Beginner') dispatch(setBeginner())
    if (clickedLevel === 'Intermediate') dispatch(setIntermediate())
    if (clickedLevel === 'Expert') dispatch(setExpert())
    if (clickedLevel === 'Custom') setIsOpenCustomSettingModal(true)
  }

  return (
    <ul className={styles.levelDropdown} ref={targetRef}>
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
