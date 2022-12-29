import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Routes'


function App() {
  return (
      <div className='App'>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
