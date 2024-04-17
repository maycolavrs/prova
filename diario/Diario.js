// Função para remover uma planta do diário
function removerDoJardim(titulo) {
    let listaPlantas = JSON.parse(localStorage.getItem('listaPlantas'));
    if (listaPlantas) {
        // Filtrar a lista de plantas para remover a planta com o título correspondente
        listaPlantas = listaPlantas.filter(planta => planta.titulo !== titulo);
        // Atualizar a lista de plantas no localStorage
        localStorage.setItem('listaPlantas', JSON.stringify(listaPlantas));
        // Atualizar a exibição no diário
        exibirPlantasNoDiario();
    }
}

// Função para exibir as plantas no diário
function exibirPlantasNoDiario() {
    const listaPlantasDiv = document.getElementById('listaPlantas');
    listaPlantasDiv.innerHTML = '';

    const listaPlantas = JSON.parse(localStorage.getItem('listaPlantas'));
    if (listaPlantas && listaPlantas.length > 0) {
        listaPlantas.forEach(planta => {
            const plantaDiv = document.createElement('div');
            plantaDiv.innerHTML = `
                <h2>${planta.titulo}</h2>
                <img src="${planta.imagem}" alt="${planta.titulo}">
                <p>${planta.resumo}</p>
                <button onclick="removerDoJardim('${planta.titulo}')">Remover</button>
            `;
            listaPlantasDiv.appendChild(plantaDiv);
        });
    } else {
        listaPlantasDiv.innerHTML = '<p>Nenhuma planta foi adicionada ao diário ainda.</p>';
    }
}

