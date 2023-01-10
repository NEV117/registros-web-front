import { createContext, useReducer } from 'react'

export const RegistrosContex = createContext()

export const registrosReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REGISTRO': 
      return {
        registros: action.payload
      }
    case 'CREATE_REGISTRO':
      return {
        registros: [action.payload, ...state.registros]
      }
    case 'DELETE_REGISTRO':
      return {
        registros: state.registros.filter((r) => r._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const RegistrosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(registrosReducer, {
    registros: null
  })

  return (
    <RegistrosContex.Provider value={{...state, dispatch}}>
      { children }
    </RegistrosContex.Provider>
  )
}