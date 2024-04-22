

// Função para adicionar a planta ao diário
function adicionarAoJardim(titulo, resumo, imagem) {
    // Criar um objeto para representar a planta
    const planta = {
        titulo: titulo,
        resumo: resumo,
        imagem: imagem
    };

    // Verificar se já existe uma lista de plantas no localStorage
    let listaPlantas = localStorage.getItem('listaPlantas');
    if (listaPlantas) {
        // Se existir, converter para array e adicionar a nova planta
        listaPlantas = JSON.parse(listaPlantas);
        listaPlantas.push(planta);
    } else {
        // Se não existir, criar uma nova lista com a planta
        listaPlantas = [planta];
    }

    // Salvar a lista de plantas no localStorage
    localStorage.setItem('listaPlantas', JSON.stringify(listaPlantas));

    // Redirecionar o usuário para a página do diário
    window.location.href = '../diario/Diario.html';
}

function buscarInformacoesPlanta(planta) {
    const nomeFormatado = planta.replace(/\s/g, '_');
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${nomeFormatado}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar informações sobre a planta');
            }
            return response.json();
        })
        .then(data => {
            // Verificar se o resultado contém informações relevantes sobre plantas
            if (!contemInformacoesSobrePlantas(data)) {
                throw new Error('Nenhuma informação relevante encontrada sobre a planta');
            }

            const titulo = data.title;
            const resumo = data.extract;
            const imagem = data.thumbnail ? data.thumbnail.source : '';

            // Exibir informações na página
            exibirResultado(titulo, resumo, imagem);

            // Adicionar botão para adicionar ao Meu Jardim
            const btnAdicionar = document.createElement('button');
            btnAdicionar.textContent = 'Adicionar ao Meu Jardim';
            btnAdicionar.addEventListener('click', () => adicionarAoJardim(titulo, resumo, imagem));
            document.getElementById('resultado').appendChild(btnAdicionar);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Não foi possível obter informações sobre a planta. Por favor, tente novamente mais tarde.');
        });
}

function contemInformacoesSobrePlantas(data) {
    // Verificar se o título ou o resumo contém palavras relacionadas a plantas
    const palavrasChave = ['planta', 'flor', 'árvore', 'folha', 'botânica', 'hortaliça', 'fruta', 'legume', 'erva', 'arbusto', 'cacto', 'grama', 'samambaia', 'musgo', 'fungo', 'jardim', 'jardineiro', 'verde', 'pétala', 'caule', 'semente', 'brotamento', 'poda', 'adubo', 'vaso', 'irrigação', ];
    const titulo = data.title.toLowerCase();
    const resumo = data.extract.toLowerCase();

    return palavrasChave.some(palavra => titulo.includes(palavra) || resumo.includes(palavra));
}


// Função para exibir o resultado da pesquisa na página
function exibirResultado(titulo, resumo, imagem) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    const plantaTitulo = document.createElement('h2');
    plantaTitulo.textContent = titulo;

    const plantaResumo = document.createElement('p');
    plantaResumo.textContent = resumo;

    const plantaImagem = document.createElement('img');
    plantaImagem.src = imagem;

    resultadoDiv.appendChild(plantaTitulo);
    resultadoDiv.appendChild(plantaImagem);
    resultadoDiv.appendChild(plantaResumo);
}

// Função para lidar com a pesquisa
function pesquisarPlanta() {
    const termoPesquisa = document.getElementById('pesquisa').value.trim();
    if (termoPesquisa === '') {
        alert('Por favor, digite o nome de uma planta para pesquisar.');
        return;
    }

    buscarInformacoesPlanta(termoPesquisa);
}

// Event listener para o botão de pesquisa
document.getElementById('btn-pesquisar').addEventListener('click', pesquisarPlanta);

// Permitir a pesquisa ao pressionar Enter na barra de pesquisa
document.getElementById('pesquisa').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        pesquisarPlanta();
    }
});

