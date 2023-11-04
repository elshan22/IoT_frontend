import React, { useState } from "react";
import CsvReader from "./CsvReader";

function Matrix(props) {
  const [matrixSize, setMatrixSize] = useState({
    N: 2,
    no: 2,
    nu: 2,
    ns: 2,
  });
  const [matrix, setMatrix] = useState([
    [0, 0],
    [0, 0],
  ]);
  const [latexMatrix, setLatexMatrix] = useState(
    "\\begin{pmatrix}\n 0 & 0\\\\\n 0 & 0\n \\end{pmatrix}"
  );

  function MatrixInput(props) {
    function getInput(matrixLimit1) {
      console.log(matrixLimit1);
      return (
        <>
          {matrixLimit1.map((row, indexRow = 1) => {
            return (
              <div  style={{ display: "flex" }} key={indexRow}>
                {row.map((item, indexColumn = 1) => {
                  return (
                    <input
                    className="p-2 m-2 rounded-lg flex justify-center items-center text-center bg-indigo-400 text-white"
                      key={indexRow + " " + indexColumn}
                      type="text"
                      defaultValue={0}
                      name={indexRow + "," + indexColumn}
                    />
                  );
                })}
              </div>
            );
          })}
        </>
      );
    }

    if (
      matrixSize.N > 0 &&
      matrixSize.no > 0 &&
      matrixSize.nu > 0 &&
      matrixSize.ns > 0
    ) {
      // Q Matrix
      let matrixQ = Array(matrixSize.N * matrixSize.no);
      for (let i = 0; i < matrixSize.N * matrixSize.no; i++) {
        matrixQ[i] = new Array(matrixSize.N * matrixSize.nu).fill(0);
      }
      // F Matrix
      let matrixF = Array(matrixSize.N * matrixSize.no);

      for (let i = 0; i < matrixSize.N * matrixSize.no; i++) {
        matrixF[i] = new Array(matrixSize.ns * 1).fill(0);
      }

      let matrixP = Array(matrixSize.N * matrixSize.nu);
      for (let i = 0; i < matrixSize.N * matrixSize.nu; i++) {
          matrixP[i] = new Array(matrixSize.N * matrixSize.nu).fill(0);
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        let count = 0;
        for (let i = 0; i < matrixSize.rows; i++) {
          for (let j = 0; j < matrixSize.columns; j++) {
            // If the floating point number cannot be parsed, we set 0 for this value
            matrix[i][j] = !isNaN(parseFloat(event.target[count].value))
              ? parseFloat(event.target[count].value)
              : 0;
            count += 1;
          }
        }
        setMatrix(matrix);
      };
      return (
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-center text-4xl">Matrix F</h3>
          <div className="border-2 border-solid border-indigo-500 p-2 rounded-lg overflow-scroll my-3" style={{  height: "300px", width: "100%" }}>
            {getInput(matrixF)}
          </div>
          <h3 className="font-bold text-center text-4xl">Matrix Q</h3>
          <div className="border-2 border-solid border-indigo-500 p-2 rounded-lg overflow-scroll my-3" style={{ height: "300px", width: "100%" }}>
            {getInput(matrixQ)}
          </div>
            <h3 className="font-bold text-center text-4xl">Matrix P</h3>
          <div className="border-2 border-solid border-indigo-500 p-2 rounded-lg overflow-scroll my-3" style={{ height: "300px", width: "100%" }}>
            {getInput(matrixP)}
          </div>
          <button  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {"Save Limit and constants"}
            </button>
        </form>
      );
    } else {
      return <h3>please input a valid natural number!</h3>;
    }
  }

  return (
    <div>
      <h2 className="py-4 font-bold text-xl">Make n*n Matrix By Input</h2>
      <form>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              input N :
            </label>
            <input
              className="mt-1 transition duration-300 ease-in-out focus:transition focus:duration focus:ease-in-out focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md p-2"
              type="number"
              defaultValue={2}
              id="nInput"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              input no:
            </label>
            <input
              className="mt-1 transition duration-300 ease-in-out focus:transition focus:duration focus:ease-in-out focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md p-2"
              type="number"
              defaultValue={2}
              id="noInput"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">input nu:</label>
            <input className="mt-1 transition duration-300 ease-in-out focus:transition focus:duration focus:ease-in-out focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md p-2" type="number" defaultValue={2} id="nuInput" />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">input ns:</label>
            <input className="mt-1 transition duration-300 ease-in-out focus:transition focus:duration focus:ease-in-out focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md p-2" type="number" defaultValue={2} id="nsInput" />
          </div>
        </div>

       <div className="flex space-x-4">
       <button
           className="inline-flex justify-center py-2 px-4 border border-transparent
                 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500 my-4"
           style={{marginTop:"4%",height:"20%"}}
          onClick={(e) => {
            e.preventDefault();
            const NInput = document.getElementById("nInput");
            const noInput = document.getElementById("noInput");
            const nuInput = document.getElementById("nuInput");
            const nsInput = document.getElementById("nsInput");
            console.log(nsInput);
            // if we only want matrix of size between 2 and 8
            // if (2 <= rows && rows <= 8) {
            setMatrixSize({
              N: NInput.value,
              no: noInput.value,
              nu: nuInput.value,
              ns: nsInput.value,
            });
            // }
          }}
        >
          Set Numbers
        </button>
        <CsvReader />
       </div>
      </form>
      <MatrixInput
        matrixSize={matrixSize}
        setMatrix={(matrix) => setMatrix(matrix)}
      />
    </div>
  );
}

export default Matrix;
