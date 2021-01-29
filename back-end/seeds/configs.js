
exports.seed = function(knex) {
  const key = 'configs'
  return knex(key).del()
    .then(function () {
      const configs = {
        id: 999,
        useSNRHos: false,
        limitViewsPage: 10,
        expirationTimeInHours: 24,
        scheduleTimeInMonths: 18

      }
      console.log('Inserindo configs')
      return knex(key).insert(configs)
    })
}
