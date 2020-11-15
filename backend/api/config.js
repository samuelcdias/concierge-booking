module.exports = app => {

    const get = async (req, res) => {
        app.db('configs')
        .select('useSNRHos')
        .where({id: 999}).first()
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
    }
  
    return { get }
}