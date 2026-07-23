// ============================================
// MÓDULO GA - Grupo Autônomo
// ============================================

async function carregarGA() {
    const content = document.getElementById('page-content');
    
    try {
        const reunioes = await GAAPI.listar();
        
        let html = `
            <div style="margin-bottom: 20px;">
                <button onclick="abrirModalGA()" class="btn-primary">+ Nova Reunião GA</button>
            </div>
            <div class="table-container">
                <h3>Reuniões do Grupo Autônomo</h3>
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
        
        if (reunioes.length === 0) {
            html += `<tr><td colspan="7" style="text-align: center;">Nenhuma reunião cadastrada</td></tr>`;
        } else {
            reunioes.forEach(r => {
                html += `
                    <tr>
                        <td>#${r.id}</td>
                        <td>${r.data}</td>
                        <td>${r.pauta}</td>
                        <td>${r.participantes}</td>
                        <td>${r.decisoes.substring(0, 50)}...</td>
                        <td>${r.acoes_geradas}</td>
                        <td>
                            <button onclick="editarGA(${r.id})" class="btn-small">✏️</button>
                            <button onclick="deletarGA(${r.id})" class="btn-small btn-danger">🗑️</button>
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
        content.innerHTML = `<p>Erro ao carregar reuniões: ${error.message}</p>`;
    }
}

// Modal para criar/editar GA
function abrirModalGA(dados = null) {
    const modal = document.getElementById('modal-ga');
    const form = document.getElementById('form-ga');
    
    // Preencher dados se for edição
    if (dados) {
        document.getElementById('ga-id').value = dados.id;
        document.getElementById('ga-data').value = dados.data;
        document.getElementById('ga-pauta').value = dados.pauta;
        document.getElementById('ga-participantes').value = dados.participantes;
        document.getElementById('ga-decisoes').value = dados.decisoes;
        document.getElementById('ga-acoes').value = dados.acoes_geradas;
    } else {
        form.reset();
        document.getElementById('ga-id').value = '';
    }
    
    modal.style.display = 'flex';
}

// Fechar modal GA
function fecharModalGA() {
    document.getElementById('modal-ga').style.display = 'none';
}

// Salvar GA
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-ga');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const id = document.getElementById('ga-id').value;
            const dados = {
                data: document.getElementById('ga-data').value,
                pauta: document.getElementById('ga-pauta').value,
                participantes: document.getElementById('ga-participantes').value,
                decisoes: document.getElementById('ga-decisoes').value,
                acoes_geradas: parseInt(document.getElementById('ga-acoes').value) || 0
            };
            
            try {
                if (id) {
                    await GAAPI.atualizar(parseInt(id), dados);
                } else {
                    await GAAPI.criar(dados);
                }
                fecharModalGA();
                carregarGA();
            } catch (error) {
                alert('Erro ao salvar: ' + error.message);
            }
        });
    }
});

// Editar GA
async function editarGA(id) {
    try {
        const dados = await GAAPI.buscar(id);
        abrirModalGA(dados);
    } catch (error) {
        alert('Erro ao carregar dados: ' + error.message);
    }
}

// Deletar GA
async function deletarGA(id) {
    if (confirm('Deseja realmente deletar esta reunião?')) {
        try {
            await GAAPI.deletar(id);
            carregarGA();
        } catch (error) {
            alert('Erro ao deletar: ' + error.message);
        }
    }
}