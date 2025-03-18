import { createContext, FC, ReactNode, useState } from 'react'
import type { AlertColor } from '@mui/material'
import { Toast } from '../components/Toast'

interface IAlertContext {
  message: string
  type: AlertColor | undefined
  createAlert(message: string, type: AlertColor): void
  setMessage(message: string): void
}

export const AlertContext = createContext({} as IAlertContext)

interface AlertProviderProps {
  children: ReactNode
}

const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [type, setType] = useState<AlertColor>()
  const [message, setMessage] = useState('')

  function createAlert(newMessage: string, type: AlertColor) {
    setMessage(newMessage)
    setType(type)
  }

  return (
    <AlertContext.Provider
      value={{ message, type, createAlert, setMessage }}
    >
      {children}
      <Toast />
    </AlertContext.Provider>
  )
}

export { AlertProvider }
