import { SnackbarProvider } from 'notistack'
import React from 'react'

const Snackbar = () => {
  return (
    <SnackbarProvider maxSnack={3}></SnackbarProvider>
  )
}

export default Snackbar