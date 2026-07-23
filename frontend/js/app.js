// ================================================================
// APP.JS - CONTROLE PRINCIPAL
// ================================================================

// Variável global para saber qual página está ativa
let paginaAtual = 'dashboard';

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SIMFlow iniciado!');
    
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
    }
}

// ================================================================
// BOTÃO NOVO
// ================================================================

function configurarBotaoNovo() {
    const btnNovo = document.getElementById('btn-novo');
    btnNovo.addEventListener('click', function() {
        const pagina = paginaAtual;
        
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
        // Impedir scroll do body
        document.body.style.overflow = 'hidden';
    }
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
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
// FUNÇÕES QUE SERÃO SOBRESCRITAS PELOS MÓDULOS
// ================================================================

function carregarDashboard() {
    // Será implementada em etiquetas.js
    if (typeof carregarDashboardReal === 'function') {
        carregarDashboardReal();
    } else {
        document.getElementById('page-content').innerHTML = `
            <div class="loading">Carregando dashboard...</div>
        `;
    }
}

function carregarEtiquetas() {
    if (typeof carregarListaEtiquetas === 'function') {
        carregarListaEtiquetas();
    } else {
        document.getElementById('page-content').innerHTML = `
            <div class="loading">Carregando etiquetas...</div>
        `;
    }
}

function carregarGA() {
    if (typeof carregarListaGA === 'function') {
        carregarListaGA();
    } else {
        document.getElementById('page-content').innerHTML = `
            <div class="loading">Carregando reuniões GA...</div>
        `;
    }
}

function carregarMelhorias() {
    if (typeof carregarListaMelhorias === 'function') {
        carregarListaMelhorias();
    } else {
        document.getElementById('page-content').innerHTML = `
            <div class="loading">Carregando melhorias...</div>
        `;
    }
}

function carregarAcidentes() {
    if (typeof carregarListaAcidentes === 'function') {
        carregarListaAcidentes();
    } else {
        document.getElementById('page-content').innerHTML = `
            <div class="loading">Carregando quase acidentes...</div>
        `;
    }
}

// ================================================================
// FUNÇÕES PARA ABRIR MODAIS (SERÃO SOBRESCRITAS)
// ================================================================

function abrirModalEtiqueta(dados) {
    if (typeof abrirModalEtiquetaReal === 'function') {
        abrirModalEtiquetaReal(dados);
    } else {
        abrirModal('modal-etiqueta');
    }
}

function abrirModalGA(dados) {
    if (typeof abrirModalGAReal === 'function') {
        abrirModalGAReal(dados);
    } else {
        abrirModal('modal-ga');
    }
}

function abrirModalMelhoria(dados) {
    if (typeof abrirModalMelhoriaReal === 'function') {
        abrirModalMelhoriaReal(dados);
    } else {
        abrirModal('modal-melhoria');
    }
}

function abrirModalAcidente(dados) {
    if (typeof abrirModalAcidenteReal === 'function') {
        abrirModalAcidenteReal(dados);
    } else {
        abrirModal('modal-acidente');
    }
}