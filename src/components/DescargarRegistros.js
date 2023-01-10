// este componente es para el boton de descarga

import ReactExport from "react-export-excel";

//se importa lo de abajo como etiquetas
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

//paso un json como argumento para obtener los datos del exel
const DescargarRegistros = ({ registros }) => {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return (
    <div>
      <ExcelFile
        element={
          <button class="bg-[#588857] hover:bg-[#96c296] text-[#f3e6e6] font-bold py-2 px-4 rounded inline-flex items-center">
            <svg
              class="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Descargar Registros</span>
          </button>
        }
        filename={`Reporte ${date}`}
      >
        {/* aca paso el json a la libreria */}
        <ExcelSheet data={registros} name="registros">
          <ExcelColumn label="Codigo" value={"codigo"} />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
};

export default DescargarRegistros;
