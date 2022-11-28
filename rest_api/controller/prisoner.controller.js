const db = require('../db')

class PrisonerController {
    async getPrisoner(req, res){
        const id = req.params.id
        const prisoner = await db.query(`SELECT * FROM prisoner WHERE id=$1`, [id])
        res.json(prisoner.rows[0])
    }

    async getPrisoners(req, res){
        const prisoners = await db.query(`SELECT * FROM prisoner`)
        res.json(prisoners.rows)

    }

    async createPrisoner(req, res){
        const {name, surname, crime, stretch, chamber_id} = req.query
        const chamber = await db.query(`SELECT * FROM chamber WHERE id=$1`, [chamber_id])
        if (chamber.rows[0] != null) {
            const newPrisoner = await db.query(`INSERT INTO prisoner (name, surname, crime, stretch, chamber_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, surname, crime, stretch, chamber_id])
            res.json(newPrisoner.rows[0])    
        }
        else {
            res.json('Chamber with such id doesn\'t exist!')   
        }
        
    }

    async updatePrisoner(req, res){
        const id = req.params.id
        const {stretch, chamber_id} = req.query
        const chamber = await db.query(`SELECT * FROM chamber WHERE id=$1`, [chamber_id])
        
        if (chamber.rows[0] != null) {
            await db.query(`UPDATE prisoner SET chamber_id=$1 WHERE id = $2`, [chamber_id, id])
        }
        
        const prisoner = await db.query(`UPDATE prisoner SET stretch=$1 WHERE id = $2 RETURNING *`, [stretch, id])
        res.json(prisoner.rows[0])
    }

    async deletePrisoner(req, res){
        const id = req.params.id
        const prisoner = await db.query(`DELETE FROM prisoner WHERE id=$1`, [id])
        res.json(prisoner.rows[0])
    }

}

module.exports = new PrisonerController()