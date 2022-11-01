refreshAllCalendars();

function refreshAllCalendars() { //refresh tout les calendriers
  refreshCalendarDay(current_date);
  refreshCalendarWeek(current_date);
  refreshCalendarMonth(current_date.getMonth(), current_date.getFullYear());
}
function increment(hours, minutes, input) {
  //Permet l'incrémentation dans le modal
  if (minutes === 50) {
    minutes = 0;
    hours++;
  } else {
    minutes += 10;
  }
  if (hours === 24) {
    hours = 0;
  }
  input.value = formatNumber(hours) + ":" + formatNumber(minutes);
}
function decrement(hours, minutes, input) {
  //Permet la décrémentation dans le modal
  if (minutes === 0) {
    minutes = 50;
    hours--;
  } else {
    minutes -= 10;
  }
  if (hours === -1) {
    hours = 23;
  }

  input.value = formatNumber(hours) + ":" + formatNumber(minutes);
}
document.getElementById("confirm_button").addEventListener("click", createRdv);
function createRdv() {
  let day = document.getElementById("date-picker").value.trim();
  let debutRdv = document.getElementById("input-first").value.trim();
  let finRdv = document.getElementById("input-second").value.trim();
  let desc = document.getElementById("textarea").value.trim();
  const color = colors[selectedColor];

  let alert = document.getElementById("alert-3");

  if (
    day.length === 0 ||
    /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/.test(day)
  ) {
    console.log("erreur");
    alert.children[2].innerHTML = "Veuillez entrer une date valide";
    showAlert(true);
    return;
  }
  if (
    debutRdv.length === 0 ||
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(debutRdv[0])
  ) {
    alert.children[2].innerHTML = "Veuillez entrer une heure de début valide";
    showAlert(true);
    return;
  }
  if (
    finRdv.length === 0 ||
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(finRdv[0])
  ) {
    alert.children[2].innerHTML = "Veuillez entrer une heure de fin valide";
    showAlert(true);
    return;
  }
  debutRdv = day + " " + debutRdv + ":00";
  finRdv = day + " " + finRdv + ":00";
  if (new Date(debutRdv) >= new Date(finRdv)) {
    alert.children[2].innerHTML =
      "Votre rendez-vous termine avant qu'il ne commence";
    showAlert(true);
    return;
  }
  if (desc.length === 0) {
    alert.children[2].innerHTML = "Veuillez entrer une description";
    showAlert(true);
    return;
  }
  const data = {
    date: day,
    heureDebut: day + " " + debutRdv + ":00",
    heureFin: day + " " + finRdv + ":00",
    nom: desc,
    couleur: color,
  };

  fetchDataConnected(JSON.stringify(data), "POST", "add_appointment").then(
    (response) => {
      if (response.status === 409) {
        alert.children[2].innerHTML =
          "Il y a déjà un rendez-vous à cette heure";
        showAlert(true);
        return;
      }
      if (response.status === 200) {
        refreshAllCalendars();
        setDataOfModal({
          date: "",
          heureDebut: "00:00",
          heureFin: "00:00",
          nom: "",
          couleur: 0,
        });
        document.getElementById("modal").classList.add("hidden");
        document.getElementById("modal").classList.remove("flex");
      }
    }
  );
}

function setDataOfModal(rdv) {
  //Permet de remplir le modal avec les données du rdv
  document.getElementById("date-picker").value = rdv.date;
  document.getElementById("input-first").value = rdv.heureDebut;
  document.getElementById("input-second").value = rdv.heureFin;
  document.getElementById("textarea").value = rdv.nom;
  changeColorSelection(rdv.couleur);
}

function showAlert(state) {
  //Affiche l'alerte dans le modal d'ajout de rdv
  let alert = document.getElementById("alert-3");

  if (state) alert.style.display = "flex";
  else alert.style.display = "none";
}

const colors = [
  "#B91C1C",
  "#FFA500",
  "#FFFF00",
  "#008000",
  "#1D4ED8",
  "#4B0082",
  "#EE82EE",
];
let selectedColor = 0;
initColors();

function initColors() {
  let div = document.getElementById("colors");
  for (let i = 0; i < colors.length; i++) {
    const label = document.createElement("label");
    label.classList.add(
      "ml-2",
      "relative",
      "p-0.5",
      "rounded-full",
      "flex",
      "items-center",
      "justify-center",
      "cursor-pointer",
      "focus:outline-none"
    );
    if (i == selectedColor) {
      label.classList.add("ring", "ring-offset-1", "ring-2");
    }
    label.style.backgroundColor = colors[i];
    const input = document.createElement("input");
    input.classList.add("sr-only");
    input.type = "radio";
    input.name = "color-choice";
    input.value = i;
    input.onclick = function () {
      changeColorSelection(this.value);
    };
    const span = document.createElement("span");
    span.classList.add(
      "h-8",
      "w-8",
      "bg-" + colors[i],
      "border",
      "border-black",
      "border-opacity-10",
      "rounded-full"
    );
    label.appendChild(input);
    label.appendChild(span);
    div.appendChild(label);
  }
}
function changeColorSelection(index) {
  let div = document.getElementById("colors");
  for (let i = 0; i < div.children.length; i++) {
    if (i == index) {
      div.children[i].classList.add("ring", "ring-offset-1", "ring-2");
      selectedColor = index;
    } else {
      div.children[i].classList.remove("ring", "ring-offset-1", "ring-2");
    }
  }
}
function splitValues(input, isIncrementing) {
  //Permet de séparer les heures et les minutes dans le modal
  let values = input.value.split(":");
  let hours = parseInt(values[0], 10);
  let minutes = parseInt(values[1], 10);
  if (isIncrementing) {
    increment(hours, minutes, input);
  } else {
    decrement(hours, minutes, input);
  }
}
document
  .getElementById("increment-first")
  .addEventListener("click", function () {
    splitValues(document.getElementById("input-first"), true);
  });
document
  .getElementById("decrement-first")
  .addEventListener("click", function () {
    splitValues(document.getElementById("input-first"), false);
  });
document
  .getElementById("increment-second")
  .addEventListener("click", function () {
    splitValues(document.getElementById("input-second"), true);
  });
document
  .getElementById("decrement-second")
  .addEventListener("click", function () {
    splitValues(document.getElementById("input-second"), false);
  });
