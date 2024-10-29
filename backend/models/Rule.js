const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    conditions: { type: Object, required: true }, // Estrutura da condição em JSON
    event: { type: Object, required: true },      // Resultado ou ação em caso de 'match'
    priority: { type: Number, default: 1 },       // Prioridade das regras
    isActive: { type: Boolean, default: true },   // Controle se a regra está ativa
    validFrom: { type: Date, default: Date.now }, // Data de início de vigência
    validTo: { type: Date },                      // Data de término de vigência
});

module.exports = mongoose.model('Rule', ruleSchema);
