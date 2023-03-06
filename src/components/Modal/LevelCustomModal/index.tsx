import { ChangeEvent, Dispatch, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useClickOutside from 'hooks/useClickOuside'
import { RootState } from 'store'
import { setCustomSetting } from 'store/gameSettingSlice'

import { XIcon } from 'assets/svgs'
import styles from './levelCustomModal.module.scss'

interface LevelCustomModalProps {
  setIsOpenLevelCustomModal: Dispatch<React.SetStateAction<boolean>>
}

const LevelCustomModal = ({ setIsOpenLevelCustomModal }: LevelCustomModalProps) => {
  const [columnInput, setColumnInput] = useState('')
  const [rowInput, setRowInput] = useState('')
  const [bombInput, setBombInput] = useState('')
  const { column, row, bomb } = useSelector((state: RootState) => state.gameSetting.gameSettingInfo)
  const dispatch = useDispatch()
  const targetRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenLevelCustomModal(false)
  }
  const { clickOutsideEvent } = useClickOutside({ targetRef, clickOutsideHandle })

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleCustomSettingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    if (name === 'column') setColumnInput(value)
    if (name === 'row') setRowInput(value)
    if (name === 'bomb') setBombInput(value)
  }

  const handleCloseModalClick = () => {
    setIsOpenLevelCustomModal(false)
  }

  const handleSubmitButtonClick = () => {
    dispatch(setCustomSetting({ column: columnInput, row: rowInput, bomb: bombInput }))
    setIsOpenLevelCustomModal(false)
  }

  return (
    <div className={styles.background}>
      <div className={styles.settingModal} ref={targetRef}>
        <XIcon className={styles.xIcon} onClick={handleCloseModalClick} />
        <p>Custom Game Setup</p>
        <form className={styles.settingForm}>
          <p>Game Height:</p>
          <input type='text' name='column' value={column} onChange={handleCustomSettingChange} />
          <p>Game Width:</p>
          <input type='text' name='row' value={row} onChange={handleCustomSettingChange} />
          <p>Number of Bombs:</p>
          <input type='text' name='bomb' value={bomb} onChange={handleCustomSettingChange} />
          <button type='submit' className={styles.submitButton} onClick={handleSubmitButtonClick}>
            set over
          </button>
        </form>
      </div>
    </div>
  )
}

export default LevelCustomModal
