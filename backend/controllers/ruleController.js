const Rule = require('../models/Rule');
const ruleEngineService = require('../services/ruleEngineService');

// Cria uma nova regra
exports.createRule = async (req, res) => {
    try {
        const rule = new Rule(req.body);
        await rule.save();
        res.status(201).send(rule);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Atualiza uma regra existente
exports.updateRule = async (req, res) => {
    try {
        const rule = await Rule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rule) return res.status(404).send();
        res.send(rule);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Avalia fatos
exports.evaluateRules = async (req, res) => {
    try {
        const result = await ruleEngineService.evaluate(req.body.facts);
        res.send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
