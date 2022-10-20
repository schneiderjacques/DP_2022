
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


setWeekTableHeaderByDay(new Date());

function setWeekTableHeaderByDay(dt){ //Met en place le header du tableau (Lun 10, Mar 11, etc...)
    const firstDayOfWeek = getFirstDayOfWeek(dt);
    const week = getAllDaysFromWeek(firstDayOfWeek);
    var parent = document.getElementById("week-headers");
    var parent_responsive = document.getElementById("week-headers-responsive");
    for (let i = 0; i < week.length; i++) {
        const name = getDayName(week[i]).slice(0,3) + " ";
        const day = week[i].getDate();
        var div = document.createElement("div");
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