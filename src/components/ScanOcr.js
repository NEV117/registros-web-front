import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { AiOutlineFileImage } from "react-icons/ai";
import { useRegisterContext } from "../hooks/UseRegisterContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ScanOcr = () => {
  const [file, setfile] = useState();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const { dispatch } = useRegisterContext();
  const { user } = useAuthContext();

  const [codigo, setCodigo] = useState("");
  const [estado_ingreso, setEstado_ingreso] = useState("");
  const [error, setError] = useState(null);

  //esto es el scanner------------------------------------------
  const onFileChange = (e) => {
    setfile(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setError(null);
      setProgress(0);
    }
  };

  const processImage = () => {
    if (!file) {
      setError("Debes seleccionar una imagen");
      return;
    }

    setProgress(0);
    console.log(file);
    Tesseract.recognize(file, "spa", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })

      .catch((err) => {
        setError("No se puede escanear la imagen");
        console.error(err);
      })
      .then(({ data: { text } }) => {
        setCodigo(text);
      });
  };

  const hadelSelect = (e) => {
    setEstado_ingreso(e.target.value);
  };

  //esto es para registrar---------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logge in");
      return;
    }
    //esto es para ingresar registros -------------------------------------------------------------------------------------
    const registro = { codigo, estado_ingreso }; /* 
    const url = "https://scanback.adaptable.app"; */

    const response = await fetch(
      /* url + */ "https://scanback.adaptable.app/api/registros",
      {
        method: "POST",
        body: JSON.stringify(registro),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    //verifica si hay una respuesta
    if (!response.ok) {
      setError(json.error);
    }

    //verifica una respuesta exitosa
    if (response.ok) {
      setError(null);
      setCodigo("");
      console.log("Nuevo Registro Añadido:", json);
      dispatch({ type: "CREATE_REGISTRO", payload: json });
    }
  };

  return (
    <div className="mx-auto  gap-4  px-3 rounded  m-5 max-w-4xl">
      {/* de aqui abajo es el formulario de registro ------------------------------------------------------------------------------------------------------------------------------------ */}
      <div className="izquierdo ">
        <form
          className="py-2.5  pl-8 bg-white rounded  "
          onSubmit={handleSubmit}
        >
          <h3>
            <strong>Añade un nuevo registro</strong>
          </h3>

          <label>Codigo de la importacion:</label>
          <input
            type="text"
            onChange={(e) => setCodigo(e.target.value)}
            value={codigo} /* 
            className={emtyFields.includes('codigo') ? ' bg-white border  border-red-600 rounded  text-red-600' : ' '} */
          />

          <label>Estado de la importacion:</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={hadelSelect}
            defaultValue={estado_ingreso}
          >
            <option value="" disabled selected>
              ...
            </option>
            <option value="Buena">Buena</option>
            <option value="Mala">Mala</option>
            <option value="Incompleta">Inconpleta</option>
            <option value="Dañada">Dañada</option>
          </select>

          <br></br>
          <button className="right-5">Registrar</button>
        </form>
      </div>

      {/* de aqui abajo es la parte del escanner ------------------------------------------------------------------------------------------------------------------------------------ */}
      <div className="max-w-[350px] py-2.5 bg-white rounded ">
        <div className="mx-auto rounded max-h-fit max-w-md ">
          {image ? (
            <img
              className="mx-auto max-w-[300px] md:max-w-[250px] "
              src={image}
              alt="preview"
            />
          ) : (
            <AiOutlineFileImage
              className=" mx-auto px-8 "
              size={165}
            ></AiOutlineFileImage>
          )}
        </div>
        <div className="grid grid-cols-2 px-2 gap-3" style={{ marginTop: 25 }}>
          <input
            id="file_input"
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          ></input>
          <input
            className="boton rounded mx-auto"
            type="button"
            value="Escanear"
            onClick={processImage}
          ></input>
        </div>
        {/*   esto es un condicoinal para que solo lo muestre cuando halla un error */}
        {error && (
          <div className=" py-2.5 px-2.5 bg-white border  border-red-600 rounded m-5 text-red-600 ">
            {error}
          </div>
        )}
        {/* muestra el progreso solo cuando hay progreso*/}
        {progress !== 0 && (
          <div>
            <progress
              className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
              value={progress}
              max={1}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ScanOcr;
