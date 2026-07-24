// ================================================================
// API.JS - COMUNICAÇÃO COM O BACKEND FLASK
// ================================================================

// ================================================================
// CONFIGURAÇÃO
// ================================================================

// URL do backend (mudar para produção quando fizer deploy)
const API_URL = 'http://localhost:5000/api';

// ================================================================
// FUNÇÃO GENÉRICA DE REQUISIÇÃO
// ================================================================

async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        
        // Se a resposta não for OK, pega o erro
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.erro || `Erro HTTP: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('❌ Erro na requisição:', error);
        throw error;
    }
}

// ================================================================
// API - ETIQUETAS
// ================================================================

const EtiquetasAPI = {
    /**
     * Lista todas as etiquetas
     * GET /api/etiquetas/
     */
    listar: () => apiRequest('/etiquetas/'),
    
    /**
     * Busca uma etiqueta por ID
     * GET /api/etiquetas/<id>
     */
    buscar: (id) => apiRequest(`/etiquetas/${id}`),
    
    /**
     * Cria uma nova etiqueta
     * POST /api/etiquetas/
     */
    criar: (dados) => apiRequest('/etiquetas/', 'POST', dados),
    
    /**
     * Atualiza uma etiqueta existente
     * PUT /api/etiquetas/<id>
     */
    atualizar: (id, dados) => apiRequest(`/etiquetas/${id}`, 'PUT', dados),
    
    /**
     * Deleta uma etiqueta
     * DELETE /api/etiquetas/<id>
     */
    deletar: (id) => apiRequest(`/etiquetas/${id}`, 'DELETE')
};

// ================================================================
// API - GA (GRUPO AUTÔNOMO)
// ================================================================

const GAAPI = {
    /**
     * Lista todas as reuniões do GA
     * GET /api/ga/
     */
    listar: () => apiRequest('/ga/'),
    
    /**
     * Busca uma reunião por ID
     * GET /api/ga/<id>
     */
    buscar: (id) => apiRequest(`/ga/${id}`),
    
    /**
     * Cria uma nova reunião
     * POST /api/ga/
     */
    criar: (dados) => apiRequest('/ga/', 'POST', dados),
    
    /**
     * Atualiza uma reunião existente
     * PUT /api/ga/<id>
     */
    atualizar: (id, dados) => apiRequest(`/ga/${id}`, 'PUT', dados),
    
    /**
     * Deleta uma reunião
     * DELETE /api/ga/<id>
     */
    deletar: (id) => apiRequest(`/ga/${id}`, 'DELETE')
};

// ================================================================
// API - MELHORIAS (VER & AGIR / LUP'S)
// ================================================================

const MelhoriasAPI = {
    /**
     * Lista todas as melhorias
     * GET /api/melhorias/
     */
    listar: () => apiRequest('/melhorias/'),
    
    /**
     * Busca uma melhoria por ID
     * GET /api/melhorias/<id>
     */
    buscar: (id) => apiRequest(`/melhorias/${id}`),
    
    /**
     * Cria uma nova melhoria
     * POST /api/melhorias/
     */
    criar: (dados) => apiRequest('/melhorias/', 'POST', dados),
    
    /**
     * Atualiza uma melhoria existente
     * PUT /api/melhorias/<id>
     */
    atualizar: (id, dados) => apiRequest(`/melhorias/${id}`, 'PUT', dados),
    
    /**
     * Deleta uma melhoria
     * DELETE /api/melhorias/<id>
     */
    deletar: (id) => apiRequest(`/melhorias/${id}`, 'DELETE')
};

// ================================================================
// API - QUASE ACIDENTES
// ================================================================

const AcidentesAPI = {
    /**
     * Lista todos os quase acidentes
     * GET /api/acidentes/
     */
    listar: () => apiRequest('/acidentes/'),
    
    /**
     * Busca um quase acidente por ID
     * GET /api/acidentes/<id>
     */
    buscar: (id) => apiRequest(`/acidentes/${id}`),
    
    /**
     * Cria um novo quase acidente
     * POST /api/acidentes/
     */
    criar: (dados) => apiRequest('/acidentes/', 'POST', dados),
    
    /**
     * Atualiza um quase acidente existente
     * PUT /api/acidentes/<id>
     */
    atualizar: (id, dados) => apiRequest(`/acidentes/${id}`, 'PUT', dados),
    
    /**
     * Deleta um quase acidente
     * DELETE /api/acidentes/<id>
     */
    deletar: (id) => apiRequest(`/acidentes/${id}`, 'DELETE')
};

// ================================================================
// FUNÇÃO DE TESTE - VERIFICAR SE O BACKEND ESTÁ RODANDO
// ================================================================

async function testarConexao() {
    try {
        const response = await fetch('http://localhost:5000/health');
        const data = await response.json();
        console.log('✅ Backend conectado:', data);
        return true;
    } catch (error) {
        console.error('❌ Backend offline:', error.message);
        return false;
    }
}

// ================================================================
// EXPORTAR PARA USO GLOBAL
// ================================================================

window.apiRequest = apiRequest;
window.EtiquetasAPI = EtiquetasAPI;
window.GAAPI = GAAPI;
window.MelhoriasAPI = MelhoriasAPI;
window.AcidentesAPI = AcidentesAPI;
window.testarConexao = testarConexao;

console.log('📡 API.js carregado!');
console.log('🔗 Conectando a:', API_URL);