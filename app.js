const express = require('express');
const app = express();
const api = require('./js/api');

app.get('/obterMilitaresDoBanco', async (req, res) => {
 try {
   const militaresDoBanco = await api.obterMilitaresDoBanco();
   res.json(militaresDoBanco);
 } catch (error) {
   console.error('Erro ao obter militares do banco de dados:', error);
   res.status(500).json({ error: 'Erro interno do servidor' });
 }
});

// Outras rotas e configurações do seu servidor

const porta = 3000;
app.listen(porta, () => {
 console.log(`Servidor rodando em http://localhost:${porta}`);
});
