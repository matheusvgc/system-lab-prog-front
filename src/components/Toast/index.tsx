import { FC, useContext, useEffect, useState } from 'react'

import { AlertContext } from '@/context/alert.context'

import { Alert, Snackbar } from '@mui/material'

const Toast: FC = () => {
  const { message, type, setMessage } = useContext(AlertContext)
  const [visible, setVisible] = useState(false)

  function handleClose() {
    setVisible(false)
    setTimeout(() => setMessage(''), 100)
  }

  useEffect(() => {
    setVisible(true)
  }, [message])

  return (
    <>
      <Snackbar
        open={!!(visible && message)}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: 99999999 }}
      >
        <Alert severity={type} elevation={2}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export { Toast }
