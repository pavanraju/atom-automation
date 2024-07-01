import moment from 'moment';

export default class Helper{

    getDateFormatted(timestamp : number){
        return moment(new Date(timestamp)).format("DD-MMM-YYYY_HH-mm-ss");
    }

    getTimeTaken(starttime : number, endtime : number){
        return moment.utc(endtime - starttime).format('HH:mm:ss.SSS')
    }

}