const db = require('../db')

class ChamberController {
    async getСhamber(req, res){
        const id = req.params.id
        const chamber = await db.query(`SELECT * FROM chamber WHERE id=$1`, [id])
        let data = chamber.rows[0]
        const prisoners_number = await db.query(`SELECT COUNT(*) FROM prisoner WHERE chamber_id=$1`, [id])
        data.prisoners_number = +prisoners_number.rows[0].count
        res.json(data)
    }

    async getPrisonersFromСhamber(req, res){
        const id = req.params.id
        const prisoners = await db.query(`SELECT * FROM prisoner WHERE chamber_id=$1`, [id])
        res.json(prisoners.rows)
    }

    async getСhambers(req, res){
        const chambers = await db.query(`SELECT * FROM chamber`)
        res.json(chambers.rows)
    }

    async creatСhamber(req, res){
        const {block, number} = req.query
        const chamber = await db.query(`SELECT * FROM chamber WHERE block=$1 and number=$2`, [block, number])
        if (chamber.rows[0] != null) {
            res.json('Chamber with such block and number already exist!')
        }
        else {
            const newChamber = await db.query(`INSERT INTO chamber (block, number) VALUES ($1, $2) RETURNING *`, [block, number])
            res.json(newChamber.rows[0])
        }
    }

    async updateСhamber(req, res){
        const id = req.params.id
        const prisoners_number = await db.query(`SELECT COUNT(*) FROM prisoner WHERE chamber_id=$1`, [id])

        if (+prisoners_number.rows[0].count) {
            res.json('Chamber cannot be updated!')
        } 
        else {
            const {block, number} = req.query
            const chamber = await db.query(`SELECT * FROM chamber WHERE block=$1 and number=$2`, [block, number])
            if (chamber.rows[0] != null) {
                res.json('Chamber with such block and number already exist!')
            }
            else {
                const chamber = await db.query(`UPDATE chamber SET block=$1, number=$2 WHERE id = $3 RETURNING *`, [block, number, id])
                res.json(chamber.rows[0])
            }
        }
    }
}

module.exports = new ChamberController()