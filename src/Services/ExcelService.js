import ExcelJS from "exceljs/dist/es5/exceljs.browser";
import saveAs from "file-saver";
import JSZip, { files } from "jszip";
import DataService from "./DataService";

class ExcelService {
    constructor() { }
    excelExport = async (experimentName, experimenterName, ids) => {
        const workbook = new ExcelJS.Workbook();

        let dataService = new DataService();

        let excelRows = await dataService.getExperimentResultsAsUnifiedFile(experimenterName, experimentName, ids);

        let sheet = workbook.addWorksheet('My Sheet');
        
        console.log(excelRows)

        if (excelRows.data.headers.length > 2){
            sheet.columns = excelRows.data.headers;
        }

        sheet.addRows(excelRows.data.lines);

        workbook.csv.writeBuffer().then((buffer) => {
            saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),

                'file.csv'
            );
        });
    }

    zipExport = async (experimentName, experimenterName, ids) => {
        let zip = new JSZip();

        let dataService = new DataService();

        let excels = await dataService.getExcelDataForEachParticipant(experimenterName, experimentName, ids);

        for (const excel of excels) {
            let workbook = new ExcelJS.Workbook();

            let sheet = workbook.addWorksheet(excel.participant_id);

            if (excel.participant_excel_data.headers.length > 2){
                sheet.columns = excel.participant_excel_data.headers;
            }

            sheet.addRows(excel.participant_excel_data.lines);

            let buffer = await workbook.csv.writeBuffer();

            let blob = new Blob([buffer], { type: "application/octet-stream" });
            zip.file(excel.participant_id + ".csv", blob, { binary: true });
        }

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "folder.zip");
        })
    }
}

export default ExcelService;