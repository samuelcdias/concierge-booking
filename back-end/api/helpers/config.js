module.exports = app => {
    const key = 'configs'

    const get = async (req, res) => {
        app.db(key)
        .select('useSNRHos')
        .first()
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
    }

    const getSNRHos  = async () => {
        const result = await app.db(key).select('useSNRHos').first()
        return result === undefined ? false : result.useSNRHos
    }

    const getLimitViews = async () => {
        const result = await app.db(key).select('limitViewsPage').first()
        return result === undefined ? 10 : result.limitViewsPage 
    }

    const getExpirationTime = async () => {
        const result = await app.db(key).select('expirationTimeInHours').first()
        return result === undefined ? 24 : result.expirationTimeInHours
    }

    const getScheduleTimeInMonths = async () => {
        const result = await app.db(key).select('scheduleTimeInMonths').first()
        return result == undefined? 18 : result.scheduleTimeInMonths || 18
    }

    return { get, getSNRHos, getLimitViews, getExpirationTime, getScheduleTimeInMonths }
}