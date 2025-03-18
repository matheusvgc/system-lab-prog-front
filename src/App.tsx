import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/authContext'
import { AppRoutes } from './routes/AppRoute'
import { AlertProvider } from './context/alert.context'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AlertProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </AlertProvider>

      </BrowserRouter>

    </div>
  )
}