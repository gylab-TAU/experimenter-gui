import axios from 'axios';

class DataService {
    getExperimenters = async() => {
        let data =  await axios.get("http://localhost:8000/getAllExperimenters");

        return data.data;
    }

    getExperiments = async(experimenterName) => {
        let data =  await axios.get("http://localhost:8000/getExperimenterFolder/" + experimenterName);

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

        experiments.forEach(experiment => {
            if (experiment.name == experimentName){
                participants = experiment.participants;
            }
        });

        return participants;
    }

    getExperimentResultsAsUnifiedFile = async(experimenterName, experimentName, ids) => { 
        let data = await axios.post("http://localhost:8000/getUnifiedParticipantsData/" + experimenterName + "/" + experimentName, {
            participant_ids: ids
        });

        return data;
    }

    getExcelDataForEachParticipant = async(experimenterName, experimentName, ids) => {
        let data = await axios.post("http://localhost:8000/getParticipsntsDataForExcel/" + experimenterName + "/" + experimentName, {
            participant_ids: ids
        });

        return data.data;
    }
}

export default DataService;