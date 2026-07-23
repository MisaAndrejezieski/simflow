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
    console.log('✅ Lista