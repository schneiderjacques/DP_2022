document.getElementById("main-title-month").innerHTML =
  getMonthName(current_date.getMonth()) + " " + current_date.getFullYear(); //Fonction qui affiche le mois en cours
//printCalendarByMonthResponsive(getAllDaysFromMonth(currentMonth, currentYear), currentMonth); //Met à jour le calendrier en responsive

document.getElementById("btn-month-name").innerHTML = getMonthName(
  current_date.getMonth()
); //Bouton pour afficher le mois suivant

document
  .getElementById("btn-next-month")
  .addEventListener("click", function () {
    setNextMonth();
    refreshAllCalendars();
  });

document
  .getElementById("btn-previous-month")
  .addEventListener("click", function () {
    setPreviousMonth();
    refreshAllCalendars();
  });

function refreshCalendarMonth(month, year) {
  document.getElementById("main-month-container").innerHTML = ""; //on efface tout dans le calendrier
  document.getElementById("main_month_container_responsive").innerHTML = ""; //on efface tout dans le calendrier responsive
  document.getElementById("btn-month-name").innerHTML = getMonthName(month); //On met a jour le nom du mois
  printCalendarByMonth(getAllDaysFromMonth(month, year), month); //On met a jour le calendrier
  document.getElementById("main-title-month").innerHTML =
    getMonthName(month) + " " + year; //On met à jour le titre (Novembre 2022)
  printCalendarByMonthResponsive(getAllDaysFromMonth(month, year), month); //On met a jour le calendrier responsive
}

function getMonthName(month) {
  //Renvoie le nom du mois en cours
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
  return months[month];
}

function getNextMonth(month) {
  if (month == 11) {
    return 0;
  }
  return month + 1;
}
function getPreviousMonth(month) {
  if (month == 0) {
    return 11;
  }
  return month - 1;
}

function printCalendarByMonth(days, month) {
  //Affiche le calendrier
  fetchDataGet(
    "month_planning/" +
      (current_date.getMonth() + 1) +
      "/" +
      current_date.getFullYear()
  ).then((response) => {
    const rdv = response;
    for (let i = 0; i < days.length; i++) {
      const dt = new Date(days[i]);
      var main_month_container = document.getElementById(
        "main-month-container"
      );
      let div = document.createElement("div");
      if (
        dt.getMonth() != month ||
        dt.getFullYear() != current_date.getFullYear()
      ) {
        //Si le jour ne concerne pas notre mois
        div.classList.add(
          "relative",
          "bg-gray-50",
          "py-2",
          "px-3",
          "text-gray-500"
        );
      } else {
        div.classList.add("relative", "bg-white", "py-2", "px-3");
      }

      var time = document.createElement("time");
      time.setAttribute("datetime", dt.toISOString().split("T")[0]);
      time.innerHTML = dt.getDate();

      if (
        dt.getDate() == new Date().getDate() &&
        dt.getMonth() == new Date().getMonth() &&
        dt.getFullYear() == new Date().getFullYear()
      ) {
        //Regarde si c'est la date du jour on rajoute une classe
        time.classList.add(
          "flex",
          "h-6",
          "w-6",
          "items-center",
          "justify-center",
          "rounded-full",
          "bg-indigo-600",
          "font-semibold",
          "text-white"
        );
      }

      div.appendChild(time);
      const rdvFiltered = rdv.filter((rdv) => {
        if(rdv.date === dt.toISOString().split("T")[0]){
          console.log(rdv.date);
          console.log(dt);
        }
        return rdv.date === dt.toISOString().split("T")[0];
      });

      if (rdvFiltered.length != 0) {
        
        var ol = document.createElement("ol");
        ol.classList.add("mt-2");
        for (let j = 0; j < rdvFiltered.length; j++) {
          const li = document.createElement("li");
          var a = document.createElement("a");
          a.classList.add("groupe", "flex");
          a.setAttribute("href", "#");
          var p = document.createElement("p");
          p.classList.add(
            "flex-auto",
            "truncate",
            "font-medium",
            "text-gray-900",
            "group-hover:text-indigo-600"
          );
          p.innerHTML = rdvFiltered[j].nom;
          var timeTemp = document.createElement("time");
          timeTemp.classList.add(
            "ml-3",
            "hidden",
            "flex-none",
            "text-gray-500",
            "group-hover:text-indigo-600",
            "xl:block"
          );
          timeTemp.setAttribute("datetime", rdvFiltered[j].heureDebut);
          timeTemp.innerHTML =
            rdvFiltered[j].heureDebut.split(" ")[1].split(":")[0] +
            ":" +
            rdvFiltered[j].heureDebut.split(" ")[1].split(":")[1];
          a.appendChild(p);
          a.appendChild(timeTemp);
          li.appendChild(a);
          ol.appendChild(li);
          div.appendChild(ol);
        }
      }

      main_month_container.appendChild(div);
    }
  });
}
function printCalendarByMonthResponsive(days, month) {
  //affiche le calendrier responsive
  let main_month_container_responsive = document.getElementById(
    "main_month_container_responsive"
  );
  for (let i = 0; i < days.length; i++) {
    const dt = new Date(days[i]);
    var button = document.createElement("button");
    button.classList.add(
      "flex",
      "h-14",
      "flex-col",
      "py-2",
      "px-3",
      "hover:bg-gray-100",
      "focus:z-10"
    );

    dt.getMonth() == month
      ? button.classList.add("bg-white")
      : button.classList.add("bg-gray-50");

    var time = document.createElement("time");
    time.setAttribute("datetime", dt.toISOString().split("T")[0]);
    time.innerHTML = dt.getDate();
    time.classList.add("ml-auto");

    if (
      dt.getDate() == new Date().getDate() &&
      dt.getMonth() == new Date().getMonth()
    ) {
      //Regarde si c'est la date du jour on rajoute une classe
      button.classList.add("text-indigo-600");
    } else {
      button.classList.add("text-gray-500");
    }

    var span = document.createElement("span");
    const rdv = searchDateInArray(dt, []);
    span.classList.add("sr-only");
    span.innerHTML = "Rdv : " + rdv.length;

    button.appendChild(time);
    button.appendChild(span);

    var span2 = document.createElement("span");
    span2.classList.add("-mx-0.5", "mt-auto", "flex", "flex-wrap-reverse");
    if (rdv.length != 0) {
      for (let j = 0; j < rdv.length; j++) {
        var span3 = document.createElement("span");
        span3.classList.add(
          "mx-0.5",
          "mb-1",
          "h-1.5",
          "w-1.5",
          "rounded-full",
          "bg-gray-400"
        );
        span2.appendChild(span3);
      }
    }
    button.appendChild(span2);
    main_month_container_responsive.appendChild(button);
  }
}
