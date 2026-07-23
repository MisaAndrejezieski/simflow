// ================================================================
// MELHORIAS.JS - MÓDULO VER & AGIR / LUP'S
// ================================================================

let melhoriasData = [];
let melhoriaIdCounter = 1;

console.log('📈 Módulo Melhorias carregado!');

// ================================================================
// CARREGAR LISTA
// ================================================================

function carregarListaMelhorias() {
    console.log('📈 carregarListaMelhorias chamado');
    const content = document.getElementById('page-content');
    
    let html = `<div class="grid-melhorias">`;
    
    if (melhoriasData.length === 0) {
        html += `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-muted); background: var(--bg-card); border-radius: var(--border-radius);">
                <div style="font-size: 48px; margin-bottom: 16px;">📈</div>
                <h3>Nenhuma melhoria cadastrada</h3>
                <p style="margin-top: 8px;">Clique em "+ Novo" para criar uma melhoria Ver & Agir ou LUP</p>
            </div>
        `;
    } else {
        melhoriasData.forEach(m => {
            const categoriaClass = m.categoria === 'Ver & Agir' ? 'badge-success' : 'badge-info';
            
            html += `
                <div class="card-melhoria">
                    <div class="melhoria-header">
                        <h4>${m.titulo}</h4>
                        <span class="badge ${categoriaClass}">${m.categoria}</span>
                    </div>
                    <div class="melhoria-descricao">${m.descricao}</div>
                    ${m.imagem_antes || m.imagem_depois ? `
                        <div class="melhoria-imagens">
                            ${m.imagem_antes ? `<img src="${m.imagem_antes}" alt="Antes" onerror="this.style.display='none'">` : ''}
                            ${m.imagem_depois ? `<img src="${m.imagem_depois}" alt="Depois" onerror="this.style.display='none'">` : ''}
                        </div>
                    ` : ''}
                    <div class="melhoria-footer">
                        <small>📅 ${m.data_criacao}</small>
                        <div style="display: flex; gap: 4px;">
                            <button class="btn btn-sm btn-secondary" onclick="window.editarMelhoria(${m.id})">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="window.deletarMelhoria(${m.id})">🗑️</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    html += `</div>`;
    content.innerHTML = html;
    console.log('✅ Lista de melhorias atualizada com', melhoriasData.length, 'itens');
}

// ================================================================
// ABRIR MODAL
// ================================================================

function abrirModalMelhoriaReal(dados = null) {
    console.log('📝 abrirModalMelhoriaReal chamado', dados);
    const modal = document.getElementById('modal-melhoria');
    const form = document.getElementById('form-melhoria');
    
    if (!modal || !form) {
        console.error('❌ Modal ou formulário Melhoria não encontrado');
        return;
    }
    
    form.reset();
    document.getElementById('melhoria-id').value = '';
    document.getElementById('melhoria-categoria').value = 'Ver & Agir';
    
    if (dados) {
        document.getElementById('melhoria-id').value = dados.id;
        document.getElementById('melhoria-titulo').value = dados.titulo || '';
        document.getElementById('melhoria-descricao').value = dados.descricao || '';
        document.getElementById('melhoria-categoria').value = dados.categoria || 'Ver & Agir';
        document.getElementById('melhoria-imagem-antes').value = dados.imagem_antes || '';
        document.getElementById('melhoria-imagem-depois').value = dados.imagem_depois || '';
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    console.log('✅ Modal Melhoria aberto');
}

// ================================================================
// SALVAR MELHORIA
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-melhoria');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulário Melhoria submetido');
            
            const id = document.getElementById('melhoria-id').value;
            const hoje = new Date().toLocaleDateString('pt-BR');
            
            const dados = {
                titulo: document.getElementById('melhoria-titulo').value,
                descricao: document.getElementById('melhoria-descricao').value,
                categoria: document.getElementById('melhoria-categoria').value,
                imagem_antes: document.getElementById('melhoria-imagem-antes').value,
                imagem_depois: document.getElementById('melhoria-imagem-depois').value
            };
            
            console.log('📝 Dados Melhoria:', dados);
            
            if (id) {
                const index = melhoriasData.findIndex(m => m.id === parseInt(id));
                if (index !== -1) {
                    melhoriasData[index] = { ...melhoriasData[index], ...dados };
                    console.log('✅ Melhoria atualizada:', id);
                }
            } else {
                const novaMelhoria = { id: melhoriaIdCounter++, ...dados, data_criacao: hoje };
                melhoriasData.push(novaMelhoria);
                console.log('✅ Nova melhoria criada:', novaMelhoria);
            }
            
            fecharModal('modal-melhoria');
            carregarPagina(paginaAtual);
        });
    }
});

// ================================================================
// EDITAR MELHORIA
// ================================================================

function editarMelhoria(id) {
    console.log('✏️ Editando melhoria', id);
    const melhoria = melhoriasData.find(m => m.id === id);
    if (melhoria) {
        abrirModalMelhoriaReal(melhoria);
    } else {
        console.error('❌ Melhoria não encontrada:', id);
    }
}

// ================================================================
// DELETAR MELHORIA
// ================================================================

function deletarMelhoria(id) {
    console.log('🗑️ Deletando melhoria', id);
    if (confirm('Deseja realmente excluir esta melhoria?')) {
        const index = melhoriasData.findIndex(m => m.id === id);
        if (index !== -1) {
            melhoriasData.splice(index, 1);
            console.log('✅ Melhoria deletada:', id);
            carregarPagina(paginaAtual);
        }
    }
}

// EXPORTA FUNÇÕES PARA O ESCOPO GLOBAL
window.carregarListaMelhorias = carregarListaMelhorias;
window.abrirModalMelhoriaReal = abrirModalMelhoriaReal;
window.editarMelhoria = editarMelhoria;
window.deletarMelhoria = deletarMelhoria;

console.log('✅ Melhorias.js carregado e funções exportadas!');