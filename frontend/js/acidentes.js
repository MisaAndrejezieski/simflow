// ================================================================
// ACIDENTES.JS - MÓDULO QUASE ACIDENTES
// ================================================================

let acidentesData = [];
let acidenteIdCounter = 1;

// ================================================================
// CARREGAR LISTA
// ================================================================

function carregarListaAcidentes() {
    const content = document.getElementById('page-content');
    
    let html = `
        <div class="table-container">
            <div class="table-header">
                <h3>⚠️ Registro de Quase Acidentes</h3>
                <div class="table-filters">
                    <select id="filtro-status-acidente" onchange="filtrarAcidentes()">
                        <option value="">Todos</option>
                        <option value="Reportado">📢 Reportado</option>
                        <option value="Em Análise">🔍 Em Análise</option>
                        <option value="Resolvido">✅ Resolvido</option>
                    </select>
                </div>
            </div>
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descrição</th>
                            <th>Local</th>
                            <th>Responsável</th>
                            <th>Status</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tabela-acidentes-body">
    `;
    
    if (acidentesData.length === 0) {
        html += `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
                    Nenhum quase acidente registrado. Clique em "+ Novo" para registrar!
                </td>
            </tr>
        `;
    } else {
        acidentesData.forEach(a => {
            const statusClass = {
                'Reportado': 'status-aberta',
                'Em Análise': 'status-em-analise',
                'Resolvido': 'status-concluida'
            }[a.status] || '';
            
            html += `
                <tr data-status="${a.status}">
                    <td>#${a.id}</td>
                    <td>${a.descricao}</td>
                    <td>${a.local}</td>
                    <td>${a.responsavel}</td>
                    <td><span class="${statusClass}">${a.status}</span></td>
                    <td>${a.data}</td>
                    <td>
                        <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                            ${a.status !== 'Resolvido' ? `
                                <button class="btn btn-sm btn-primary" onclick="atualizarStatusAcidente(${a.id}, 'Em Análise')">Analisar</button>
                                <button class="btn btn-sm btn-success" onclick="atualizarStatusAcidente(${a.id}, 'Resolvido')">Resolver</button>
                            ` : ''}
                            <button class="btn btn-sm btn-secondary" onclick="editarAcidente(${a.id})">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="deletarAcidente(${a.id})">🗑️</button>
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
}

// ================================================================
// ABRIR MODAL
// ================================================================

function abrirModalAcidenteReal(dados = null) {
    const modal = document.getElementById('modal-acidente');
    const form = document.getElementById('form-acidente');
    
    form.reset();
    document.getElementById('acidente-id').value = '';
    document.getElementById('acidente-status').value = 'Reportado';
    
    if (dados) {
        document.getElementById('acidente-id').value = dados.id;
        document.getElementById('acidente-descricao').value = dados.descricao;
        document.getElementById('acidente-local').value = dados.local;
        document.getElementById('acidente-responsavel').value = dados.responsavel;
        document.getElementById('acidente-status').value = dados.status;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ================================================================
// SALVAR ACIDENTE
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-acidente');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('acidente-id').value;
            const hoje = new Date().toLocaleDateString('pt-BR');
            
            const dados = {
                descricao: document.getElementById('acidente-descricao').value,
                local: document.getElementById('acidente-local').value,
                responsavel: document.getElementById('acidente-responsavel').value,
                status: document.getElementById('acidente-status').value
            };
            
            if (id) {
                const index = acidentesData.findIndex(a => a.id === parseInt(id));
                if (index !== -1) {
                    acidentesData[index] = { ...acidentesData[index], ...dados };
                }
            } else {
                acidentesData.push({
                    id: acidenteIdCounter++,
                    ...dados,
                    data: hoje
                });
            }
            
            fecharModal('modal-acidente');
            carregarPagina(paginaAtual);
        });
    }
});

// ================================================================
// ATUALIZAR STATUS
// ================================================================

function atualizarStatusAcidente(id, novoStatus) {
    const acidente = acidentesData.find(a => a.id === id);
    if (acidente) {
        acidente.status = novoStatus;
        carregarPagina(paginaAtual);
    }
}

// ================================================================
// EDITAR ACIDENTE
// ================================================================

function editarAcidente(id) {
    const acidente = acidentesData.find(a => a.id === id);
    if (acidente) {
        abrirModalAcidenteReal(acidente);
    }
}

// ================================================================
// DELETAR ACIDENTE
// ================================================================

function deletarAcidente(id) {
    if (confirm('Deseja realmente excluir este registro?')) {
        acidentesData = acidentesData.filter(a => a.id !== id);
        carregarPagina(paginaAtual);
    }
}

// ================================================================
// FILTRAR ACIDENTES
// ================================================================

function filtrarAcidentes() {
    const status = document.getElementById('filtro-status-acidente').value;
    const rows = document.querySelectorAll('#tabela-acidentes-body tr');
    
    rows.forEach(row => {
        if (row.cells.length === 1) return;
        
        const rowStatus = row.dataset.status || '';
        if (status && rowStatus !== status) {
            row.style.display = 'none';
        } else {
            row.style.display = '';
        }
    });
}

// Sobrescrever funções globais
window.carregarListaAcidentes = carregarListaAcidentes;
window.abrirModalAcidenteReal = abrirModalAcidenteReal;
window.atualizarStatusAcidente = atualizarStatusAcidente;
window.editarAcidente = editarAcidente;
window.deletarAcidente = deletarAcidente;
window.filtrarAcidentes = filtrarAcidentes;