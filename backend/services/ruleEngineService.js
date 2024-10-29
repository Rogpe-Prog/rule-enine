const { Engine } = require('json-rules-engine');
const Rule = require('../models/Rule');

class RuleEngineService {
    constructor() {
        this.engine = new Engine();
    }

    async loadRules() {
        // Limpa regras existentes
        this.engine.removeAllRules();

        // Carrega regras ativas do banco de dados
        const rules = await Rule.find({ isActive: true, validFrom: { $lte: new Date() }, $or: [{ validTo: null }, { validTo: { $gte: new Date() } }] }).sort({ priority: -1 });
        
        rules.forEach(ruleData => {
            this.engine.addRule({
                conditions: ruleData.conditions,
                event: ruleData.event,
                priority: ruleData.priority
            });
        });
    }

    async evaluate(facts) {
        await this.loadRules(); // Carrega as regras antes de cada execução para refletir mudanças
        const events = await this.engine.run(facts);

        // Controle de desconto único ou múltiplo
        return events.length ? events[0] : null; // Retorna apenas a primeira regra de maior prioridade
    }
}

module.exports = new RuleEngineService();
