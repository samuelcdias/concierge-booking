module.exports = app => {
  const { existsOrError, notExistsOrError } = app.api.helpers.validation

  const validate = async (room, key) => {
    try {
      existsOrError(room.number, 'Numero não informado')
      existsOrError(room.description, 'Descrição não informada')
      existsOrError(room.number_of_beds, 'Número de camas não informado')
      existsOrError(room.type_of_room, 'Tipo de quarto não informado')

      const roomFromDB = await app.db(key)
          .where('number', room.number ).first()

      if (!room.id) {
          notExistsOrError(roomFromDB, 'Número de quarto já cadastrado')
      }
    } catch (msg) {
      return msg
    }
  }

  return { validate }
}

