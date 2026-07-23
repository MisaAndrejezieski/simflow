// Funções de navegação atualizadas
function loadGA() {
    if (typeof carregarGA === 'function') {
        carregarGA();
    } else {
        document.getElementById('page-content').innerHTML = 
            '<p>Módulo GA em desenvolvimento...</p>';
    }
}

function loadMelhorias() {
    if (typeof carregarMelhorias === 'function') {
        carregarMelhorias();
    } else {
        document.getElementById('page-content').innerHTML = 
            '<p>Módulo Ver & Agir em desenvolvimento...</p>';
    }
}

function loadAcidentes() {
    if (typeof carregarAcidentes === 'function') {
        carregarAcidentes();
    } else {
        document.getElementById('page-content').innerHTML = 
            '<p>Módulo Quase Acidentes em desenvolvimento...</p>';
    }
}