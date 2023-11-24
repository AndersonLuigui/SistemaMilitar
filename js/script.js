const urlApi = 'http://localhost:3000'; // Substitua pela URL real da sua API

// Função para obter militares do banco de dados
const obterMilitaresDoBanco = async () => {
  try {
    const response = await fetch(`${urlApi}/obterMilitaresDoBanco`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter militares do banco de dados:', error);
    throw error;
  }
};

// Exemplo de uso da função no seu código
const militaresDoBanco = await obterMilitaresDoBanco();
console.log('Militares do banco:', militaresDoBanco);




const militares = [
  { id: 1, nome: 'Militar1', forca: 'Marinha' },
  { id: 2, nome: 'Militar2', forca: 'Exército' },
  { id: 3, nome: 'Militar3', forca: 'Aeronáutica' },
  // Adicione mais militares conforme necessário
];

const militaresSelecionadosSet = new Set(); // Usaremos um Set para garantir que não haja duplicatas

function consultarMilitares() {
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
}

function selecionarMilitar(nome) {
  if (!militaresSelecionadosSet.has(nome)) {
    militaresSelecionadosSet.add(nome);

    const militaresSelecionadosDisplay = document.getElementById('militaresSelecionados');
    const item = document.createElement('li');
    item.textContent = nome;
    item.addEventListener('click', () => deselecionarMilitar(nome));
    militaresSelecionadosDisplay.appendChild(item);
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
