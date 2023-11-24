
const express = require('express');
const app = express();
const api = require('./api');

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

const militaresSelecionadosSet = new Set(); // Usaremos um Set para garantir que não haja duplicatas

async function consultarMilitares() {
  try {
    const response = await fetch('http://localhost:3000/obterMilitaresDoBanco');
    const militares = await response.json();

    const forcaSelecionada = document.getElementById('forcaListBox').value;
    const nomesMilitares = militares
      .filter(militar => militar.forca === forcaSelecionada)
      .map(militar => militar.nome);

    const nomesMilitaresDisplay = document.getElementById('nomesMilitares');
    nomesMilitaresDisplay.innerHTML = '<h3>Nomes dos Militares</h3>';

    nomesMilitares.forEach((nome) => {
      const item = document.createElement('div');
      item.addEventListener('click', () => selecionarMilitar(nome));
      item.appendChild(document.createTextNode(nome));
      nomesMilitaresDisplay.appendChild(item);
    });
  } catch (error) {
    console.error('Erro ao obter militares do banco de dados:', error);
  }
}

function deselecionarMilitar(nome) {
  militaresSelecionadosSet.delete(nome);

  const militaresSelecionadosDisplay = document.getElementById('militaresSelecionados');
  const militaresSelecionados = militaresSelecionadosDisplay.querySelectorAll('li');

  militaresSelecionados.forEach((militar) => {
    if (militar.textContent === nome) {
      militaresSelecionadosDisplay.removeChild(militar);
    }
  });
}
