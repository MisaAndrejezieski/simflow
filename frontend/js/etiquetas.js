// ================================================================
// ETIQUETAS.JS - MÓDULO DE ETIQUETAS
// ================================================================

// DADOS EM MEMÓRIA
let etiquetasData = [];
let etiquetaIdCounter = 1;

console.log('🏷️ Módulo Etiquetas carregado!');

// ================================================================
// CARREGAR DASHBOARD
// ================================================================

function carregarDashboardReal() {
    console.log('📊 carregarDashboardReal chamado');
    const content = document.getElementById('page-content');
    
    const abertas = etiquetasData.filter(e => e.status !== 'Concluída');
    const vermelhas = etiquetasData.filter(e => e.tipo === 'Vermelha' && e.status !== 'Concluída');
    const azuis = etiquetasData.filter(e => e.tipo === 'Azul' && e.status !== 'Concluída');
    const total = etiquetasData.length;
    
    // Atualizar badge
    const badge = document.getElementById('badge-etiquetas');
    if (badge) badge.textContent = abertas.length;
    
    let html = `
        <div class="dashboard-cards">
            <div class="card card-purple">
                <div class="card-icon">📋</div>
                <div class="card-label">Total de Etiquetas</div>
                <div class="card-value">${total}</div>
            </div>
            <div class="card card-yellow">
                <div class="card-icon">⏳</div>
                <div class="card-label">Em Aberto</div>
                <div class="card-value">${abertas.length}</div>
            </div>
            <div class="card card-red">
                <div class="card-icon">🔴</div>
                <div class="card-label">Vermelhas</div>
                <div class="card-value">${vermelhas.length}</div>
            </div>
            <div class="card card-blue">
                <div class="card-icon">🔵</div>
                <div class="card-label">Azuis</div>
                <div class="card-value">${azuis.length}</div>
            </div>
        </div>
        
        <div class="table-container">
            <div class="table-header">
                <h3>📋 Últimas Etiquetas</h3>
            </div>
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    const ultimas = [...etiquetasData].reverse().slice(0, 5);
    
    if (ultimas.length === 0) {
        html += `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                    Nenhuma etiqueta cadastrada. Clique em "+ Novo" para criar!
                </td>
            </tr>
        `;
    } else {
        ultimas.forEach(e => {
            const tipoClass = e.tipo === 'Azul' ? 'badge-azul' : 'badge-vermelha';
            const statusClass = e.status === 'Concluída' ? 'status-concluida' : 'status-aberta';
            
            html += `
                <tr>
                    <td>#${e.id}</td>
                    <td>${e.titulo}</td>
                    <td><span class="badge ${tipoClass}">${e.tipo}</span></td>
                    <td><span class="${statusClass}">${e.status}</span></td>
                    <td>${e.data_abertura}</td>
                </tr>
            `;
        });
    }
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    content.innerHTML = html;
    console.log('✅ Dashboard atualizado com', total, 'etiquetas');
}

// ================================================================
// CARREGAR LISTA DE ETIQUETAS
// ================================================================

function carregarListaEtiquetas() {
    console.log('🏷️ carregarListaEtiquetas chamado');
    const content = document.getElementById('page-content');
    
    let html = `
        <div class="table-container">
            <div class="table-header">
                <h3>🏷️ Todas as Etiquetas</h3>
                <div class="table-filters">
                    <select id="filtro-tipo" onchange="filtrarEtiquetas()">
                        <option value="">Todos os tipos</option>
                        <option value="Azul">🔵 Azul</option>
                        <option value="Vermelha">🔴 Vermelha</option>
                    </select>
                    <select id="filtro-status" onchange="filtrarEtiquetas()">
                        <option value="">Todos os status</option>
                        <option value="Aberta">⏳ Aberta</option>
                        <option value="Em Análise">🔍 Em Análise</option>
                        <option value="Em Execução">⚡ Em Execução</option>
                        <option value="Concluída">✅ Concluída</option>
                    </select>
                </div>
            </div>
            <div class="table-wrapper">
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tabela-etiquetas-body">
    `;
    
    if (etiquetasData.length === 0) {
        html += `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">
                    Nenhuma etiqueta cadastrada. Clique em "+ Novo" para criar!
                </td>
            </tr>
        `;
    } else {
        etiquetasData.forEach(e => {
            const tipoClass = e.tipo === 'Azul' ? 'badge-azul' : 'badge-vermelha';
            const statusClass = e.status === 'Concluída' ? 'status-concluida' : 'status-aberta';
            
            html += `
                <tr data-tipo="${e.tipo}" data-status="${e.status}">
                    <td>#${e.id}</td>
                    <td><strong>${e.titulo}</strong></td>
                    <td>${e.descricao.substring(0, 50)}${e.descricao.length > 50 ? '...' : ''}</td>
                    <td><span class="badge ${tipoClass}">${e.tipo}</span></td>
                    <td><span class="${statusClass}">${e.status}</span></td>
                    <td>${e.linha || '-'}</td>
                    <td>${e.responsavel || '-'}</td>
                    <td>
                        <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                            ${e.status !== 'Concluída' ? `
                                <button class="btn btn-sm btn-primary" onclick="window.atualizarStatusEtiqueta(${e.id}, 'Em Análise')">Analisar</button>
                                <button class="btn btn-sm btn-success" onclick="window.atualizarStatusEtiqueta(${e.id}, 'Concluída')">Concluir</button>
                            ` : ''}
                            <button class="btn btn-sm btn-danger" onclick="window.deletarEtiqueta(${e.id})">🗑️</button>
                        </div>
                    </td>
                </tr>
            `;
        });
    }
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    content.innerHTML = html;
    console.log('✅ Lista de etiquetas atualizada com', etiquetasData.length, 'itens');
}

// ================================================================
// ABRIR MODAL ETIQUETA
// ================================================================

function abrirModalEtiquetaReal(dados = null) {
    console.log('📝 abrirModalEtiquetaReal chamado', dados);
    const modal = document.getElementById('modal-etiqueta');
    const form = document.getElementById('form-etiqueta');
    
    if (!modal || !form) {
        console.error('❌ Modal ou formulário não encontrado');
        return;
    }
    
    form.reset();
    document.getElementById('etiqueta-id').value = '';
    
    if (dados) {
        document.getElementById('etiqueta-id').value = dados.id;
        document.getElementById('etiqueta-titulo').value = dados.titulo || '';
        document.getElementById('etiqueta-descricao').value = dados.descricao || '';
        document.getElementById('etiqueta-tipo').value = dados.tipo || '';
        document.getElementById('etiqueta-linha').value = dados.linha || '';
        document.getElementById('etiqueta-responsavel').value = dados.responsavel || '';
        document.getElementById('etiqueta-via').value = dados.via || '';
        document.getElementById('etiqueta-observacoes').value = dados.observacoes || '';
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    console.log('✅ Modal Etiqueta aberto');
}

// ================================================================
// SALVAR ETIQUETA
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-etiqueta');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulário de etiqueta submetido');
            
            const id = document.getElementById('etiqueta-id').value;
            const hoje = new Date().toLocaleDateString('pt-BR');
            
            const dados = {
                titulo: document.getElementById('etiqueta-titulo').value,
                descricao: document.getElementById('etiqueta-descricao').value,
                tipo: document.getElementById('etiqueta-tipo').value,
                linha: document.getElementById('etiqueta-linha').value,
                responsavel: document.getElementById('etiqueta-responsavel').value,
                via: document.getElementById('etiqueta-via').value,
                observacoes: document.getElementById('etiqueta-observacoes').value
            };
            
            console.log('📝 Dados da etiqueta:', dados);
            
            if (id) {
                const index = etiquetasData.findIndex(e => e.id === parseInt(id));
                if (index !== -1) {
                    etiquetasData[index] = { ...etiquetasData[index], ...dados };
                    console.log('✅ Etiqueta atualizada:', id);
                }
            } else {
                const novaEtiqueta = {
                    id: etiquetaIdCounter++,
                    ...dados,
                    status: 'Aberta',
                    data_abertura: hoje,
                    data_fechamento: null
                };
                etiquetasData.push(novaEtiqueta);
                console.log('✅ Nova etiqueta criada:', novaEtiqueta);
            }
            
            fecharModal('modal-etiqueta');
            carregarPagina(paginaAtual);
        });
    }
});

// ================================================================
// ATUALIZAR STATUS
// ================================================================

function atualizarStatusEtiqueta(id, novoStatus) {
    console.log('📝 Atualizando status da etiqueta', id, 'para', novoStatus);
    const etiqueta = etiquetasData.find(e => e.id === id);
    if (etiqueta) {
        etiqueta.status = novoStatus;
        if (novoStatus === 'Concluída') {
            etiqueta.data_fechamento = new Date().toLocaleDateString('pt-BR');
        }
        console.log('✅ Status atualizado:', etiqueta);
        carregarPagina(paginaAtual);
    } else {
        console.error('❌ Etiqueta não encontrada:', id);
    }
}

// ================================================================
// DELETAR ETIQUETA
// ================================================================

function deletarEtiqueta(id) {
    console.log('🗑️ Deletando etiqueta', id);
    if (confirm('Deseja realmente excluir esta etiqueta?')) {
        const index = etiquetasData.findIndex(e => e.id === id);
        if (index !== -1) {
            etiquetasData.splice(index, 1);
            console.log('✅ Etiqueta deletada:', id);
            carregarPagina(paginaAtual);
        }
    }
}

// ================================================================
// FILTRAR ETIQUETAS
// ================================================================

function filtrarEtiquetas() {
    console.log('🔍 Filtrando etiquetas');
    const tipo = document.getElementById('filtro-tipo').value;
    const status = document.getElementById('filtro-status').value;
    
    const rows = document.querySelectorAll('#tabela-etiquetas-body tr');
    rows.forEach(row => {
        if (row.cells.length === 1) return;
        const rowTipo = row.dataset.tipo || '';
        const rowStatus = row.dataset.status || '';
        let mostrar = true;
        if (tipo && rowTipo !== tipo) mostrar = false;
        if (status && rowStatus !== status) mostrar = false;
        row.style.display = mostrar ? '' : 'none';
    });
}

// EXPORTA FUNÇÕES PARA O ESCOPO GLOBAL
window.carregarDashboardReal = carregarDashboardReal;
window.carregarListaEtiquetas = carregarListaEtiquetas;
window.abrirModalEtiquetaReal = abrirModalEtiquetaReal;
window.atualizarStatusEtiqueta = atualizarStatusEtiqueta;
window.deletarEtiqueta = deletarEtiqueta;
window.filtrarEtiquetas = filtrarEtiquetas;

console.log('✅ Etiquetas.js carregado e funções exportadas!');