let current_date = new Date();



function getAllDaysFromMonth(month, year) {
  //Renvoie tout les jours d'un mois, du mois précédent visible et du mois suivant visible (cases grises)
  let days = []; //Tout les jours du mois
  let firstDays = []; //Les jours du mois précédents qu'on peut afficher
  const lastDays = []; //Les jours du mois d'après qu'on peu afficher

  for (let i = 1; i <= daysInMonth(month, year); i++) {
    let day = new Date(year, month, i);
    days.push(day);
  }
  const firstDayOfMonth = new Date(days[0]);
  const lastDayOfMonth = new Date(days[days.length - 1]);

  let previousDays = new Date(days[0]).getDay() - 1; //Jours précédents du mois M étudié
  if (previousDays == -1) {
    previousDays = 6;
  }
  const nextdays = 42 - (days.length + previousDays); //Jours suivant qu'on peut toujours remplir

  for (let i = previousDays; i > 0; i--) {
    firstDays.push(getPreviousDay(i));
  }

  for (let i = 0; i < nextdays; i++) {
    lastDays.push(getNextDay(i + 1));
  }

  const final = firstDays.concat(days, lastDays);
  return final;
}

function daysInMonth(month, year) {
  //Renvoi le premier jour du mois
  return new Date(year, month + 1, 0).getDate();
}

function setPreviousDay(nb) {
  //renvoie le n jour précédent de date
  const previous = new Date(current_date.getTime());
  previous.setDate(current_date.getDate() - nb);
  current_date = previous;
}
function setNextDay(nb) {
  //renvoie le N jour suivant de date
  const next = new Date(current_date.getTime());
  next.setDate(current_date.getDate() + nb);
  current_date = next;
}

function isDateEqual(date1, date2) {
  //Check si deux dates sont égales
  date2.setHours("00", "00", "00", "00");
  date1.setHours("00", "00", "00", "00");
  return date1.getTime() == date2.getTime();
}

function searchDateInArray(date, array) {
  //Renvoie les rendez vous d'un jour
  let results = [];
  for (let i = 0; i < array.length; i++) {
    if (isDateEqual(date, new Date(array[i].date))) {
      results.push(array[i]);
    }
  }
  return results;
}
function formatNumber(nb) {
  //Renvoie l'heure d'un date
  if (nb < 10) {
    return "0" + nb;
  }
  return nb;
}
function getNumberOfDayBetween2Date(date1, date2) {
  //renvoie le nombre de jour entre deux dates
  return Math.round((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
}
function getDayName(dt) {
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return days[dt.getDay()];
}
function getMonthName(dt) {
  const months = [
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
  return months[dt.getMonth()];
}
function getFirstDayOfWeek(dt) {
  let tmp = new Date(dt);
  const day = tmp.getDay();
  const diff = tmp.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(tmp.setDate(diff));
}
function getNextDay(nb) {
  const next = new Date(current_date.getTime());
  next.setDate(current_date.getDate() + nb);
  return next;
}
function getPreviousDay(nb) {
  const next = new Date(current_date.getTime());
  next.setDate(current_date.getDate() - nb);
  return next;
}
function getNextDayFromMonday(date, nb) {
  const next = new Date(date.getTime());
  next.setDate(date.getDate() + nb);
  return next;
}
function getAllDaysFromWeek(dt) {
  let days = [];
  for (let i = 0; i < 7; i++) {
    days.push(getNextDayFromMonday(dt, i));
  }
  return days;
}

function initHours(name) {
  const heures = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  const parent = document.getElementById(name);
  for (let i = 0; i < heures.length; i++) {
    let div = document.createElement("div");
    let child = document.createElement("div");
    div.classList.add(
      "sticky",
      "left-0",
      "z-20",
      "-mt-2.5",
      "-ml-14",
      "w-14",
      "pr-2",
      "text-right",
      "text-xs",
      "leading-5",
      "text-gray-400"
    );
    div.innerHTML = heures[i] + ":00";
    child.appendChild(div);
    parent.appendChild(child);
    parent.appendChild(document.createElement("div"));
  }
}

function getMinDiff(startDate, endDate) {
  //renvoie la différence en minutes entre deux dates
  const msInMinute = 60 * 1000;

  return Math.round(Math.abs(endDate - startDate) / msInMinute);
}

function timeToDecimal(t) {
  //renvoie l'heure en décimal entre deux heures
  const arr = t.split(":");
  let dec = parseInt((arr[1] / 6) * 10, 10);

  return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
}
function convertHex(hex, opacity) {
  //convert hex to rgba
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
}
function getSpanHeight(dayDebut, dayFin) {
  const diff = getMinDiff(dayDebut, dayFin);
  return diff / 5;
}
function getGridRow(dayDebut) {
  return (
    timeToDecimal(dayDebut.getHours() + ":" + dayDebut.getMinutes()) * 6 * 2 + 2
  );
}
function createFrontOfRdv(eventName, dayDebut, p, a) {
  //Créer la span d'heure et de titre d'un rdv
  p.innerHTML = eventName;
  let p2 = document.createElement("p");
  p2.classList.add("text-black-500", "group-hover:text-black-700");
  let time = document.createElement("time");
  time.classList.add("text-black-500", "group-hover:text-black-700");
  time.setAttribute("datetime", dayDebut.toISOString());
  time.innerHTML =
    formatNumber(dayDebut.getHours()) +
    ":" +
    formatNumber(dayDebut.getMinutes());
  p2.appendChild(time);
  a.appendChild(p);
  a.appendChild(p2);
  return a;
}
function areDateEquals(date1, date2) {
  //renvoie true si les dates sont égales
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
