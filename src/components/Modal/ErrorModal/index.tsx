import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import useClickOutside from 'hooks/useClickOuside'

import { XIcon } from 'assets/svgs'
import styles from './errorModal.module.scss'

interface ErrorModalProps {
  setIsOpenErrorModal: Dispatch<SetStateAction<boolean>>
  errorMessage: string
}

const ErrorModal = ({ setIsOpenErrorModal, errorMessage }: ErrorModalProps) => {
  const targetRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenErrorModal(false)
  }
  const { clickOutsideEvent } = useClickOutside({ targetRef, clickOutsideHandle })

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleCloseModalClick = () => {
    setIsOpenErrorModal(false)
  }

  return (
    <div className={styles.background}>
      <div className={styles.errorModal} ref={targetRef}>
        <XIcon className={styles.xIcon} onClick={handleCloseModalClick} />
        <p>{errorMessage}</p>
      </div>
    </div>
  )
}

export default ErrorModal
