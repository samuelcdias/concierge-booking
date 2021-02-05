module.exports = app => {
  const { existsOrError } = app.api.helpers.validation


  const validate = async (reservation, room_type, useSNRHos) => {
    try {
      existsOrError(reservation.dt_entrada_reserva, 'Data de entrada não informada')
      existsOrError(reservation.dt_saida_reserva, 'Data de saída não informada')
      existsOrError(reservation.forma_pagamento, 'Forma de pagamento não informada')
      existsOrError(reservation.tarifa, 'Valor total não informado')
      existsOrError(room_type, 'Tipo de quarto não informado')
      if(useSNRHos){
        existsOrError(reservation.motivo_viagem, 'Motivo de viagem não informado')
        existsOrError(reservation.meio_transporte, 'Meio de transporte não informado')
      }

      const roomFromDB = await app.db('rooms')
        .where('type_of_room', room_type ).first()

      existsOrError(roomFromDB, 'Quarto não encontrado')
    } catch (msg) {
      return msg
    }
  }

  return { validate }
}

