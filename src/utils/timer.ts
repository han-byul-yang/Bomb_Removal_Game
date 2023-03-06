/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-expressions */
import { Dispatch } from 'react'

const timer = (
  startTimer: boolean,
  timerHandleAction: { payload: undefined; type: 'timerSlice/setIncreaseSecond' },
  timerClearAction: { payload: undefined; type: 'timerSlice/setInitSecond' }
) => {
  let timerId
  if (startTimer)
    timerId = setInterval(() => {
      console.log('hlo')
      timerHandleAction
    }, 1000)
  if (!startTimer) {
    clearInterval(timerId)
    timerClearAction
  }
}
export default timer
