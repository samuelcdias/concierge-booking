module.exports = app => {
  const { existsOrError } = app.api.helpers.validation

  const validate = (schedule) => {
    try {
      existsOrError(schedule.dataDia, 'Dia não informado')
      existsOrError(schedule.is_alta_temporada, 'Tipo de tempodara não informado')
      existsOrError(schedule.quartoId, 'Quarto não informado')
    } catch (msg) {
      return msg
    }
  }

  return { validate }
}

