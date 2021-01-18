module.exports = app => {
  const { existsOrError, notExistsOrError } = app.api.helpers.validation

  const validate = async (room, key) => {
    try {
      existsOrError(room.room_number, 'Numero não informado')
      existsOrError(room.description, 'Descrição não informada')
      existsOrError(room.number_of_beds, 'Número de camas não informado')
      existsOrError(room.type_of_room, 'Tipo de quarto não informado')

      const roomFromDB = await app.db(key)
          .where('room_number', room.room_number ).first()
      if (!room.id) {
          notExistsOrError(roomFromDB, 'Número de quarto já cadastrado')
      }
    } catch (msg) {
      return msg
    }
  }

  return { validate }
}

