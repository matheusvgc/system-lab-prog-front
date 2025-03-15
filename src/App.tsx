import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/authContext'
import { AppRoutes } from './routes/AppRoute'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter><AuthProvider>
        <AppRoutes />
      </AuthProvider></BrowserRouter>

    </div>
  )
}