const log = (msg: string) => {
  const dateTime: Date = new Date();
  const timeStamp: string =
    dateTime.getFullYear().toString() +
    "-" +
    dateTime.getMonth().toString() +
    "-" +
    ("0" + dateTime.getDate()).slice(-2) +
    " " +
    dateTime.getHours().toString() +
    ":" +
    dateTime.getMinutes().toString() +
    ":" +
    dateTime.getSeconds().toString();

  console.log(timeStamp, "\n", msg, "\n");
};

export default log;
