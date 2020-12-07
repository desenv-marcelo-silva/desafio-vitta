const moment = require("moment");

const dateToIso = (date) => moment(date).toISOString();
const isoToDate = (isoDate) => moment(isoDate).toDate();
const formatDateTime = (dateTime) => moment(dateTime).utc('-0300').format("DD/MM/yyyy HH:mm");
const formatDate = (date) => moment(date).utc('-0300').format("DD/MM/yyyy");
const timeToIso = (time) => moment(time, 'HH:mm').utc('-0300').toDate().toISOString();
const isoToTime = (time) => moment(time).utc('-0300').toDate().toISOString();

export {
  dateToIso,
  isoToDate,
  timeToIso,
  isoToTime,
  formatDate,
  formatDateTime
};