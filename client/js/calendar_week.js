import {
  setPreviousDay,
  setNextDay,
  formatNumber,
  getDayName,
  getFirstDayOfWeek,
  getAllDaysFromWeek,
  initHours,
  getSpanHeight,
  getGridRow,
  searchDateInArray,
  getMonthName,
  refreshAllCalendars,
  convertHex,
  createFrontOfRdv,
  areDateEquals,
} from "./date_tools.js";
import { fetchDataGet } from "./request.js";

initHours("hours-container"); //Initie les heures (00:00, 01:00, 02:00, etc...)

document.getElementById("btn-next-week").addEventListener("click", function () {
  //Bouton pour afficher le mois suivant
  setNextDay(7);
  refreshAllCalendars();
});

document
  .getElementById("btn-previous-week")
  .addEventListener("click", function () {
    //Bouton pour afficher le mois précédent
    setPreviousDay(7);
    refreshAllCalendars();
  });

export function refreshCalendarWeek(date) {
  document.getElementById("events-container").innerHTML = "";
  document.getElementById("week-headers").innerHTML = "";
  let div = document.createElement("div");
  div.classList.add("col-end-1", "w-14");
  document.getElementById("week-headers").appendChild(div);
  document.getElementById("week-headers-responsive").innerHTML = "";
  setWeekTableHeaderByDay(date);
}

function setDateName(date) {
  let button = document.getElementById("btn-week-name");
  const dt =
    formatNumber(date.getDate()) +
    "-" +
    formatNumber(date.getMonth() + 1) +
    "-" +
    date.getFullYear();
  button.innerHTML = dt;
}

function setWeekNumber(dt) {
  const startDate = new Date(dt.getFullYear(), 0, 1);
  const days = Math.floor((dt - startDate) / (24 * 60 * 60 * 1000));

  const weekNumber = Math.ceil(days / 7);
  document.getElementById("main-title-week").innerHTML =
    "Sem. n°" + weekNumber + " (" + getMonthName(dt) + ") " + dt.getFullYear();
}

function setWeekTableHeaderByDay(dt) {
  //Met en place le header du tableau (Lun 10, Mar 11, etc...)
  const firstDayOfWeek = getFirstDayOfWeek(dt);
  const week = getAllDaysFromWeek(firstDayOfWeek);
  setWeekNumber(dt); //Met en place le numéro de la semaine;
  let parent = document.getElementById("week-headers");
  let parent_responsive = document.getElementById("week-headers-responsive");
  for (let i = 0; i < week.length; i++) {
    if (i === 0) setDateName(week[i]); //Met en place la date de la semaine
    const name = getDayName(week[i]).slice(0, 3) + " "; //récupère le nom du jour et le coupe à 3 lettres
    const day = week[i].getDate(); //On récupère le jour
    let div = document.createElement("div"); //on créer une div qui contiendra le nom du jour et le numéro du jour
    div.classList.add("flex", "items-center", "justify-center", "py-3");
    let span = document.createElement("span");
    span.innerHTML = name;
    let span_children = document.createElement("span");

    span_children.innerHTML = day;
    const aujourd = new Date();
    const dateEqual = areDateEquals(week[i], aujourd);
    if (dateEqual) {
      span_children.classList.add(
        "ml-1.5",
        "flex",
        "h-8",
        "w-8",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-indigo-600",
        "font-semibold",
        "text-white"
      );
    } else if (
      dt.getDate() === week[i].getDate() &&
      dt.getMonth() === week[i].getMonth() &&
      dt.getFullYear() === week[i].getFullYear()
    ) {
      span_children.classList.add(
        "ml-1.5",
        "flex",
        "h-8",
        "w-8",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-gray-900",
        "font-semibold",
        "text-white"
      );
    } else {
      span_children.classList.add(
        "ml-1.5",
        "items-center",
        "justify-center",
        "font-semibold",
        "text-gray-900"
      );
    }

    div.appendChild(span);
    div.appendChild(span_children);
    parent.appendChild(div);

    //responsive
    let button = document.createElement("button");
    button.classList.add("flex", "flex-col", "items-center", "pt-2", "pb-3");
    button.type = "button";
    let span_responsive = document.createElement("span");
    span_responsive.innerHTML = name + " ";
    let span_responsive_children = document.createElement("span");
    span_responsive_children.innerHTML = day;

    if (dateEqual) {
      span_responsive_children.classList.add(
        "mt-1",
        "flex",
        "h-8",
        "w-8",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-indigo-600",
        "font-semibold",
        "text-white"
      );
    } else {
      span_responsive_children.classList.add(
        "mt-1",
        "flex",
        "h-8",
        "w-8",
        "items-center",
        "justify-center",
        "font-semibold",
        "text-gray-900"
      );
    }

    button.appendChild(span_responsive);
    button.appendChild(span_responsive_children);
    parent_responsive.appendChild(button);

    const dateOfDay =
      firstDayOfWeek.getFullYear() +
      "-" +
      formatNumber(firstDayOfWeek.getMonth() + 1) +
      "-" +
      formatNumber(firstDayOfWeek.getDate());
    fetchDataGet("week_planning/" + dateOfDay).then((response) => {
      setUpEventsByDate(week[i], response);
    });
  }
}

function setUpEventsByDate(date, eventsArray) {
  //Met en place les événements dans le tableau
  const events = searchDateInArray(date, eventsArray);

  for (let i = 0; i < events.length; i++) {
    let dayColumnIndex = new Date(events[i].date).getDay();

    const dayDebut = new Date(Date.parse(events[i].heureDebut));
    const dayFin = new Date(Date.parse(events[i].heureFin));

    createWeekRdv(
      dayColumnIndex,
      dayDebut,
      events[i].nom,
      getGridRow(dayDebut),
      getSpanHeight(dayDebut, dayFin),
      events[i].couleur
    );
  }
}

function createWeekRdv(
  dayColumnIndex,
  dayDebut,
  event_name,
  gridRow,
  span,
  color
) {
  if (dayColumnIndex == 0) dayColumnIndex = 7;
  let events_container = document.getElementById("events-container");
  let li = document.createElement("li");
  li.classList.add(
    "relative",
    "mt-px",
    "flex",
    "sm:col-start-" + dayColumnIndex,
    "col-start-" + dayColumnIndex
  );
  li.style.gridRow = gridRow + " / span " + span;
  let a = document.createElement("a");
  a.classList.add(
    "group",
    "absolute",
    "inset-1",
    "flex",
    "flex-col",
    "cursor-pointer",
    "overflow-y-auto",
    "rounded-lg",
    "p-2",
    "text-xs",
    "leading-5"
  );
  a.style.backgroundColor = convertHex(color, 0.6);
  a.addEventListener("mouseover", function () {
    a.style.backgroundColor = convertHex(color, 0.9);
  });
  a.addEventListener("mouseout", function () {
    a.style.backgroundColor = convertHex(color, 0.6);
  });
  let p = document.createElement("p");
  p.classList.add("order-1", "font-semibold", "text-black-700");
  li.appendChild(createFrontOfRdv(event_name, dayDebut, p, a));
  events_container.appendChild(li);
}
