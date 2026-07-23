// Função para carregar dashboard
async function carregarDashboard() {
    try {
        const etiquetas = await EtiquetasAPI.listar();
        
        // Atualiza cards
        const abertas = etiquetas.filter(e => e.status !== 'Concluída');
        const vermelhas = etiquetas.filter(e => e.tipo === 'Vermelha' && e.status !== 'Concluída');
        const azuis = etiquetas.filter(e => e.tipo === 'Azul' && e.status !== 'Concluída');
        
        document.getElementById('total-abertas').textContent = abertas.length;
        document.getElementById('total-vermelhas').textContent = vermelhas.length;
        document.getElementById('total-azuis').textContent = azuis.length;
        
        // Atualiza tabela (últimas 5)
        const tabela = document.getElementById('tabela-etiquetas');
        tabela.innerHTML = '';
        
        const ultimas = etiquetas.slice(0, 5);
        ultimas.forEach(etiqueta => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${etiqueta.id}</td>
                <td>${etiqueta.titulo}</td>
                <td class="tipo-${etiqueta.tipo.toLowerCase()}">${etiqueta.tipo}</td>
                <td><span class="status-${etiqueta.status.toLowerCase().replace(' ', '-')}">${etiqueta.status}</span></td>
                <td>${new Date(etiqueta.data_abertura).toLocaleDateString()}</td>
            `;
            tr.style.cursor = 'pointer';
            tr.addEventListener('click', () => abrirDetalhesEtiqueta(etiqueta.id));
            tabela.appendChild(tr);
        });
        
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }
}

// Função para carregar página de etiquetas
async function carregarEtiquetas() {
    const content = document.getElementById('page-content');
    
    try {
        const etiquetas = await EtiquetasAPI.listar();
        
        let html = `
            <div class="table-container">
                <h3>Todas as Etiquetas</h3>
                <div class="filtros">
                    <select id="filtro-tipo">
                        <option value="">Todos os tipos</option>
                        <option value="Azul">Azul</option>
                        <option value="Vermelha">Vermelha</option>
                    </select>
                    <select id="filtro-status">
                        <option value="">Todos os status</option>
                        <option value="Aberta">Aberta</option>
                        <option value="Em Análise">Em Análise</option>
                        <option value="Em Execução">Em Execução</option>
                        <option value="Concluída">Concluída</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Linha</th>
                            <th>Responsável</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tabela-etiquetas-completa">
        `;
        
        etiquetas.forEach(e => {
            html += `
                <tr>
                    <td>#${e.id}</td>
                    <td>${e.titulo}</td>
                    <td>${e.descricao.substring(0, 50)}...</td>
                    <td class="tipo-${e.tipo.toLowerCase()}">${e.tipo}</td>
                    <td><span class="status-${e.status.toLowerCase().replace(' ', '-')}">${e.status}</span></td>
                    <td>${e.linha || '-'}</td>
                    <td>${e.responsavel || '-'}</td>
                    <td>${new Date(e.data_abertura).toLocaleDateString()}</td>
                    <td>
                        <button onclick="atualizarStatus(${e.id}, 'Em Análise')">Analisar</button>
                        <button onclick="atualizarStatus(${e.id}, 'Concluída')">Concluir</button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        content.innerHTML = html;
        
        // Adicionar filtros
        document.getElementById('filtro-tipo').addEventListener('change', filtrarEtiquetas);
        document.getElementById('filtro-status').addEventListener('change', filtrarEtiquetas);
        
    } catch (error) {
        content.innerHTML = `<p>Erro ao carregar etiquetas: ${error.message}</p>`;
    }
}

// Função para atualizar status
async function atualizarStatus(id, novoStatus) {
    if (confirm(`Deseja alterar o status para "${novoStatus}"?`)) {
        try {
            await EtiquetasAPI.atualizar(id, { status: novoStatus });
            loadEtiquetas(); // Recarrega
        } catch (error) {
            alert('Erro ao atualizar: ' + error.message);
        }
    }
}

// Função para filtrar etiquetas
function filtrarEtiquetas() {
    const tipo = document.getElementById('filtro-tipo').value;
    const status = document.getElementById('filtro-status').value;
    
    const linhas = document.querySelectorAll('#tabela-etiquetas-completa tr');
    linhas.forEach(linha => {
        const tipoCelula = linha.querySelector('.tipo-azul, .tipo-vermelha');
        const statusCelula = linha.querySelector('.status-aberta, .status-em-análise, .status-em-execução, .status-concluida');
        
        let mostrar = true;
        if (tipo && tipoCelula && !tipoCelula.textContent.includes(tipo)) mostrar = false;
        if (status && statusCelula && !statusCelula.textContent.includes(status)) mostrar = false;
        
        linha.style.display = mostrar ? '' : 'none';
    });
}

// Função para abrir detalhes (será implementada)
function abrirDetalhesEtiqueta(id) {
    alert(`Detalhes da etiqueta #${id} em desenvolvimento`);
}