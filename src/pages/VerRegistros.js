import { useEffect, useState } from "react";
import { useRegisterContext } from "../hooks/UseRegisterContext";
import { useAuthContext } from "../hooks/useAuthContext";

/* import axios from "axios" */

// importo componentes para ordernar y hacer mas eficiente el codigo
import DetallesRegistros from "../components/DetallesRegistros";
import DescargarRegistros from "../components/DescargarRegistros";

require("tailwind-scrollbar");

const VerRegistros = () => {
  const { registros, dispatch } = useRegisterContext();
  const { user } = useAuthContext();
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const hadelSelect = (e) => {
    setSort(e.target.value);
  };

  const handelBtn1 = () => {
    setOrder("asc");
  };
  const handelBtn2 = () => {
    setOrder("desc");
  };

  /*   {createdAt: ISODate("2022-10-22T19:50:58.057+00:00")}

  buscar desde el 25 al 27
  {createdAt: { $gte: ISODate("2022-10-25T02:18:58.876+00:00"), $lte: ISODate("2022-10-27T04:48:34.940+00:00")}}

 */

  useEffect(() => {
    const getRegistros = async () => {
      try {
        const response = await fetch(
          `/api/registros/busqueda?search=${search}&sort=${sort},${order}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_REGISTRO", payload: json });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      getRegistros();
    }
  }, [dispatch, user, search, sort, order]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      <div className="col-span-1 py-2 mx-auto min-w-[250px]">
        <p>
          <strong>Ordenar por:</strong>
        </p>
        <div className="grid gap-0 grid-cols-2">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={hadelSelect}
            defaultValue={sort}
          >
            <option value="" disabled selected>
              ...
            </option>
            <option value="createdAt">Fecha Registro</option>
            <option value="estado_ingreso">Estado Ingreso</option>
          </select>
          <div className="grid grid-cols-1">
            <button
              className="bg-gray-50 border  border-transparent text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onClick={handelBtn1}
            >
              Acendente
            </button>
            <button
              className="bg-gray-50 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onClick={handelBtn2}
            >
              Descendente
            </button>
          </div>
        </div>
        <div className="mx-auto py-3">
          <DescargarRegistros registros={registros} />
        </div>
      </div>
      <div className="col-span-2  ">
        <input
          className="py-1 px-2"
          placeholder="Buscar por codigo"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <div className="workouts relative h-[770px]  overflow-y-auto">
          {registros &&
            registros.map((registro) => (
              <DetallesRegistros key={registro._id} registro={registro} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default VerRegistros;
