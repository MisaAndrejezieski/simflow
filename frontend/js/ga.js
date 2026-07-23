// ================================================================
// GA.JS - MÓDULO GRUPO AUTÔNOMO
// ================================================================

let gaData = [];
let gaIdCounter = 1;

console.log('👥 Módulo GA carregado!');

// ================================================================
// CARREGAR LISTA
// ================================================================

function carregarListaGA() {
    console.log('👥 carregarListaGA chamado');
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
                            <button class="btn btn-sm btn-secondary" onclick="window.editarGA(${r.id})">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="window.deletarGA(${r.id})">🗑️</button>
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
    console.log('✅ Lista GA atualizada com', gaData.length, 'itens');
}

// ================================================================
// ABRIR MODAL
// ================================================================

function abrirModalGAReal(dados = null) {
    console.log('📝 abrirModalGAReal chamado', dados);
    const modal = document.getElementById('modal-ga');
    const form = document.getElementById('form-ga');
    
    if (!modal || !form) {
        console.error('❌ Modal ou formulário GA não encontrado');
        return;
    }
    
    form.reset();
    document.getElementById('ga-id').value = '';
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('ga-data').value = hoje;
    
    if (dados) {
        document.getElementById('ga-id').value = dados.id;
        document.getElementById('ga-data').value = dados.data;
        document.getElementById('ga-pauta').value = dados.pauta || '';
        document.getElementById('ga-participantes').value = dados.participantes || '';
        document.getElementById('ga-decisoes').value = dados.decisoes || '';
        document.getElementById('ga-acoes').value = dados.acoes_geradas || 0;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    console.log('✅ Modal GA aberto');
}

// ================================================================
// SALVAR GA
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-ga');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulário GA submetido');
            
            const id = document.getElementById('ga-id').value;
            const dataISO = document.getElementById('ga-data').value;
            const dataFormatada = new Date(dataISO + 'T00:00:00').toLocaleDateString('pt-BR');
            
            const dados = {
                data: dataFormatada,
                pauta: document.getElementById('ga-pauta').value,
                participantes: document.getElementById('ga-participantes').value,
                decisoes: document.getElementById('ga-decisoes').value,
                acoes_geradas: parseInt(document.getElementById('ga-acoes').value) || 0
            };
            
            console.log('📝 Dados GA:', dados);
            
            if (id) {
                const index = gaData.findIndex(r => r.id === parseInt(id));
                if (index !== -1) {
                    gaData[index] = { ...gaData[index], ...dados };
                    console.log('✅ GA atualizado:', id);
                }
            } else {
                const novoGA = { id: gaIdCounter++, ...dados };
                gaData.push(novoGA);
                console.log('✅ Novo GA criado:', novoGA);
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
    console.log('✏️ Editando GA', id);
    const reuniao = gaData.find(r => r.id === id);
    if (reuniao) {
        const partes = reuniao.data.split('/');
        const dataISO = `${partes[2]}-${partes[1]}-${partes[0]}`;
        abrirModalGAReal({ ...reuniao, data: dataISO });
    } else {
        console.error('❌ GA não encontrado:', id);
    }
}

// ================================================================
// DELETAR GA
// ================================================================

function deletarGA(id) {
    console.log('🗑️ Deletando GA', id);
    if (confirm('Deseja realmente excluir esta reunião?')) {
        const index = gaData.findIndex(r => r.id === id);
        if (index !== -1) {
            gaData.splice(index, 1);
            console.log('✅ GA deletado:', id);
            carregarPagina(paginaAtual);
        }
    }
}

// EXPORTA FUNÇÕES PARA O ESCOPO GLOBAL
window.carregarListaGA = carregarListaGA;
window.abrirModalGAReal = abrirModalGAReal;
window.editarGA = editarGA;
window.deletarGA = deletarGA;

console.log('✅ GA.js carregado e funções exportadas!');