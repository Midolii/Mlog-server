import moment from "moment";

export const formatTimestamp = (timestamp: number) => {
    return moment(new Date(timestamp)).format("YYYY-MM-DD HH:mm:ss");
};
