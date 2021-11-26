import './App.css';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

function App() {
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [total, setTotal] = useState(0);

  // function analyzeData(){
  //   let total = 0;
  //   let investmentTotal = 0;
  //   let incomeTotal = 0;
  //   let restarauntTotal = 0;
  //   let groceriesTotal = 0;
  //   let gasTotal = 0;
  //   let counts = {};

  //   for(let transaction of parsedCsvData){
  //     let amt = 
  //   }
  // }

  const parseFile = file => {
    Papa.parse(file, {
      header: true,
      complete: results => {
        setParsedCsvData(results.data);
        setTotal(results.data.reduce((acc, curr) => 
        {
          console.log(curr['Amount']);
          return acc + parseFloat(curr['Amount']);
        }, 0
        ));
        // analyzeData();
      },
    });
  };

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'text/csv',
  });

  return (
    <div className="App">
      <div
        {...getRootProps({
          className: `dropzone 
          ${isDragAccept && 'dropzoneAccept'} 
          ${isDragReject && 'dropzoneReject'}`,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      <h1>{total}</h1>

          {parsedCsvData &&
            parsedCsvData.map((parsedData, index) => (
              <div key={index}>{parsedData['Amount']}</div>
            ))}


    </div>
  );
}

export default App;