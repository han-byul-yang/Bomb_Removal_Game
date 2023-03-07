import { MutableRefObject } from 'react'

interface useClickTargetProps {
  targetRef: MutableRefObject<HTMLLIElement | null>
  clickOutsideHandle: () => void
}

const useClickOutside = ({ targetRef, clickOutsideHandle }: useClickTargetProps) => {
  const handleTargetClick = (event: MouseEvent | TouchEvent) => {
    if (!targetRef.current || targetRef.current.contains(event.target as Node)) return
    clickOutsideHandle()
  }

  const clickOutsideEvent = () => {
    document.addEventListener('mousedown', handleTargetClick)
    document.addEventListener('touchstart', handleTargetClick)
  }

  const removeClickOutsideEvent = () => {
    document.removeEventListener('mousedown', handleTargetClick)
    document.removeEventListener('touchstart', handleTargetClick)
  }

  return { clickOutsideEvent, removeClickOutsideEvent }
}

export default useClickOutside
