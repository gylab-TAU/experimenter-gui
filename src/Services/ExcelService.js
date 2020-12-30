import ExcelJS from "exceljs/dist/es5/exceljs.browser";
import saveAs from "file-saver";

class ExcelService {
    constructor(){}
    excelExport = () => {
        
        let workbook = new ExcelJS.Workbook();

        console.log("here")
        workbook.csv.writeBuffer().then((buffer) => {
            saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),

                'file.csv'
            );
        });
    }
}

export default ExcelService;