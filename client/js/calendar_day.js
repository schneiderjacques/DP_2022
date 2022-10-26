import {initHours,getFirstDayOfWeek,refreshAllCalendars, getAllDaysFromWeek, getDayName,getMonthName, setNextDay, setPreviousDay, getMinDiff, timeToDecimal, formatNumber} from "./date_tools.js";
import {fetchDataGet} from "./request.js";


initHours("hours-container-day");


document.getElementById("btn-next-day").addEventListener("click", function(){
    setNextDay(1);
    refreshAllCalendars();
});

document.getElementById("btn-previous-day").addEventListener("click", function(){
    setPreviousDay(1);
    refreshAllCalendars();
});



export function refreshCalendarDay(date){
    document.getElementById("btn-day-name").innerHTML = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
    document.getElementById("main-title-day").innerHTML = getDayName(date).substring(0,3) + ". " + date.getDate() + " " + getMonthName(date) + " " + date.getFullYear();

    document.getElementById("day-headers").innerHTML = "";

    const firstDayOfWeek = getFirstDayOfWeek(date);
    const days = getAllDaysFromWeek(firstDayOfWeek);
    
   
    for (let i = 0; i < days.length; i++) {
        var button = document.createElement("button");
        button.classList.add("flex", "flex-col", "items-center", "pt-3", "pb-1.5");
        button.type = "button";
        var span = document.createElement("span");
        span.innerHTML = getDayName(days[i]).charAt(0);
        var span_children = document.createElement("span");
        if (days[i].getDate() === new Date().getDate() && days[i].getMonth() === new Date().getMonth() && days[i].getFullYear() === new Date().getFullYear()) {
            span_children.classList.add("mt-3", "flex", "h-8", "w-8", "items-center", "justify-center", "rouned-full" ,"text-base", "font-semibold", "text-indigo-600");
        } else {
            if (days[i].getDate() === date.getDate() && days[i].getMonth() === date.getMonth() && days[i].getFullYear() === date.getFullYear()) {
                span_children.classList.add("mt-3", "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-full" , "bg-gray-900", "font-semibold", "text-white");
            } else {
            span_children.classList.add("mt-3", "flex", "h-8", "w-8", "items-center", "justify-center", "rouned-full" ,"text-base", "font-semibold", "text-gray-900");
            }
        }
        span_children.innerHTML = days[i].getDate();
        button.appendChild(span);
        button.appendChild(span_children);
        document.getElementById("day-headers").appendChild(button);
        
    }
    createDayRdv(date);
}


function createDayRdv(date){
    fetchDataGet('day_planning/' + date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate())
    .then(response => {
        const rdvs = response;
        var events_container = document.getElementById("day-rdv");
        events_container.innerHTML = "";

        for (let i = 0; i < rdvs.length; i++) {
            const dtRdv = new Date(rdvs[i].date);
            if(dtRdv.getDate() === date.getDate() && dtRdv.getMonth() === date.getMonth() && dtRdv.getFullYear() === date.getFullYear()){
                const dayDebut = new Date(rdvs[i].heureDebut);
                const dayFin = new Date(rdvs[i].heureFin);


                
                //Différence entre deux dates
                var diff = getMinDiff(dayDebut, dayFin);
                //60 minute = 12 span
                //1 span = 5 minutes
                const span = diff / 5;

                const debutRdvInDecimal = timeToDecimal(dayDebut.getHours() + ":" + dayDebut.getMinutes());
                const gridRow = (debutRdvInDecimal * 6 * 2 + 2);


                var li = document.createElement("li");
                li.classList.add("relative", "mt-px", "flex");
                li.style.gridRow = gridRow + " / span " + span;
                var a = document.createElement("a");
                a.classList.add("group", "absolute", "inset-1", "flex", "flex-col", "overflow-y-auto", "rounded-lg", "bg-blue-50", "p-2", "text-xs", "leading-5", "hover:bg-blue-100");
                var p = document.createElement("p");
                p.classList.add("order-1", "font-semibold", "text-blue-700");
                p.innerHTML = rdvs[i].nom;
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
        }




    
    })
    .catch(error => console.log('error', error));   
}




