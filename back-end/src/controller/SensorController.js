const pool = require('../startup/db');

class SensorController {
    static async create(req, res) {
        const { sensor, temperatura, umidade } = req.body;
        if (!sensor)
            return res.status(400).send({ message: "Dados inválidos" });

        try {
            const [result] = await pool.execute(
                'INSERT INTO SensorTemperatura (sensor, hora, temperatura, umidade) VALUES (?, NOW(), ?, ?)',
                [sensor,temperatura, umidade]
            );

            return res.status(201).send({
                message: "Valor inserido com sucesso",
                body: { id: result.insertId, sensor, temperatura, umidade }
            });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async getAllPeople(req, res) {
        try {
            const [rows] = await pool.execute('SELECT * FROM SensorTemperatura');
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).send({ message: "No id provided" });

        try {
            const [rows] = await pool.execute('SELECT * FROM SensorTemperatura WHERE id = ?', [id]);
            if (rows.length === 0)
                return res.status(404).send({ message: "Pessoa não encontrada" });

            return res.status(200).json(rows[0]);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async updateById(req, res) {
        const { id } = req.params;
        const { temperatura, umidade } = req.body;
        if (!temperatura, !umidade) return res.status(400).send({ message: "Atualização não concluida" });

        try {
            const [result] = await pool.execute(
                'UPDATE SensorTemperatura SET temperatura = , umidade = ? WHERE id = ?',
                [temperatura, umidade, id]
            );

            if (result.affectedRows === 0)
                return res.status(404).send({ message: "Pessoa não encontrada" });

            return res.status(200).send({ message: "Salário atualizado" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async deleteById(req, res) {
        const { id } = req.params;

        try {
            const [result] = await pool.execute('DELETE FROM SensorTemperatura WHERE id = ?', [id]);

            if (result.affectedRows === 0)
                return res.status(404).send({ message: "Sensor não encontrado" });

            return res.status(200).send({ message: "Sensor removido com sucesso" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}

module.exports = SensorController;
