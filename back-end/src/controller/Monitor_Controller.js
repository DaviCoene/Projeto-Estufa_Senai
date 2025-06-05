const pool = require('../startup/db');

class Monitor_Controller{
    static async create(req, res) {
        const {Nome, Valor} = req.body;

        if (!Nome){
            return res.status(400).send({ message: "Dados inválidos" });
        }
        try {
            const [result] = await pool.execute(
                'INSERT INTO monitoramento_sensor(nome, valor) VALUES (?, ?)',
                [Nome, Valor]
            );

            return res.status(201).send({
                message: "Valor inserido com sucesso",
                body: { id: result.insertId, Nome, Valor}
            });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async getAllMonitors(req, res) {
        try {
            const [rows] = await pool.execute('SELECT * FROM monitoramento_sensor');
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).send({ message: "No id provided" });

        try {
            const [rows] = await pool.execute('SELECT * FROM monitoramento_sensor WHERE id = ?', [id]);
            if (rows.length === 0){
                return res.status(404).send({ message: "Valor não encontrado" });
            }
            return res.status(200).json(rows[0]);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }


    static async updateByName(req, res) {
        const { id } = req.params;
        const { Nome, Valor} = req.body;
        if (!id) return res.status(400).send({ message: "Atualização não concluida" });

        try {
            const [result] = await pool.execute(
                'UPDATE monitoramento_sensor SET valor = ? WHERE nome = ?',
                [Valor, Nome]
            );

            if (result.affectedRows === 0)
                return res.status(404).send({ message: "Valor não encontrada" });

            return res.status(200).send({ message: "Valor atualizado" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async deleteByName(req, res) {

        const { Nome } = req.body;

        try {
            const [result] = await pool.execute('DELETE FROM monitoramento_sensor WHERE nome = nome', [Nome]);

            if (result.affectedRows === 0){
                return res.status(404).send({ message: "Valor não encontrado" });
            }
            return res.status(200).send({ message: "Valor removido com sucesso" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}

module.exports = Monitor_Controller;
