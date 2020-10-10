module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = async (req, res) => {
        const quarto = { ...req.body }

        if (req.params.id) quarto.id = req.params.id
        try {
            
            existsOrError(quarto.numero, 'Nome não informado')
            existsOrError(quarto.descricao, 'Descrição não informada')
            existsOrError(quarto.nro_camas, 'Número de camas não informado')
            existsOrError(quarto.tipo, 'Tipo de quarto não informado')

        } catch (msg){
            return res.status(400).send(msg)
        }

        if(quarto.id) {
            app.db('quartos')
                .update(quarto)
                .where({id: quarto.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('quartos')
                .insert(quarto)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('clientes').count('id').first()
        const count = parseInt( result.count)
        
        app.db('quartos')
            .select('id', 'numero', 'descricao', 'tipo', 'imageUrl')
            .limit(limit).offset(page * limit - limit)
            .orderBy('numero')
            .groupBy('tipo')
            .then(quartos => res.json({ data: quartos, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('quartos')
            .select('id',  'numero', 'descricao','nro_camas', 'tipo', 'imageUrl', 'cama_extra', 'dt_limpeza', 'dt_manutencao')
            .where({id: req.params.id}).first()
            .then(quartos => res.json(quartos))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('quartos')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted,'Quarto não encontrado')
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    

    return { save, get, getById, remove }
}