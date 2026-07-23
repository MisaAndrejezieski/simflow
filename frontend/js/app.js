// ================================================================
// APP.JS - CONTROLE PRINCIPAL
// ================================================================

// Variável global para saber qual página está ativa
let paginaAtual = 'dashboard';

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SIMFlow iniciado!');
    
    // Verificar se as funções dos módulos estão disponíveis
    console.log('✅ Etiquetas carregado:', typeof carregarListaEtiquetas !== 'undefined');
    console.log('✅ GA carregado:', typeof carregarListaGA !== 'undefined');
    console.log('✅ Melhorias carregado:', typeof carregarListaMelhorias !== 'undefined');
    console.log('✅ Acidentes carregado:', typeof carregarListaAcidentes !== 'undefined');
    
    // Configurar navegação
    configurarNavegacao();
    
    // Configurar botão Novo
    configurarBotaoNovo();
    
    // Carregar Dashboard
    carregarPagina('dashboard');
});

// ================================================================
// NAVEGAÇÃO
// ================================================================

function configurarNavegacao() {
    const menuItems = document.querySelectorAll('.sidebar-nav ul li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const pagina = this.dataset.page;
            carregarPagina(pagina);
        });
    });
}

function carregarPagina(pagina) {
    console.log('📄 Carregando página:', pagina);
    
    // Atualizar menu
    document.querySelectorAll('.sidebar-nav ul li').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`.sidebar-nav ul li[data-page="${pagina}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
    
    // Atualizar título
    const titulos = {
        'dashboard': '📊 Dashboard',
        'etiquetas': '🏷️ Etiquetas',
        'ga': '👥 Grupo Autônomo (GA)',
        'melhorias': '📈 Ver & Agir / LUP\'S',
        'acidentes': '⚠️ Quase Acidentes'
    };
    
    document.getElementById('page-title').textContent = titulos[pagina] || pagina;
    
    // Mostrar/esconder botão Novo
    const btnNovo = document.getElementById('btn-novo');
    if (pagina === 'dashboard') {
        btnNovo.style.display = 'none';
    } else {
        btnNovo.style.display = 'inline-flex';
    }
    
    // Carregar conteúdo da página
    paginaAtual = pagina;
    
    switch(pagina) {
        case 'dashboard':
            carregarDashboard();
            break;
        case 'etiquetas':
            carregarEtiquetas();
            break;
        case 'ga':
            carregarGA();
            break;
        case 'melhorias':
            carregarMelhorias();
            break;
        case 'acidentes':
            carregarAcidentes();
            break;
        default:
            document.getElementById('page-content').innerHTML = `
                <div style="text-align:center; padding: 60px; color: var(--text-muted);">
                    <h3>Página em construção</h3>
                </div>
            `;
    }
}

// ================================================================
// BOTÃO NOVO
// ================================================================

function configurarBotaoNovo() {
    const btnNovo = document.getElementById('btn-novo');
    btnNovo.addEventListener('click', function() {
        const pagina = paginaAtual;
        console.log('➕ Botão Novo clicado na página:', pagina);
        
        switch(pagina) {
            case 'etiquetas':
                abrirModalEtiqueta();
                break;
            case 'ga':
                abrirModalGA();
                break;
            case 'melhorias':
                abrirModalMelhoria();
                break;
            case 'acidentes':
                abrirModalAcidente();
                break;
            default:
                alert('Nenhuma ação disponível para esta página');
        }
    });
}

// ================================================================
// FUNÇÕES GLOBAIS DE MODAL
// ================================================================

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('📂 Modal aberto:', modalId);
    } else {
        console.error('❌ Modal não encontrado:', modalId);
    }
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('📂 Modal fechado:', modalId);
    }
}

// Fechar modal clicando fora
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

// ================================================================
// FUNÇÕES DE CARREGAMENTO (Chamam os módulos)
// ================================================================

function carregarDashboard() {
    console.log('📊 Carregando Dashboard...');
    const content = document.getElementById('page-content');
    
    // Verificar se a função existe
    if (typeof window.carregarDashboardReal === 'function') {
        window.carregarDashboardReal();
    } else {
        console.error('❌ Função carregarDashboardReal não encontrada');
        content.innerHTML = `
            <div style="text-align:center; padding: 60px; color: var(--text-muted);">
                <h3>⚠️ Erro ao carregar Dashboard</h3>
                <p>Recarregue a página (F5) e tente novamente.</p>
            </div>
        `;
    }
}

function carregarEtiquetas() {
    console.log('🏷️ Carregando Etiquetas...');
    if (typeof window.carregarListaEtiquetas === 'function') {
        window.carregarListaEtiquetas();
    } else {
        console.error('❌ Função carregarListaEtiquetas não encontrada');
        document.getElementById('page-content').innerHTML = `
            <div style="text-align:center; padding: 60px; color: var(--text-muted);">
                <h3>⚠️ Erro ao carregar Etiquetas</h3>
                <p>Recarregue a página (F5) e tente novamente.</p>
            </div>
        `;
    }
}

function carregarGA() {
    console.log('👥 Carregando GA...');
    if (typeof window.carregarListaGA === 'function') {
        window.carregarListaGA();
    } else {
        console.error('❌ Função carregarListaGA não encontrada');
        document.getElementById('page-content').innerHTML = `
            <div style="text-align:center; padding: 60px; color: var(--text-muted);">
                <h3>⚠️ Erro ao carregar GA</h3>
                <p>Recarregue a página (F5) e tente novamente.</p>
            </div>
        `;
    }
}

function carregarMelhorias() {
    console.log('📈 Carregando Melhorias...');
    if (typeof window.carregarListaMelhorias === 'function') {
        window.carregarListaMelhorias();
    } else {
        console.error('❌ Função carregarListaMelhorias não encontrada');
        document.getElementById('page-content').innerHTML = `
            <div style="text-align:center; padding: 60px; color: var(--text-muted);">
                <h3>⚠️ Erro ao carregar Melhorias</h3>
                <p>Recarregue a página (F5) e tente novamente.</p>
            </div>
        `;
    }
}

function carregarAcidentes() {
    console.log('⚠️ Carregando Acidentes...');
    if (typeof window.carregarListaAcidentes === 'function') {
        window.carregarListaAcidentes();
    } else {
        console.error('❌ Função carregarListaAcidentes não encontrada');
        document.getElementById('page-content').innerHTML = `
            <div style="text-align:center; padding: 60px; color: var(--text-muted);">
                <h3>⚠️ Erro ao carregar Acidentes</h3>
                <p>Recarregue a página (F5) e tente novamente.</p>
            </div>
        `;
    }
}

// ================================================================
// FUNÇÕES PARA ABRIR MODAIS (Chamam os módulos)
// ================================================================

function abrirModalEtiqueta(dados) {
    console.log('📝 Abrindo modal Etiqueta...');
    if (typeof window.abrirModalEtiquetaReal === 'function') {
        window.abrirModalEtiquetaReal(dados);
    } else {
        console.error('❌ Função abrirModalEtiquetaReal não encontrada');
        abrirModal('modal-etiqueta');
    }
}

function abrirModalGA(dados) {
    console.log('📝 Abrindo modal GA...');
    if (typeof window.abrirModalGAReal === 'function') {
        window.abrirModalGAReal(dados);
    } else {
        console.error('❌ Função abrirModalGAReal não encontrada');
        abrirModal('modal-ga');
    }
}

function abrirModalMelhoria(dados) {
    console.log('📝 Abrindo modal Melhoria...');
    if (typeof window.abrirModalMelhoriaReal === 'function') {
        window.abrirModalMelhoriaReal(dados);
    } else {
        console.error('❌ Função abrirModalMelhoriaReal não encontrada');
        abrirModal('modal-melhoria');
    }
}

function abrirModalAcidente(dados) {
    console.log('📝 Abrindo modal Acidente...');
    if (typeof window.abrirModalAcidenteReal === 'function') {
        window.abrirModalAcidenteReal(dados);
    } else {
        console.error('❌ Função abrirModalAcidenteReal não encontrada');
        abrirModal('modal-acidente');
    }
}

// EXPORTA FUNÇÕES PARA O ESCOPO GLOBAL
window.carregarPagina = carregarPagina;
window.abrirModal = abrirModal;
window.fecharModal = fecharModal;
window.abrirModalEtiqueta = abrirModalEtiqueta;
window.abrirModalGA = abrirModalGA;
window.abrirModalMelhoria = abrirModalMelhoria;
window.abrirModalAcidente = abrirModalAcidente;