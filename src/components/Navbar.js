import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handelClick = () => {
    logout();
  };

  const [nav, setNav] = useState(false);

  const handelNav = () => {
    setNav(!nav);
  };

  return (
    <header>
      <div className=" flex  justify-between items-center h-20  mx-auto px-4 text-white bg-[#0c4a6e]  ">
        <Link to="/vistaregistro">
          <h1 className="w-full text-3xl font-bold text-white ">SERIAL SCAN</h1>
        </Link>
        {user && (
          <ul className=" hidden md:flex ">
            <Link to="/vistaregistro">
              <li className="p-4  text-white  "> Registrar </li>
            </Link>
            <Link to="/verregistros">
              <li className="p-4  text-white "> Ver Registros </li>
            </Link>
          </ul>
        )}

        <nav className=" border-gray-200 dark:bg-gray-900 hidden md:flex">
          {user && (
            <div>
              <span>
                <strong>{user.email.toUpperCase().split("@")[0]}</strong>
              </span>
              <button className="" onClick={handelClick}>
                Salir{" "}
              </button>
            </div>
          )}

          {!user && (
            <div className="border-gray-200 dark:bg-gray-900 right-5 flex">
              <Link to="/login" className="text-white p-2">
                Iniciar sesion
              </Link>
              <Link to="/signup" className="text-white p-2">
                Registrarse
              </Link>
            </div>
          )}
        </nav>

        <div onClick={handelNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[100%] h-[330px]  rounded-lg bg-[#0c4a6e] ease-in-out duration-500"
            : "fixed left-[-100%] hidden"
        }
      >
        <div className="text-white grid grid-cols-2">
          <Link to="/vistaregistro">
            <h1 className="w-full text-3xl font-bold text-white m-4">
              SERIAL SCAN
            </h1>
          </Link>

          <div
            onClick={handelNav}
            className="block md:hidden fixed  right-4 top-[30px]"
          >
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>
        </div>
        {user && (
          <ul className=" md:flex">
            <Link to="/vistaregistro">
              <li className="p-4  text-white "> Registrar </li>
            </Link>
            <Link to="/verregistros">
              <li className="p-4  text-white "> Ver Registros </li>
            </Link>
          </ul>
        )}

        <nav className=" border-gray-200 dark:bg-gray-900 right-5 flex ">
          {user && (
            <div>
              <span className=" px-4 text-white">
                <strong>{user.email.toUpperCase().split("@")[0]}</strong>
              </span>
              <br></br>
              <br></br>
              <button className="" onClick={handelClick}>
                Salir{" "}
              </button>
            </div>
          )}

          {!user && (
            <div className="border-gray-200 dark:bg-gray-900 right-5 flex">
              <Link to="/login" className="text-white p-2">
                Iniciar sesion
              </Link>
              <Link to="/signup" className="text-white p-2">
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
