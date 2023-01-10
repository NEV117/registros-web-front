import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoanding} = useLogin()

    const handelSubmit = async(e) => {
        e.preventDefault()
        console.log(email, password)

        await login(email, password)
    }
    

    return(
        <div className='img'>
        <form className='login bg-white rounded-sm' onSubmit={handelSubmit}>
            <h3 className=' text-center'><strong>Iniciar Sesion</strong></h3>

            <label>Email</label>
            <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}            
            />

            <label>Contraseña</label>
            <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}            
            />

            <center><button disabled={isLoanding}>Enviar</button></center>
            {error && <div className='error'>{error}</div>}

        </form>
        </div>
    
    )
}

export default Login