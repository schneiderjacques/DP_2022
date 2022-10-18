
//Créer une fonction qui à un jour donné renvoie le calendrier d'une journée.
const hours = [8,9,10,11,12,13,14,15,16,17,18];
const quart = ["00","15","30","45"];
const mes_rdv = {
    "rdvs":[   
        {
            id:0,
            heureDebut: "18-01",
            heureFin: 1666100700,
            date: '18-10-2022'
        },
        {
            id:1,
            heureDebut: 1666105200,
            heureFin: 1666107900,
            date: '19-10-2022'
        }

]
}

createCalendarForADay(mes_rdv.rdvs);


function createCalendarForADay(rdvs){
    var currentHour;
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.colSpan = 2;
    th.innerHTML = "Mercredi 18/10";
    tr.classList.add("tr-head");
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for(let i = 0 ; i < hours.length ; i++){
        currentHour = hours[i] + ":" + quart[0] //Représente l'heure en cours : 8:00 ; 9:00...
        createTdOfHours(currentHour, tbody)

        for(let j = 0 ; j < quart.length; j++){
            let tempTr = document.createElement("tr");
            tempTr.appendChild(document.createElement("td"));
            tbody.appendChild(tempTr);


            for(let z = 0 ; z < rdvs.length ; z++){
                console.log(new Date(rdvs[z].heureDebut));
                console.log(new Date(rdvs[z].heureFin));
            }


        }
    }



    document.getElementById('main-container').appendChild(table)
}

function createTdOfHours(currentHour, tbody){ //créer un td de rowspan 4 montrant les heures et l'ajoute au tbody

    let tempTr = document.createElement("tr");
    let tempTdHours = document.createElement("td");
    tempTdHours.classList.add("hours");
    tempTdHours.rowSpan=4;
    tempTdHours.innerHTML = currentHour;
    tempTr.appendChild(tempTdHours)
    tbody.appendChild(tempTr)
}
