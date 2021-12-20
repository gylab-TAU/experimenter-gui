import axios from 'axios';

class DataService {
    getExperimenters = async() => {
        let data =  await axios.get("http://178.62.106.190/saveResults/getAllExperimenters");

        return data.data;
    }

    getExperiments = async(experimenterName) => {
        let data =  await axios.get("http://178.62.106.190/saveResults/getExperimenterFolder/" + experimenterName);

        return data.data;
    }

    getExperimentNames = async(experimenterName) => {
        let data = await this.getExperiments(experimenterName);
        
        let names = [];
        
        data.forEach(experiment => {
            names.push(experiment.name);
        });

        return names;
    }

    getExperimentParticipants = async(experimenterName, experimentName) => {
        let experiments = await this.getExperiments(experimenterName);

        let participants = null;
        let duplicates = null;

        experiments.forEach(experiment => {
            if (experiment.name == experimentName){
                participants = experiment.participants;
                duplicates = experiment.duplicates;                                                                                                                                                                                                                                                                                                                                           
            }
        });

        return {participants: participants, duplicates: duplicates};
    }

    getExperimentResultsAsUnifiedFile = async(experimenterName, experimentName, ids) => { 
        let data = await axios.post("http://178.62.106.190/saveResults/getUnifiedParticipantsData/" + experimenterName + "/" + experimentName, {
            participant_ids: ids
        });

        return data;
    }

    getExcelDataForEachParticipant = async(experimenterName, experimentName, ids) => {
        let data = await axios.post("http://178.62.106.190/saveResults/getParticipsntsDataForExcel/" + experimenterName + "/" + experimentName, {
            participant_ids: ids
        });

        return data.data;
    }
}

export default DataService;