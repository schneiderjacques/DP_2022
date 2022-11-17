export function formatNumber(nb) {
  //Renvoie l'heure d'une date au bon format
  if (nb < 10) {
    return "0" + nb;
  }
  return nb;
}

export function getHourAndMinuteFromDate(date) {
  //Renvoie l'heure d'une date au bon format
  return formatNumber(date.getHours()) + ":" + formatNumber(date.getMinutes());
}

export function formatGridRowAndSpanHeight(dayDebut, dayFin) {
  const gridRow = getGridRow(new Date(dayDebut));
  const spanHeight = getSpanHeight(new Date(dayDebut), new Date(dayFin));
  return "grid-row: " + gridRow + " / span " + spanHeight;
}

export function getGridRow(dayDebut) {
  return (
    timeToDecimal(dayDebut.getHours() + ":" + dayDebut.getMinutes()) * 6 * 2 + 2
  );
}

export function getSpanHeight(dayDebut, dayFin) {
  const diff = getMinDiff(dayDebut, dayFin);
  return diff / 5;
}

export function getMinDiff(startDate, endDate) {
  //renvoie la différence en minutes entre deux dates
  const msInMinute = 60 * 1000;

  return Math.round(Math.abs(endDate - startDate) / msInMinute);
}

export function timeToDecimal(t) {
  //renvoie l'heure en décimal entre deux heures
  const arr = t.split(":");
  let dec = parseInt((arr[1] / 6) * 10, 10);

  return parseInt(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
}

export function convertHex(hex, opacity) {
  //convert hex to rgba
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
}

export function getMonthName(date) {
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return monthNames[date.getMonth()];
}

export function getDayName(date) {
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  return dayNames[date.getDay()];
}

export function getDateName(date) {
  return (
    getDayName(date) +
    ". " +
    date.getDate() +
    " " +
    getMonthName(date) +
    " " +
    date.getFullYear()
  );
}

export function formatDate(date) {
  return (
    formatNumber(date.getDate()) +
    "-" +
    formatNumber(date.getMonth() + 1) +
    "-" +
    date.getFullYear()
  );
}

export function getFirstDayOfWeek(dt) {
  let tmp = new Date(dt);
  const day = tmp.getDay();
  const diff = tmp.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(tmp.setDate(diff));
}

export function getAllDaysOfWeek(dt) {
  const firstDay = getFirstDayOfWeek(dt);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const tmp = new Date(firstDay);
    tmp.setDate(tmp.getDate() + i);
    days.push(tmp);
  }
  return days;
}

export function areDateEqual(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function changeState() {
  const picker = document.getElementById("date-picker");
  picker.type = "date";
  picker.showPicker();
}

export function decrementFirst(first) {
  let value;
  if (first) {
    value = this.heureDebut.split(":");
  } else {
    value = this.heureFin.split(":");
  }
  let hours = parseInt(value[0]);
  let minutes = parseInt(value[1]);
  if (minutes === 0) {
    minutes = 50;
    hours--;
  } else {
    minutes -= 10;
  }
  if (hours === -1) {
    hours = 23;
  }
  if (first) {
    this.heureDebut = formatNumber(hours) + ":" + formatNumber(minutes);
  } else {
    this.heureFin = formatNumber(hours) + ":" + formatNumber(minutes);
  }
}

export function incrementFirst(first) {
  let value;
  if (first) {
    value = this.heureDebut.split(":");
  } else {
    value = this.heureFin.split(":");
  }
  let hours = parseInt(value[0]);
  let minutes = parseInt(value[1]);
  if (minutes === 50) {
    minutes = 0;
    hours++;
  } else {
    minutes += 10;
  }
  if (hours === 24) {
    hours = 0;
  }
  if (first) {
    this.heureDebut = formatNumber(hours) + ":" + formatNumber(minutes);
  } else {
    this.heureFin = formatNumber(hours) + ":" + formatNumber(minutes);
  }
}

function daysInMonth(month, year) {
  //Renvoi le premier jour du mois
  return new Date(year, month + 1, 0).getDate();
}

function getNextDayFromMonday(date, nb) {
  const next = new Date(date.getTime());
  next.setDate(date.getDate() + nb);
  return next;
}

function getPreviousDayByDate(date, nb) {
  const next = new Date(date.getTime());
  next.setDate(date.getDate() - nb);
  return next;
}

export function getAllDaysFromMonth(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    //Renvoie tout les jours d'un mois, du mois précédent visible et du mois suivant visible (cases grises)
    let days = []; //Tout les jours du mois
    let firstDays = []; //Les jours du mois précédents qu'on peut afficher
    const lastDays = []; //Les jours du mois d'après qu'on peu afficher
    for (let i = 1; i <= daysInMonth(month, year); i++) {
        let day = new Date(year, month, i);
        days.push(day);
    }
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(days[days.length - 1]);

    let previousDays = new Date(days[0]).getDay() - 1; //Jours précédents du mois M étudié
    if (previousDays === -1) {
        previousDays = 6;
    }
    const nextdays = 42 - (days.length + previousDays); //Jours suivant qu'on peut toujours remplir

    for (let i = previousDays; i > 0; i--) {
        firstDays.push(getPreviousDayByDate(firstDayOfMonth, i));
    }
    for (let j = 0; j < nextdays; j++) {
        lastDays.push(getNextDayFromMonday(lastDayOfMonth,j + 1));
    }

    const final = firstDays.concat(days, lastDays);
    return final;
}