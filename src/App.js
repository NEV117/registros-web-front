import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//pages ans components 
import VistaRegistro from './pages/vistaRegistro'
import VerRegistros from './pages/VerRegistros';
import Login from './pages/Login';
import Singup from './pages/Singup';

import Navbar from './components/Navbar'

function App() {  
  const{ user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>      
        <Navbar />
        <div className='max-w-[1400px] p-5 mx-auto'>
          <Routes>
          <Route 
              path="/"
              element={ user ? <VistaRegistro/> : <Navigate to="/login" />}
            />
          <Route 
              path="/vistaregistro"
              element={ user ? <VistaRegistro/> : <Navigate to="/login" />}
            />
            <Route 
              path="/login"
              element={ !user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path="/signup"
              element={ !user ? <Singup /> : <Navigate to="/login" /> }
            />
            <Route
            path="/verregistros"
            element={ user ? <VerRegistros/> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
