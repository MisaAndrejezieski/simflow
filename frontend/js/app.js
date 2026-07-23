document.addEventListener('DOMContentLoaded', () => {
    // Navegação
    const menuItems = document.querySelectorAll('.sidebar ul li');
    const pageContent = document.getElementById('page-content');
    const pageTitle = document.getElementById('page-title');
    const btnNovo = document.getElementById('btn-novo');
    
    // Função para trocar página (simplificada)
    function loadPage(page) {
        menuItems.forEach(item => item.classList.remove('active'));
        
        const activeItem = Array.from(menuItems).find(item => 
            item.dataset.page === page
        );
        if (activeItem) activeItem.classList.add('active');
        
        // Atualiza título
        const titles = {
            'dashboard': 'Dashboard',
            'etiquetas': 'Etiquetas',
            'ga': 'Grupo Autônomo (GA)',
            'melhorias': 'Ver & Agir / LUP\'S',
            'acidentes': 'Quase Acidentes'
        };
        pageTitle.textContent = titles[page] || page;
        
        // Carrega conteúdo
        switch(page) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'etiquetas':
                loadEtiquetas();
                break;
            case 'ga':
                loadGA();
                break;
            case 'melhorias':
                loadMelhorias();
                break;
            case 'acidentes':
                loadAcidentes();
                break;
        }
    }
    
    // Eventos de clique no menu
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            loadPage(item.dataset.page);
        });
    });
    
    // Modal
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const formEtiqueta = document.getElementById('form-etiqueta');
    
    btnNovo.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    
    // Formulário de criação
    formEtiqueta.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const dados = {
            titulo: document.getElementById('titulo').value,
            descricao: document.getElementById('descricao').value,
            tipo: document.getElementById('tipo').value,
            linha: document.getElementById('linha').value,
            responsavel: document.getElementById('responsavel').value,
            via: document.getElementById('via').value,
            observacoes: document.getElementById('observacoes').value
        };
        
        try {
            await EtiquetasAPI.criar(dados);
            modal.style.display = 'none';
            formEtiqueta.reset();
            loadDashboard(); // Recarrega
        } catch (error) {
            alert('Erro ao criar etiqueta: ' + error.message);
        }
    });
    
    // Inicia com Dashboard
    loadPage('dashboard');
});

// Funções que serão sobrescritas pelos módulos específicos
function loadDashboard() {
    // Será implementada em etiquetas.js
    if (typeof carregarDashboard === 'function') {
        carregarDashboard();
    }
}

function loadEtiquetas() {
    if (typeof carregarEtiquetas === 'function') {
        carregarEtiquetas();
    }
}

function loadGA() {
    alert('Módulo GA em desenvolvimento');
}

function loadMelhorias() {
    alert('Módulo Ver & Agir em desenvolvimento');
}

function loadAcidentes() {
    alert('Módulo Quase Acidentes em desenvolvimento');
}