import { useRegisterContext } from "../hooks/UseRegisterContext";
import { es } from "date-fns/locale";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
/* importan una librearia para el manejo de las fechas"; */
const { format } = require("date-fns");

const DetallesRegistros = ({ registro }) => {
  const { dispatch } = useRegisterContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    //busca que exista un usuario para poder elminiar
    if (!user) {
      return;
    }
    //usa una API en la carpeta de back-end para mandar una
    // una solicitud de DELETE

    //el header es necesario porque se uso un json web token para la autenticacion

    const response = await fetch("/api/registros/" + registro._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    //verifica que haya una respuesta para mandar el metodo DELETE

    if (response.ok) {
      dispatch({ type: "DELETE_REGISTRO", payload: json });
    }
  };

  return (
    <div className=" rounded m-5 py-5 relative shadow-xl">
      <h4 className="m-0 px-2  text-xl text-[#1d79ad] ">{registro.codigo}</h4>
      <p className="m-0 px-2 text-base text-[#555]">
        <strong>Estado </strong>
        {registro.estado_ingreso}
      </p>
      <p className="m-0 px-2 text-base text-[#555]">
        {" "}
        Hace{" "}
        {formatDistanceToNow(
          new Date(registro.createdAt),
          { locale: es },
          { addSuffix: true }
        )}
      </p>
      <p className="m-0 px-2 text-base text-[#555]">
        {format(new Date(registro.createdAt), "dd MMMM  yyyy", { locale: es })}
      </p>
      <span
        className=" absolute top-5 right-5 cursor-pointer bg-white py-1.5 rounded-[50%] text-[#333] material-symbols-outlined"
        onClick={handleClick}
      >
        delete
      </span>
    </div>
  );
};

export default DetallesRegistros;
