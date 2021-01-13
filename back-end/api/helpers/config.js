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
        return result.useSNRHos || false
    }

    const getLimitViews = async () => {
        const result = await app.db(key).select('limitViewsPage').first()
        return result.limitViewsPage || 10
    }

    const getExpirationTime = async () => {
        const result = await app.db(key).select('expirationTimeInHours').first()
        return result.expirationTimeInHours || 24
    }

    const getScheduleTimeInMonths = async () => {
        const result = await app.db(key).select('scheduleTimeInMonths').first()
        return result.scheduleTimeInMonths || 18
    }

    return { get, getSNRHos, getLimitViews, getExpirationTime, getScheduleTimeInMonths }
}