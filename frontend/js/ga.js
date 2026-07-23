// ================================================================
// GA.JS - MÓDULO GRUPO AUTÔNOMO
// ================================================================

let gaData = [];
let gaIdCounter = 1;

// ================================================================
// CARREGAR LISTA
// ================================================================

function carregarListaGA() {
    const content = document.getElementById('page-content');
    
    let html = `
        <div class="table-container">
            <div class="table-header">
                <h3>👥 Reuniões do GA</h3>
            </div>
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Pauta</th>
                            <th>Participantes</th>
                            <th>Decisões</th>
                            <th>Ações</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    if (gaData.length === 0) {
        html += `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
                    Nenhuma reunião cadastrada. Clique em "+ Novo" para criar!
                </td>
            </tr>
        `;
    } else {
        gaData.forEach(r => {
            html += `
                <tr>
                    <td>#${r.id}</td>
                    <td>${r.data}</td>
                    <td><strong>${r.pauta}</strong></td>
                    <td>${r.participantes || '-'}</td>
                    <td>${r.decisoes ? r.decisoes.substring(0, 50) + (r.decisoes.length > 50 ? '...' : '') : '-'}</td>
                    <td><span class="badge badge-info">${r.acoes_geradas || 0}</span></td>
                    <td>
                        <div style="display: flex; gap: 4px;">
                            <button class="btn btn-sm btn-secondary" onclick="editarGA(${r.id})">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="deletarGA(${r.id})">🗑️</button>
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

function abrirModalGAReal(dados = null) {
    const modal = document.getElementById('modal-ga');
    const form = document.getElementById('form-ga');
    
    form.reset();
    document.getElementById('ga-id').value = '';
    
    // Data padrão = hoje
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('ga-data').value = hoje;
    
    if (dados) {
        document.getElementById('ga-id').value = dados.id;
        document.getElementById('ga-data').value = dados.data;
        document.getElementById('ga-pauta').value = dados.pauta;
        document.getElementById('ga-participantes').value = dados.participantes || '';
        document.getElementById('ga-decisoes').value = dados.decisoes || '';
        document.getElementById('ga-acoes').value = dados.acoes_geradas || 0;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ================================================================
// SALVAR GA
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-ga');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('ga-id').value;
            const dados = {
                data: document.getElementById('ga-data').value,
                pauta: document.getElementById('ga-pauta').value,
                participantes: document.getElementById('ga-participantes').value,
                decisoes: document.getElementById('ga-decisoes').value,
                acoes_geradas: parseInt(document.getElementById('ga-acoes').value) || 0
            };
            
            // Formatar data para exibição
            const dataFormatada = new Date(dados.data + 'T00:00:00').toLocaleDateString('pt-BR');
            
            if (id) {
                const index = gaData.findIndex(r => r.id === parseInt(id));
                if (index !== -1) {
                    gaData[index] = { ...gaData[index], ...dados, data: dataFormatada };
                }
            } else {
                gaData.push({
                    id: gaIdCounter++,
                    ...dados,
                    data: dataFormatada
                });
            }
            
            fecharModal('modal-ga');
            carregarPagina(paginaAtual);
        });
    }
});

// ================================================================
// EDITAR GA
// ================================================================

function editarGA(id) {
    const reuniao = gaData.find(r => r.id === id);
    if (reuniao) {
        // Converter data de volta para formato YYYY-MM-DD
        const partes = reuniao.data.split('/');
        const dataISO = `${partes[2]}-${partes[1]}-${partes[0]}`;
        abrirModalGAReal({ ...reuniao, data: dataISO });
    }
}

// ================================================================
// DELETAR GA
// ================================================================

function deletarGA(id) {
    if (confirm('Deseja realmente excluir esta reunião?')) {
        gaData = gaData.filter(r => r.id !== id);
        carregarPagina(paginaAtual);
    }
}

// Sobrescrever funções globais
window.carregarListaGA = carregarListaGA;
window.abrirModalGAReal = abrirModalGAReal;
window.editarGA = editarGA;
window.deletarGA = deletarGA;