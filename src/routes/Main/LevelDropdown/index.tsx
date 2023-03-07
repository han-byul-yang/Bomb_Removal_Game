import { MouseEvent, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useClickOutside from 'hooks/useClickOuside'
import makeGameBoard from 'utils/makeGameBoard'
import { RootState } from 'store'
import { setNewBoard } from 'store/boardSlice'
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
  const { column, row } = useSelector((state: RootState) => state.gameSetting.gameSettingInfo)
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
      const newBoard = makeGameBoard(column, row)
      dispatch(setNewBoard({ newBoard }))
    }
    setIsBombError(false)
    setStartTimer(false)
    dispatch(setInitCount())
    dispatch(setInitSecond())
    dispatch(setInitCountBomb())
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

export default LevelDropdown
