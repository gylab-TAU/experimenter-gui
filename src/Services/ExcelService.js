import ExcelJS from "exceljs/dist/es5/exceljs.browser";
import saveAs from "file-saver";
import JSZip, { files } from "jszip";

class ExcelService {
    constructor() { }
    excelExport = () => {

        let workbook = new ExcelJS.Workbook();

        workbook.csv.writeBuffer().then((buffer) => {
            saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),

                'file.csv'
            );
        });
    }

    zipExport = async () => {
        let zip = new JSZip();
        
        for (let i = 0; i < 5; i++) {
            let workbook = new ExcelJS.Workbook();

            let buffer = await workbook.csv.writeBuffer();

            let blob = new Blob([buffer], { type: "application/octet-stream" });
            zip.file(i+".csv", blob, {binary: true});
        }

            
            zip.generateAsync({type: "blob"}).then((content) => {
                saveAs(content, "folder.zip");
            })        
    }
}

export default ExcelService;