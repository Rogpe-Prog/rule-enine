const express = require('express');
const mongoose = require('mongoose');
const ruleController = require('./controllers/ruleController');

const app = express();
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/rule-engine');
const db = mongoose.connection;

// Evento de erro de conexão
db.on('error', (error) => console.error('Erro na conexão com o MongoDB:', error));

// Evento de conexão aberta (bem-sucedida)
db.once('open', () => {
  console.log('Conectado ao MongoDB com sucesso');

  // Rotas
  app.post('/rules', ruleController.createRule);
  app.put('/rules/:id', ruleController.updateRule);
  app.post('/evaluate', ruleController.evaluateRules);

  // Inicializa o servidor
  app.listen(3000, () => console.log('Server running on port 3000'));
});
