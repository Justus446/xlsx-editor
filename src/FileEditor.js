import React, { useState } from "react";
import OutTable from "./OutTable";
import ExcelRenderer from "./ExcelRenderer";

function FileEditor(excelFile) {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  const handleCellChange = (value, rowIndex, columnIndex) => {
    const updatedData = [...this.props.excelFile]; // Create a copy of the data array
    updatedData[rowIndex][columnIndex] = value; // Update the specific cell value
  
    // Call the callback function passed from the parent component
    if (this.props.handleCellChange) {
      this.props.handleCellChange(updatedData); // Pass the updated data back to the parent component
    }
  };


  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    // Just pass the fileObj as a parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setCols(resp.cols);
        setRows(resp.rows);
      }
    });
  };

  return (
    <div className="App">
      <h1>Excel File Editor</h1>
      <input type="file" onChange={fileHandler} style={{ padding: "10px" }} />
      <OutTable
        data={rows}
        columns={cols}
        tableClassName="ExcelTable2007"
        tableHeaderRowClass="heading"
        handleCellChange={handleCellChange}
      />
    </div>
  );
}

export default FileEditor;
