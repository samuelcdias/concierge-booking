module.exports = app => {
  const changeRoom = (data) => {
    const room_data = Object.assign({}, data)
    const period = {up:{}}
    period.up.date_day = new Date().toISOString().split('T')[0]
    period.up.room_id = room_data.id

    switch (data.settings) {
      case 'available':
        period.status = 'Disponível'
        break;
      case 'unavailable':
        period.status = 'Indisponível'
        break;
      case 'cleaning':
        room_data.dt_last_cleaning = new Date().toISOString()
        period.status = 'Limpando' 
        break;
      case 'maintenance':
        room_data.dt_last_maintenance = new Date().toISOString()
        period.status = 'Em Manutenção' 
        break;
      default:
        break;
    }
    delete room_data.settings
    return {room_data, period}
  }

  return { changeRoom }
}