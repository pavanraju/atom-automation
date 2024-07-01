const report = require('multiple-cucumber-html-reporter');
import * as fs from 'fs';
import * as fsxtra from 'fs-extra'
import Helper from './Helper';

const helper:Helper = new Helper();


let currentDirectory = process.cwd();
let currentDirectoryFilePath = currentDirectory.replace(new RegExp(/\\/g), '/');
let executionReportFolder = "ExecutionReport_"+helper.getDateFormatted(new Date().getTime());
const htmlReportFolderName = "/report/htmlOutput/"+executionReportFolder;

const jsonFilesDirectory = '/report/jsonOutput/';
const cucumberHtmlFileDirectory = '/report/cucumberHtmlOutput/';

let executionInfo = JSON.parse(fs.readFileSync("report/executioninfo.json").toString());


console.log("Generation html reports to htmlOutput started");


report.generate({
	reportName: "Product Execution Report",
    pageTitle: "Product Execution Report",
    jsonDir: currentDirectoryFilePath + jsonFilesDirectory,
    reportPath: currentDirectoryFilePath + htmlReportFolderName,
    saveCollectedJSON: true,
    hideMetadata: true,
    displayReportTime : true,
    displayDuration : true,
    customData: {
        title: 'Run info',
        data: [
            {label: 'Start Time', value: helper.getDateFormatted(Number(executionInfo.startTime))},
            {label: 'End Time', value: helper.getDateFormatted(Number(executionInfo.endTime))},
            {label: 'Time Taken', value: helper.getTimeTaken(Number(executionInfo.startTime), Number(executionInfo.endTime))}
        ]
    }
});
fsxtra.copySync(currentDirectoryFilePath + jsonFilesDirectory, currentDirectoryFilePath + htmlReportFolderName+"/jsonOutput");
fsxtra.copySync(currentDirectoryFilePath + cucumberHtmlFileDirectory, currentDirectoryFilePath + htmlReportFolderName);


console.log("Generation html reports to htmlOutput completed");