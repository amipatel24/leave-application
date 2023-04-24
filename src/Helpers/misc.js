export const getInitials = function (string) {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const convert = function (str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("-");
};


export const enumerateDaysBetweenDates = (startDate, endDate) => {
  var now = startDate.clone(),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    /* dates.push([
      now.format("MMM"),
      now.format("DD"),
      now.format("YYYY"),
      now.format("DD-MM-YYYY"),
    ]); */
    dates.push(now.format("DD-MM-YYYY"));
    now.add(1, "days");
  }

  return dates;
};

