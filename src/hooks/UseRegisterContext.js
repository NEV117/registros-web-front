import { RegistrosContex } from '../context/RegistrosContex'
import { useContext } from 'react'

export const useRegisterContext = () => {
  const context = useContext(RegistrosContex)

  if (!context) {
    throw Error('useRegistrosContext must be used inside an RegistrosContextProvider')
  }

  return context
}