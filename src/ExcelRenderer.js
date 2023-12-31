import XLSX from 'xlsx';
import { read, utils } from 'xlsx';


export  default function ExcelRenderer(file, callback) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      var rABS = !!reader.readAsBinaryString;
      reader.onload = function(e) {
        /* Parse data */
        var bstr = e.target.result;
        var wb = read(bstr, { type: rABS ? "binary" : "array" });

        /* Get first worksheet */
        var wsname = wb.SheetNames[0];
        var ws = wb.Sheets[wsname];

        /* Convert array of arrays */
        var json = utils.sheet_to_json(ws, { header: 1 });
        var cols = make_cols(ws["!ref"]);

        var data = { rows: json, cols: cols };

        resolve(data);
        return callback(null, data);
      };
      if (file && rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
    });
  }

  function make_cols(refstr) {
    var o = [],
      C = utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i) {
      o[i] = { name: utils.encode_col(i), key: i };
    }
    return o;
  }