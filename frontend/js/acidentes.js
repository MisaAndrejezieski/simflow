// ============================================
// MÓDULO QUASE ACIDENTES
// ============================================

async function carregarAcidentes() {
    const content = document.getElementById('page-content');
    
    try {
        const acidentes = await AcidentesAPI.listar();
        
        let html = `
            <div style="margin-bottom: 20px;">
                <button onclick="abrirModalAcidente()" class="btn-primary">+ Registrar Quase Acidente</button>
            </div>
            <div class="table-container">
                <h3>Registro de Quase Acidentes</h3>
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
                    <tbody>
        `;
        
        if (acidentes.length === 0) {
            html += `<tr><td colspan="7" style="text-align: center;">Nenhum quase acidente registrado</td></tr>`;
        } else {
            acidentes.forEach(a => {
                const statusClass = {
                    'Reportado': 'status-aberta',
                    'Em Análise': 'status-analise',
                    'Resolvido': 'status-concluida'
                }[a.status] || '';
                
                html += `
                    <tr>
                        <td>#${a.id}</td>
                        <td>${a.descricao}</td>
                        <td>${a.local}</td>
                        <td>${a.responsavel}</td>
                        <td><span class="${statusClass}">${a.status}</span></td>
                        <td>${new Date(a.data).toLocaleDateString()}</td>
                        <td>
                            <button onclick="editarAcidente(${a.id})" class="btn-small">✏️</button>
                            <button onclick="deletarAcidente(${a.id})" class="btn-small btn-danger">🗑️</button>
                            <button onclick="atualizarStatusAcidente(${a.id}, 'Em Análise')" class="btn-small">Analisar</button>
                            <button onclick="atualizarStatusAcidente(${a.id}, 'Resolvido')" class="btn-small btn-success">Resolver</button>
                        </td>
                    </tr>
                `;
            });
        }
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        content.innerHTML = html;
        
    } catch (error) {
        content.innerHTML = `<p>Erro ao carregar quase acidentes: ${error.message}</p>`;
    }
}

// Modal para criar/editar quase acidente
function abrirModalAcidente(dados = null) {
    const modal = document.getElementById('modal-acidente');
    
    if (dados) {
        document.getElementById('acidente-id').value = dados.id;
        document.getElementById('acidente-descricao').value = dados.descricao;
        document.getElementById('acidente-local').value = dados.local;
        document.getElementById('acidente-responsavel').value = dados.responsavel;
        document.getElementById('acidente-status').value = dados.status;
    } else {
        document.getElementById('form-acidente').reset();
        document.getElementById('acidente-id').value = '';
        document.getElementById('acidente-status').value = 'Reportado';
    }
    
    modal.style.display = 'flex';
}

function fecharModalAcidente() {
    document.getElementById('modal-acidente').style.display = 'none';
}

// Salvar Quase Acidente
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-acidente');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const id = document.getElementById('acidente-id').value;
            const dados = {
                descricao: document.getElementById('acidente-descricao').value,
                local: document.getElementById('acidente-local').value,
                responsavel: document.getElementById('acidente-responsavel').value,
                status: document.getElementById('acidente-status').value
            };
            
            try {
                if (id) {
                    await AcidentesAPI.atualizar(parseInt(id), dados);
                } else {
                    await AcidentesAPI.criar(dados);
                }
                fecharModalAcidente();
                carregarAcidentes();
            } catch (error) {
                alert('Erro ao salvar: ' + error.message);
            }
        });
    }
});

// Editar Quase Acidente
async function editarAcidente(id) {
    try {
        const dados = await AcidentesAPI.buscar(id);
        abrirModalAcidente(dados);
    } catch (error) {
        alert('Erro ao carregar dados: ' + error.message);
    }
}

// Deletar Quase Acidente
async function deletarAcidente(id) {
    if (confirm('Deseja realmente deletar este registro?')) {
        try {
            await AcidentesAPI.deletar(id);
            carregarAcidentes();
        } catch (error) {
            alert('Erro ao deletar: ' + error.message);
        }
    }
}

// Atualizar status do quase acidente
async function atualizarStatusAcidente(id, novoStatus) {
    try {
        await AcidentesAPI.atualizar(id, { status: novoStatus });
        carregarAcidentes();
    } catch (error) {
        alert('Erro ao atualizar: ' + error.message);
    }
}