import { MouseEvent, Dispatch, SetStateAction, useRef, useEffect, memo } from 'react'
import { useDispatch } from 'react-redux'

import useClickOutside from 'hooks/useClickOuside'
import { setBeginner, setIntermediate, setExpert } from 'store/gameSettingSlice'
import { setInitCount } from 'store/clickSlice'
import { setInitSecond } from 'store/timerSlice'
import { setInitCountBomb } from 'store/bombCountSlice'
import { levelTypes } from 'constants/levelConstant'

import styles from './levelDropdown.module.scss'

interface LevelDropdownProps {
  setIsOpenLevelDropdown: Dispatch<SetStateAction<boolean>>
  setIsOpenLevelCustomModal: Dispatch<SetStateAction<boolean>>
  setIsBombError: Dispatch<React.SetStateAction<boolean>>
  setStartTimer: Dispatch<React.SetStateAction<boolean>>
}

const LevelDropdown = ({
  setIsOpenLevelDropdown,
  setIsOpenLevelCustomModal,
  setIsBombError,
  setStartTimer,
}: LevelDropdownProps) => {
  const dispatch = useDispatch()
  const targetRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenLevelDropdown(false)
  }
  const { clickOutsideEvent, removeClickOutsideEvent } = useClickOutside({ targetRef, clickOutsideHandle })

  useEffect(() => {
    clickOutsideEvent()

    return () => removeClickOutsideEvent()
  }, [clickOutsideEvent, removeClickOutsideEvent])

  const handleGameLevelClick = (e: MouseEvent<HTMLButtonElement>) => {
    const clickedLevel = e.currentTarget.name
    if (clickedLevel === 'Beginner') {
      dispatch(setBeginner())
    }
    if (clickedLevel === 'Intermediate') {
      dispatch(setIntermediate())
    }
    if (clickedLevel === 'Expert') {
      dispatch(setExpert())
    }
    if (clickedLevel === 'Custom') {
      setIsOpenLevelCustomModal(true)
    }
    if (clickedLevel !== 'Custom') {
      setIsBombError(false)
      setStartTimer(false)
      dispatch(setInitCount())
      dispatch(setInitSecond())
      dispatch(setInitCountBomb())
    }
    setIsOpenLevelDropdown(false)
  }

  return (
    <ul className={styles.levelDropdown} ref={targetRef}>
      {levelTypes.map((level, index) => {
        const levelKey = `level-${index}`

        return (
          <li key={levelKey}>
            <button type='button' name={level} onClick={handleGameLevelClick}>
              {level}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default memo(LevelDropdown)
