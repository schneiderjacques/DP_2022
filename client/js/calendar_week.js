import { getPreviousDay, getNextDay, searchDateInArray, formatNumber, getNumberOfDayBetween2Date } from './date_tools.js'


const heures = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

initHours();

function initHours() {
    const parent = document.getElementById("hours-container");
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

var currentWeekDate = new Date();



document.getElementById('btn-next-week').addEventListener('click', function () { //Bouton pour afficher le mois suivant
    currentWeekDate = getNextDay(currentWeekDate, 8);
    refreshCalendar(currentWeekDate)

})

document.getElementById('btn-previous-week').addEventListener('click', function () { //Bouton pour afficher le mois précédent
    currentWeekDate = getPreviousDay(currentWeekDate, 6);
    refreshCalendar(currentWeekDate)
})








setWeekTableHeaderByDay(currentWeekDate);

function refreshCalendar(date){
    document.getElementById("events-container").innerHTML = "";
    document.getElementById("week-headers").innerHTML = "";
    var div = document.createElement("div");
    div.classList.add("col-end-1", "w-14");
    document.getElementById("week-headers").appendChild(div);
    document.getElementById("week-headers-responsive").innerHTML = "";
    setWeekTableHeaderByDay(date);
}




function setDateName(date){
    var button = document.getElementById("btn-week-name");
    var dt;
    date.getDate() < 10 ? dt = "0" + date.getDate() : dt = date.getDate();
    date.getMonth() < 9 ? dt += "-0" + (date.getMonth()+1) : dt += "-" + (date.getMonth()+1);
    dt += "-" + date.getFullYear();
    button.innerHTML = dt;
}

function setWeekNumber(dt){
    var startDate = new Date(dt.getFullYear(), 0, 1);
    var days = Math.floor((dt - startDate) /
        (24 * 60 * 60 * 1000));
         
    var weekNumber = Math.ceil(days / 7);
    document.getElementById("main-title-week").innerHTML = "Semaine " + weekNumber + " " + dt.getFullYear();
}


function setWeekTableHeaderByDay(dt){ //Met en place le header du tableau (Lun 10, Mar 11, etc...)
    const firstDayOfWeek = getFirstDayOfWeek(dt);
    const week = getAllDaysFromWeek(firstDayOfWeek);
    setWeekNumber(dt); //Met en place le numéro de la semaine;
    var parent = document.getElementById("week-headers");
    var parent_responsive = document.getElementById("week-headers-responsive");
    for (let i = 0; i < week.length; i++) {

        if (i == 0) setDateName(week[i]); //Met en place la date de la semaine

        const name = getDayName(week[i]).slice(0,3) + " "; //récupère le nom du jour et le coupe à 3 lettres
        const day = week[i].getDate(); //On récupère le jour
        var div = document.createElement("div"); //on créer une div qui contiendra le nom du jour et le numéro du jour
        div.classList.add("flex", "items-center", "justify-center", "py-3");
        var span = document.createElement("span");
        span.innerHTML = name;
        var span_children = document.createElement("span");

        span_children.innerHTML = day;
        const aujourd = new Date();
        if(week[i].getDate() === aujourd.getDate() && week[i].getMonth() === aujourd.getMonth() && week[i].getFullYear() === aujourd.getFullYear()){
            span_children.classList.add("ml-1.5", "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-full", "bg-indigo-600", "font-semibold", "text-white");
        } else {
            span_children.classList.add("ml-1.5","items-center", "justify-center", "font-semibold", "text-gray-900");
        }

        div.appendChild(span);
        div.appendChild(span_children);
        parent.appendChild(div);

        //responsive
        var button = document.createElement("button");
        button.classList.add("flex", "flex-col", "items-center", "pt-2", "pb-3");
        button.type = "button";
        var span_responsive = document.createElement("span");
        span_responsive.innerHTML = name + " ";
        var span_responsive_children = document.createElement("span");
        span_responsive_children.innerHTML = day;
        
        if(week[i].getDate() === aujourd.getDate() && week[i].getMonth() === aujourd.getMonth() && week[i].getFullYear() === aujourd.getFullYear()){
            span_responsive_children.classList.add("mt-1", "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-full", "bg-indigo-600", "font-semibold", "text-white");
        } else {
            span_responsive_children.classList.add("mt-1", "flex", "h-8", "w-8", "items-center", "justify-center", "font-semibold", "text-gray-900");
        }

        button.appendChild(span_responsive);
        button.appendChild(span_responsive_children);
        parent_responsive.appendChild(button);

        setUpEventsByDate(week[i]);




    }
}

function setUpEventsByDate(date){
    var events = searchDateInArray(date);

    for (let i = 0; i < events.length; i++) {

        const dayColumnIndex = new Date(events[i].date).getDay();
        const dayDebut = new Date(Date.parse(events[i].heureDebut));
        const dayFin = new Date(Date.parse(events[i].heureFin));

        if(dayDebut.getDate() != dayFin.getDate() || dayDebut.getMonth() != dayFin.getMonth()){
            
            const debutRdvInDecimal = timeToDecimal(dayDebut.getHours() + ":" + dayDebut.getMinutes());
            const gridRow = (debutRdvInDecimal * 6 * 2 + 2);



            createWeekRdv(dayColumnIndex, dayDebut, events[i].nom, gridRow, (12*(24 - dayDebut.getHours())) );

            for(let j = (dayDebut.getDay()+1) ; j < (dayFin.getDay()+1); j++){
                if (j == dayFin.getDay()) {
                    createWeekRdvSquence(j, dayDebut, 2, (12*(24 - dayFin.getHours())) );
                } else {
                    createWeekRdvSquence(j, dayDebut, 2, 288 );
                }
            }
            

       


        } else{
            //Différence entre deux dates
            var diff = getMinDiff(dayDebut, dayFin);
            //60 minute = 12 span
            //1 span = 5 minutes
            const span = diff / 5;
            
            const debutRdvInDecimal = timeToDecimal(dayDebut.getHours() + ":" + dayDebut.getMinutes());
            const gridRow = (debutRdvInDecimal * 6 * 2 + 2);
            createWeekRdv(dayColumnIndex, dayDebut, events[i].nom, gridRow, span );
        }
        
    }

}

function getFirstDayOfWeek(dt){
    var day = dt.getDay();
    var diff = dt.getDate() - day + (day == 0 ? -6:1)-1;
    return new Date(dt.setDate(diff));
}
function getAllDaysFromWeek(dt){
    var days = [];
    for (let i = 0; i < 7; i++) {
        days.push(new Date(dt.setDate(dt.getDate() + 1)));
    }
    return days;
}
function getDayName(dt){
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    return days[dt.getDay()];
}
function getMinDiff(startDate, endDate) {
    const msInMinute = 60 * 1000;
  
    return Math.round(
      Math.abs(endDate - startDate) / msInMinute
    );
  }
  function timeToDecimal(t) {
    var arr = t.split(':');
    var dec = parseInt((arr[1]/6)*10, 10);

    return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);
}
function createWeekRdv(dayColumnIndex, dayDebut, event_name, gridRow, span){
    var events_container = document.getElementById("events-container");
    var li = document.createElement("li");
    li.classList.add("relative", "mt-px", "flex", ("sm:col-start-"+dayColumnIndex), ("col-start-"+dayColumnIndex));
    li.style.gridRow = gridRow + " / span " + span;
    var a = document.createElement("a");
    a.classList.add("group", "absolute", "inset-1", "flex", "flex-col", "overflow-y-auto", "rounded-lg", "bg-blue-50", "p-2", "text-xs", "leading-5", "hover:bg-blue-100");
    var p = document.createElement("p");
    p.classList.add("order-1", "font-semibold", "text-blue-700");
    p.innerHTML = event_name;
    var p2 = document.createElement("p");
    p2.classList.add("text-blue-500", "group-hover:text-blue-700");
    var time = document.createElement("time");
    time.classList.add("text-blue-500", "group-hover:text-blue-700");
    time.setAttribute("datetime",dayDebut.toISOString());
    time.innerHTML = formatNumber(dayDebut.getHours()) + ":" + formatNumber(dayDebut.getMinutes());
    p2.appendChild(time);
    a.appendChild(p);
    a.appendChild(p2);
    li.appendChild(a);
    events_container.appendChild(li);
}
function createWeekRdvSquence(dayColumnIndex, dayDebut, gridRow, span){
    var events_container = document.getElementById("events-container");
    var li = document.createElement("li");
    li.classList.add("relative", "mt-px", "flex", ("sm:col-start-"+dayColumnIndex), ("col-start-"+dayColumnIndex));
    li.style.gridRow = gridRow + " / span " + span;
    var a = document.createElement("a");
    a.classList.add("group", "absolute", "inset-1", "flex", "flex-col", "overflow-y-auto", "rounded-lg", "bg-blue-50", "p-2", "text-xs", "leading-5", "hover:bg-blue-100");
    var p = document.createElement("p");
    p.classList.add("order-1", "font-semibold", "text-blue-700");
    var p2 = document.createElement("p");
    p2.classList.add("text-blue-500", "group-hover:text-blue-700");
    var time = document.createElement("time");
    time.classList.add("text-blue-500", "group-hover:text-blue-700");
    time.setAttribute("datetime",dayDebut.toISOString());
    p2.appendChild(time);
    a.appendChild(p);
    a.appendChild(p2);
    li.appendChild(a);
    events_container.appendChild(li);
}