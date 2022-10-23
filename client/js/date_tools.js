const mes_rdv = {
    "rdvs": [
        {
            id: 0,
            date: "2022-10-18",
            heureDebut: "2022-10-18 08:00:00",
            heureFin: "2022-10-18 09:00:00",
            nom: "Anniversaire de sam",
        },
        {
            id: 1,
            date: "2022-10-19",
            heureDebut: "2022-10-19 14:00:00",
            heureFin: "2022-10-20 18:00:00",
            nom: "Cours de math",
        },
        {
            id: 2,
            date: "2022-10-20",
            heureDebut: "2022-10-20 14:00:00",
            heureFin: "2022-10-20 15:00:00",
            nom: "Cours d'anglais",
        },
        {
            id: 3,
            date: "2022-10-22",
            heureDebut: "2022-10-22 15:00:00",
            heureFin: "2022-10-22 16:00:00",
            nom: "BACKEND",
        },
        {
            id: 4,
            date: "2022-10-20",
            heureDebut: "2022-10-20 15:00:00",
            heureFin: "2022-10-20 16:00:00",
            nom: "TEST",
        },


    ]
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


export function getPreviousDay(date, nb) {//renvoie le n jour précédent de date
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - nb);
    return previous;
}
export function getNextDay(date, nb) { //renvoie le N jour suivant de date
    const next = new Date(date.getTime());
    next.setDate(date.getDate() + nb);
    return next;
}

export function isDateEqual(date1, date2) { //Check si deux dates sont égales
    date2.setHours("00", "00", "00", "00");
    date1.setHours("00", "00", "00", "00");
    return date1.getTime() == date2.getTime();
}

export function searchDateInArray(date, array=mes_rdv.rdvs) { //Renvoie les rendez vous d'un jour
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
