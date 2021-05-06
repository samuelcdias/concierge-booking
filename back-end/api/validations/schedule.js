module.exports = (app) => {
  const { existsOrError } = app.api.helpers.validation;

  const validate = (schedule) => {
    try {
      existsOrError(schedule.date_day, "Dia não informado");
      existsOrError(schedule.is_high_season, "Tipo de temporada não informada");
      existsOrError(schedule.room_id, "Quarto não informado");
    } catch (msg) {
      return msg;
    }
  };

  return { validate };
};
