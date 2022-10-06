import { Suspense } from 'react'

import { ToastEl } from './components/toast'
import AppWrapper from './router'

function App() {
  return (
    <div className="bg-gray-50">
      <Suspense fallback={<div>page loading</div>}>
        <AppWrapper />
      </Suspense>
      <ToastEl />
    </div>
  )
}

export default App
