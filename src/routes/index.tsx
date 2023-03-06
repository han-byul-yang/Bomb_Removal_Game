import { Route, Routes } from 'react-router-dom'

import Main from './Main'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='*' element={<div>404</div>} />
    </Routes>
  )
}

export default App
