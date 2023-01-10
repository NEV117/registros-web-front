import { useEffect} from "react"
import { useRegisterContext } from "../hooks/UseRegisterContext"
import {useAuthContext} from '../hooks/useAuthContext'

// importo componentes para ordernar y hacer mas eficiente el codigo 
import DetallesRegistros from '../components/DetallesRegistros'
import ScanOcr from "../components/ScanOcr"

require('tailwind-scrollbar')

const VistaRegistro = () => {
    const {registros, dispatch} = useRegisterContext()
    const {user} = useAuthContext()    
    
    useEffect(() => {
        const fetchRegistros = async () => {
            const response = await fetch('/api/registros', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              })
              
            const json = await response.json()
            if(response.ok) {
                dispatch({type: "SET_REGISTRO", payload: json})
            }
        }        
        if(user){
            fetchRegistros()
        }
    }, [dispatch, user])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">            
            <div className="col-span-1">
                <ScanOcr/>
            </div>
            <div className="workouts h-[770px] col-span-2 overflow-y-auto">
                {registros && registros.map((registro) => (
                    <DetallesRegistros key={registro._id} registro={registro} />
                ))}
            </div>
        </div>
    )
}

export default VistaRegistro 
