/**
 * Méthode vérifiant le format d'une date
 * @param date
 * Date à vérifier
 * @returns {boolean}
 */
function check_date(date) {
  return /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(date);
}

/**
 * Méthode vérifiant le format d'une couleur
 * @param couleur
 *  Couleur à vérifier
 * @returns {boolean}
 */
function check_color(couleur) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(couleur);
}

/**
 * Méthode vérifiant la validité d'un rendez-vous
 * @param date
 * Date du rendez-vous
 * @param heureDebut
 * Heure de début du rendez-vous
 * @param heureFin
 * Heure de fin du rendez-vous
 * @param couleur
 * Couleur du rendez-vous
 * @returns {boolean}
 */
function check_appointment(body) {
  // Vérifier le format de la date
  if (!check_date(body.date)) {
    return false;
  }

  // Vérifier le format de l'heure
  if (
    !/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/.test(
      body.heureDebut
    ) ||
    !/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/.test(
      body.heureFin
    )
  ) {
    return false;
  }

  // Vérifier que les trois dates soient le même jour
  if (body.heureDebut.substring(0, 10) !== body.heureFin.substring(0, 10) || body.heureDebut.substring(0, 10) !== body.date) {
    return false;
  }

  // Vérifier que l'heure de début soit avant l'heure de fin
  if (body.heureDebut.substring(11, 16) >= body.heureFin.substring(11, 16)) {
    console.log(body.heureDebut.substring(11, 16));
    return false;
  }

  // Vérifier le format de la couleur
  if (!check_color(body.couleur)) {
    return false;
  }

  return true;
}

module.exports = {
  check_date: check_date,
  check_color: check_color,
  check_appointment: check_appointment,
};
