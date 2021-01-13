module.exports = app => {
    const { existsOrError } = app.api.helpers.validation

    const save = async (req, res) => {
        const reserva = { ...req.body }

        if (req.params.id) reserva.id = req.params.id
        try {
            
            existsOrError(reserva.dt_entrada_reserva, 'Data de entrada não informada')
            existsOrError(reserva.dt_saida_reserva, 'Data de saída não informada')
            existsOrError(reserva.forma_pagamento, 'Forma de pagamento não informada')
            existsOrError(reserva.tarifa, 'Valor total não informado')

        } catch (msg){
            return res.status(400).send(msg)
        }

        if(reserva.id) {
            app.db('reservas')
                .update(reserva)
                .where({id: reserva.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('reservas')
                .insert(reserva)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('reservas').count('id').first()
        const count = parseInt( result.count)
        const result2 = await app.db('configs').select('limitViewsPage').where({id: 999}).first()
        const limit = result2 == undefined ? 10 : result2.limitViewsPage

        app.db('reservas')
            .select('id', 'codigo', 'dt_entrada_reserva', 'dt_saida_reserva', 'hora_entrada','hora_saida', 'obs', )
            .limit(limit).offset(page * limit - limit)
            .then(reservas => res.json({ data: reservas, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('reservas AS r')
            .innerJoin('hospedes AS h', 'r.id', 'h.id')
            .innerJoin('clientes AS c', 'h.id', 'c.id')
            .select('r.id', 'r.codigo', 'r.dt_entrada_reserva','r.dt_saida_reserva', 'r.tarifa','r.obs','c.nome', 'c.dt_nascimento')
            .where({id: req.params.id}).first()
            .then(reservas => res.json(reservas))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('reservas')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted,'Reserva não encontrada')
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const filterByDate = async (req, res) => {
        const result = await app.db('resultado').select('1.id').distinct()
            .from(['agendas', 'quartos'])
            .where(app.db.raw('"1".id = "0"."quartoId"'))
            .whereBetween("dataDia", [req.query.in, req.query.out])
            .whereNull('reservaId')

        const result2 = await app.db('resultado').select('1.id').distinct()
            .from(['agendas', 'quartos'])
            .where(app.db.raw('"1".id = "0"."quartoId"'))
            .whereBetween("dataDia", [req.query.in, req.query.out])
            .whereNotNull('reservaId')
        
        app.db('quartos').select('tipo', 'descricao', 'image_url').distinct()
            .whereIn('id', filtraResultados(arrayObj2array(result), arrayObj2array(result2)))
            .then(resultado => res.json(resultado))
            .catch(err => res.status(500).send(err))
    }

    function arrayObj2array(array) { 
        const res = []; 
                
        for(let i=0; i < array.length; i++) 
            res.push(array[i].id);
        return res
    }

    function filtraResultados(res1, res2) {
        for(let i=0; i < res2.length; i++) 
            res1.splice(res1.indexOf(res2[i],1));
        return res1
    }
    

    return { save, get, getById, filterByDate, remove }
}