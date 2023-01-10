import { useAuthContext } from "./useAuthContext"
import { useRegisterContext } from './UseRegisterContext'

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch: registrosDispatch} = useRegisterContext()

    
    const logout = () =>{
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action 
        dispatch({type: 'LOGOUT'})
        registrosDispatch({type: 'SET_REGISTRO', payload: null})
    }

    return {logout}
}