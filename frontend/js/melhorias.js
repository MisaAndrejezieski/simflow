// ============================================
// MÓDULO MELHORIAS - Ver & Agir / LUP'S
// ============================================

async function carregarMelhorias() {
    const content = document.getElementById('page-content');
    
    try {
        const melhorias = await MelhoriasAPI.listar();
        
        let html = `
            <div style="margin-bottom: 20px;">
                <button onclick="abrirModalMelhoria()" class="btn-primary">+ Nova Melhoria</button>
            </div>
            <div class="grid-melhorias">
        `;
        
        if (melhorias.length === 0) {
            html += `<p>Nenhuma melhoria cadastrada</p>`;
        } else {
            melhorias.forEach(m => {
                html += `
                    <div class="card-melhoria">
                        <h4>${m.titulo}</h4>
                        <span class="badge ${m.categoria === 'Ver & Agir' ? 'badge-verde' : 'badge-azul'}">${m.categoria}</span>
                        <p>${m.descricao}</p>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            ${m.imagem_antes ? `<div><strong>Antes:</strong><br><img src="${m.imagem_antes}" style="max-width: 100px; max-height: 100px;"></div>` : ''}
                            ${m.imagem_depois ? `<div><strong>Depois:</strong><br><img src="${m.imagem_depois}" style="max-width: 100px; max-height: 100px;"></div>` : ''}
                        </div>
                        <div style="margin-top: 10px;">
                            <button onclick="editarMelhoria(${m.id})" class="btn-small">✏️</button>
                            <button onclick="deletarMelhoria(${m.id})" class="btn-small btn-danger">🗑️</button>
                        </div>
                        <small>Criado em: ${new Date(m.data_criacao).toLocaleDateString()}</small>
                    </div>
                `;
            });
        }
        
        html += `
            </div>
        `;
        
        content.innerHTML = html;
        
    } catch (error) {
        content.innerHTML = `<p>Erro ao carregar melhorias: ${error.message}</p>`;
    }
}

// Modal para criar/editar melhoria
function abrirModalMelhoria(dados = null) {
    const modal = document.getElementById('modal-melhoria');
    
    if (dados) {
        document.getElementById('melhoria-id').value = dados.id;
        document.getElementById('melhoria-titulo').value = dados.titulo;
        document.getElementById('melhoria-descricao').value = dados.descricao;
        document.getElementById('melhoria-categoria').value = dados.categoria;
        document.getElementById('melhoria-imagem-antes').value = dados.imagem_antes || '';
        document.getElementById('melhoria-imagem-depois').value = dados.imagem_depois || '';
    } else {
        document.getElementById('form-melhoria').reset();
        document.getElementById('melhoria-id').value = '';
    }
    
    modal.style.display = 'flex';
}

function fecharModalMelhoria() {
    document.getElementById('modal-melhoria').style.display = 'none';
}

// Salvar Melhoria
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-melhoria');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const id = document.getElementById('melhoria-id').value;
            const dados = {
                titulo: document.getElementById('melhoria-titulo').value,
                descricao: document.getElementById('melhoria-descricao').value,
                categoria: document.getElementById('melhoria-categoria').value,
                imagem_antes: document.getElementById('melhoria-imagem-antes').value,
                imagem_depois: document.getElementById('melhoria-imagem-depois').value
            };
            
            try {
                if (id) {
                    await MelhoriasAPI.atualizar(parseInt(id), dados);
                } else {
                    await MelhoriasAPI.criar(dados);
                }
                fecharModalMelhoria();
                carregarMelhorias();
            } catch (error) {
                alert('Erro ao salvar: ' + error.message);
            }
        });
    }
});

// Editar Melhoria
async function editarMelhoria(id) {
    try {
        const dados = await MelhoriasAPI.buscar(id);
        abrirModalMelhoria(dados);
    } catch (error) {
        alert('Erro ao carregar dados: ' + error.message);
    }
}

// Deletar Melhoria
async function deletarMelhoria(id) {
    if (confirm('Deseja realmente deletar esta melhoria?')) {
        try {
            await MelhoriasAPI.deletar(id);
            carregarMelhorias();
        } catch (error) {
            alert('Erro ao deletar: ' + error.message);
        }
    }
}