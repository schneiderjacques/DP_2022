                //Regarder si le cours peut commencer
                //Si il commence on calcule sa durée en nombre de cellules
                //Sinon on ajoute un <tr> <td></td> </tr> vide
//Créer une fonction qui à un jour donné renvoie le calendrier d'une journée.
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const quart = ["00", "15", "30", "45"];
const mes_rdv = {
    "rdvs": [
        {
            id: 0,
            date: "10-18-2022",
            heureDebut: "10-18-2022 08:00:00",
            heureFin: "10-18-2022 09:00:00",
            nom: "Anniversaire de sam",
        },
        {
            id: 1,
            date: "10-25-2022",
            heureDebut: "10-18-2022 14:00:00",
            heureFin: "10-18-2022 18:00:00",
            nom: "Cours de math",
        },
        {
            id: 2,
            date: "09-26-2022",
            heureDebut: "10-19-2022 14:00:00",
            heureFin: "10-19-2022 15:00:00",
            nom: "Cours d'anglais",
        },
        {
            id: 3,
            date: "10-18-2022",
            heureDebut: "10-18-2022 15:00:00",
            heureFin: "10-18-2022 16:00:00",
            nom: "Sortie VTT",
        },

    ]
}
hideMenu()

    function hideMenu(){
        document.getElementById('menu-selection').style.display = 'none';
    }
    function showMenu(){
        if(document.getElementById('menu-selection').style.display == 'block'){
            document.getElementById('menu-selection').style.display = 'none';
            return;
        }
        document.getElementById('menu-selection').style.display = 'block';

    }


    printCalendar(getAllDaysFromMonth(new Date().getMonth(), new Date().getFullYear()), new Date().getMonth());
    document.getElementById("main-title-month").innerHTML = getMonthName(new Date().getMonth()) + " " + new Date().getFullYear();


    function getMonthName(month){
        const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        return months[month];
    }
    function getAllDaysFromMonth(month, year){
        let days = []; //Tout les jours du mois
        let firstDays = []; //Les jours du mois précédents qu'on peut afficher
        const lastDays = []; //Les jours du mois d'après qu'on peu afficher

        for(let i = 1; i <= daysInMonth(month, year); i++){
            let day = new Date(year, month, i);
            days.push(day);
        }
        firstDayOfMonth = new Date(days[0]);
        lastDayOfMonth = new Date(days[days.length-1]);

        const previousDays = new Date(days[0]).getDay() - 1; //Jours précédents du mois M étudié
        const nextdays = 42 - (days.length + previousDays); //Jours suivant qu'on peut toujours remplir

        for(let i = previousDays; i > 0; i--){
            firstDays.push(getPreviousDay(firstDayOfMonth, i));
        }

        for(let i = 0; i < nextdays; i++){
            lastDays.push(getNextDay(lastDayOfMonth, i+1));
        }

        const final = firstDays.concat(days, lastDays);
        return final;
    }

    function daysInMonth (month, year) {
        return new Date(year, month+1, 0).getDate();
    }


    function getPreviousDay(date, nb) {//renvoie le n jour précédent de date
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - nb);
        return previous;
      }
      function getNextDay(date,nb){ //renvoie le N jour suivant de date
        const next = new Date(date.getTime());
        next.setDate(date.getDate() + nb);
        return next;
      }

      function isDateEqual(date1, date2){
        return date1.getTime() == date2.getTime();
      }

      function searchDateInArray(date, array){
        var results = [];
        for(let i = 0; i < array.length; i++){
            if(isDateEqual(date, new Date(array[i].date))){
                results.push(array[i]);
            }
        }
        return results;
      }


      function printCalendar(days, month){
        for(let i = 0; i < days.length; i++){
            const dt = new Date(days[i]);

            var main_month_container = document.getElementById("main-month-container");
            var div = document.createElement('div');


            if(dt.getMonth() != month){ //Si le jour concerne notre mois
                div.classList.add("relative", "bg-gray-50", "py-2", "px-3", "text-gray-500");
            }else{
                div.classList.add("relative", "bg-white", "py-2", "px-3");
            }


            var time = document.createElement("time");
            time.setAttribute("datetime",dt.toISOString().split('T')[0])
            time.innerHTML = dt.getDate();

            if(dt.getDate() == new Date().getDate()){ //Regarde si c'est la date du jour on rajoute une classe
                time.classList.add("flex","h-6" , "w-6" , "items-center" , "justify-center" , "rounded-full" , "bg-indigo-600" , "font-semibold", "text-white");
            }



            div.appendChild(time);

            const rdv = searchDateInArray(dt, mes_rdv.rdvs);
                        div.appendChild(time);
            if(rdv.length != 0){
                var ol = document.createElement("ol");
                ol.classList.add("mt-2");
                for(let j = 0; j < rdv.length; j++){
                    const li = document.createElement("li");
                    var a = document.createElement("a");
                    a.classList.add("groupe", "flex");
                    a.setAttribute("href", "#");
                    var p = document.createElement("p");
                    p.classList.add("flex-auto", "truncate", "font-medium", "text-gray-900", "group-hover:text-indigo-600");
                    p.innerHTML = rdv[j].nom;
                    var timeTemp = document.createElement("time");
                    timeTemp.classList.add("ml-3", "hidden", "flex-none", "text-gray-500", "group-hover:text-indigo-600", "xl:block");
                    timeTemp.setAttribute("datetime", rdv[j].heureDebut);
                    timeTemp.innerHTML = rdv[j].heureDebut.split(" ")[1].split(":")[0] + ":" + rdv[j].heureDebut.split(" ")[1].split(":")[1];
                    a.appendChild(p);
                    a.appendChild(timeTemp);
                    li.appendChild(a);
                    ol.appendChild(li);
                    div.appendChild(ol);
                }

            }




            main_month_container.appendChild(div);

        }
      }
