const pool = require('../startup/db');

class Visu_Controller{
    static async create(req, res) {
        const {temp_inter, temp_ext, umid_inter, umid_ext, nível_água, luminosidade, porta, ventilação_rpm, auto} = req.body;

        if (!temp_inter){
            return res.status(400).send({ message: "Dados inválidos" });
        }
        try {
            const [result] = await pool.execute(
                'INSERT INTO Visualização(temp_inter, temp_ext, umid_inter, umid_ext, nível_água, luminosidade, porta, ventilação_rpm, auto, data_hora) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                [temp_inter, temp_ext, umid_inter, umid_ext, nível_água, luminosidade, porta, ventilação_rpm, auto]
            );

            return res.status(201).send({
                message: "Valor inserido com sucesso",
                body: { id: result.insertId, temp_inter, temp_ext, umid_inter, umid_ext, nível_água, luminosidade, porta, ventilação_rpm, auto}
            });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async getAllPeople(req, res) {
        try {
            const [rows] = await pool.execute('SELECT * FROM visualização');
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).send({ message: "No id provided" });

        try {
            const [rows] = await pool.execute('SELECT * FROM visualização WHERE id = ?', [id]);
            if (rows.length === 0)
                // return res.status(404).send({ message: "Valor não encontrado" });

            return res.status(200).json(rows[0]);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async latestData(req, res) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM visualização ORDER BY data_hora DESC LIMIT 1'
            );

            if (rows.length == 0) {
                return res.status(404).send({ message: "Nenhum dado encontrado" });
            }
            return res.status(200).json(rows[0]);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async updateById(req, res) {
        const { id } = req.params;
        const { temp_inter, temp_ext, umid_inter, umid_ext, nível_água, luminosidade, porta, ventilação_rpm, auto} = req.body;
        if (!temp_inter) return res.status(400).send({ message: "Atualização não concluida" });

        try {
            const [result] = await pool.execute(
                'UPDATE visualização SET temp_inter = ?, temp_ext = ?, umid_inter = ?, umid_ext = ?, nível_água = ?, luminosidade = ?, porta = ?, ventilação_rpm = ?, auto = ? WHERE id = ?',
                [temp_inter, temp_ext, umid_inter, umid_ext, nível_água, luminosidade, porta, ventilação_rpm, auto, id]
            );

            if (result.affectedRows === 0)
                return res.status(404).send({ message: "Valor não encontrada" });

            return res.status(200).send({ message: "Valor atualizado" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async deleteById(req, res) {
        const { id } = req.params;

        try {
            const [result] = await pool.execute('DELETE FROM visualização WHERE id = ?', [id]);

            if (result.affectedRows === 0)
                // return res.status(404).send({ message: "Valor não encontrado" });

            return res.status(200).send({ message: "Valor removido com sucesso" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}

module.exports = Visu_Controller;
