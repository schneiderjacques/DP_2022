

import { refreshCalendarDay } from './calendar_day.js';
import { refreshCalendarWeek } from './calendar_week.js';
import { refreshCalendarMonth } from './calendar_month.js';

var current_date = new Date();

const heures = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const minutes = ["00","05","10","15","20","25","30","35","40","45","50","55"];
initHoursOfModal();

refreshAllCalendars();
export function refreshAllCalendars(){
    refreshCalendarDay(current_date);
    refreshCalendarWeek(current_date);
    //refreshCalendarMonth(current_date.getMonth(), current_date.getFullYear());
}

function initHoursOfModal(){//Met en place les heures dans le modal
    var debutRdv = document.getElementById("first-hour");
    var finRdv = document.getElementById("second-hour");
    for (var i = 0; i < heures.length; i++){
        for(var j = 0; j < minutes.length; j++){
            var option = document.createElement("option");
            option.value = heures[i] + ":" + minutes[j];
            option.text = heures[i] + ":" + minutes[j]
            debutRdv.add(option);
            finRdv.add(option.cloneNode(true));
        }
    }
       
}

export function getAllDaysFromMonth(month, year) { //Renvoie tout les jours d'un mois, du mois précédent visible et du mois suivant visible (cases grises)
    let days = []; //Tout les jours du mois
    let firstDays = []; //Les jours du mois précédents qu'on peut afficher
    const lastDays = []; //Les jours du mois d'après qu'on peu afficher

    for (let i = 1; i <= daysInMonth(month, year); i++) {
        let day = new Date(year, month, i);
        days.push(day);
    }
    const firstDayOfMonth = new Date(days[0]);
    const lastDayOfMonth = new Date(days[days.length - 1]);

    var previousDays = new Date(days[0]).getDay() - 1; //Jours précédents du mois M étudié
    if(previousDays == -1){
        previousDays = 6;
    }
    const nextdays = 42 - (days.length + previousDays); //Jours suivant qu'on peut toujours remplir

    for (let i = previousDays; i > 0; i--) {
        firstDays.push(getPreviousDay(firstDayOfMonth, i));
    }

    for (let i = 0; i < nextdays; i++) {
        lastDays.push(getNextDay(lastDayOfMonth, i + 1));
    }

    const final = firstDays.concat(days, lastDays);
    return final;
}

export function daysInMonth(month, year) { //Renvoi le premier jour du mois
    return new Date(year, month + 1, 0).getDate();
}


export function setPreviousDay(nb) {//renvoie le n jour précédent de date
    const previous = new Date(current_date.getTime());
    previous.setDate(current_date.getDate() - nb);
    current_date = previous;
}
export function setNextDay(nb) { //renvoie le N jour suivant de date
    const next = new Date(current_date.getTime());
    next.setDate(current_date.getDate() + nb);
    current_date = next;
}

export function isDateEqual(date1, date2) { //Check si deux dates sont égales
    date2.setHours("00", "00", "00", "00");
    date1.setHours("00", "00", "00", "00");
    return date1.getTime() == date2.getTime();
}

export function searchDateInArray(date, array) { //Renvoie les rendez vous d'un jour
    var results = [];
    for (let i = 0; i < array.length; i++) {
        if (isDateEqual(date, new Date(array[i].date))) {
            results.push(array[i]);
        }
    }
    return results;
}
export function formatNumber(nb) { //Renvoie l'heure d'un date
    return nb < 10 ? nb = "0" + nb : nb;
}
export function getNumberOfDayBetween2Date(date1, date2){//renvoie le nombre de jour entre deux dates
    return Math.round((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
}
export function getDayName(dt){
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    return days[dt.getDay()];
}
export function getMonthName(dt){
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return months[dt.getMonth()];
}
export function getFirstDayOfWeek(dt){
    var tmp = new Date(dt);
    const day = tmp.getDay(); 
    const diff = tmp.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(tmp.setDate(diff));
}
export function getNextDay(nb){
    const next = new Date(current_date.getTime());
    next.setDate(current_date.getDate() + nb);
    return next;
}
function getNextDayFromMonday(date,nb){
    const next = new Date(date.getTime());
    next.setDate(date.getDate() + nb);
    return next;
}
export function getAllDaysFromWeek(dt){
    var days = [];
    for (let i = 0; i < 7; i++) {
        days.push(getNextDayFromMonday(dt,i));
    }
    return days;
}


export function initHours(name) {
    const heures = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    const parent = document.getElementById(name);
    for (let i = 0; i < heures.length; i++) {
        let div = document.createElement("div");
        let child = document.createElement("div");
        div.classList.add("sticky", "left-0", "z-20", "-mt-2.5", "-ml-14", "w-14", "pr-2", "text-right", "text-xs", "leading-5", "text-gray-400");
        div.innerHTML = heures[i] + ":00";
        child.appendChild(div);
        parent.appendChild(child);
        parent.appendChild(document.createElement("div"));
    }
}

export function getMinDiff(startDate, endDate) { //renvoie la différence en minutes entre deux dates
    const msInMinute = 60 * 1000;
  
    return Math.round(
      Math.abs(endDate - startDate) / msInMinute
    );
    }

export function timeToDecimal(t) { //renvoie l'heure en décimal entre deux heures
        var arr = t.split(':');
        var dec = parseInt((arr[1]/6)*10, 10);
    
        return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);
    }