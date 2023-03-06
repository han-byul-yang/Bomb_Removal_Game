import { useDispatch } from 'react-redux'
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'

const useTimer = (
  startTimer: boolean,
  startTimerHandle: ActionCreatorWithoutPayload<'timerSlice/setIncreaseSecond'>,
  deleteTimerHandle: ActionCreatorWithoutPayload<'timerSlice/setInitSecond'>
) => {
  const dispatch = useDispatch()

  let timerId
  if (startTimer)
    timerId = setInterval(() => {
      dispatch(startTimerHandle())
    }, 1000)
  if (!startTimer) {
    clearInterval(timerId)
    dispatch(deleteTimerHandle())
  }

  return timerId
}
export default useTimer
