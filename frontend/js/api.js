// Configuração da API
const API_URL = 'http://localhost:5000/api';

// Função genérica para requisições
async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

// ============================================
// API - ETIQUETAS
// ============================================
const EtiquetasAPI = {
    listar: () => apiRequest('/etiquetas/'),
    criar: (dados) => apiRequest('/etiquetas/', 'POST', dados),
    atualizar: (id, dados) => apiRequest(`/etiquetas/${id}`, 'PUT', dados),
    buscar: (id) => apiRequest(`/etiquetas/${id}`),
};

// ============================================
// API - GA (Grupo Autônomo)
// ============================================
const GAAPI = {
    listar: () => apiRequest('/ga/'),
    criar: (dados) => apiRequest('/ga/', 'POST', dados),
    atualizar: (id, dados) => apiRequest(`/ga/${id}`, 'PUT', dados),
    deletar: (id) => apiRequest(`/ga/${id}`, 'DELETE'),
    buscar: (id) => apiRequest(`/ga/${id}`),
};

// ============================================
// API - MELHORIAS (Ver & Agir / LUP'S)
// ============================================
const MelhoriasAPI = {
    listar: () => apiRequest('/melhorias/'),
    criar: (dados) => apiRequest('/melhorias/', 'POST', dados),
    atualizar: (id, dados) => apiRequest(`/melhorias/${id}`, 'PUT', dados),
    deletar: (id) => apiRequest(`/melhorias/${id}`, 'DELETE'),
    buscar: (id) => apiRequest(`/melhorias/${id}`),
};

// ============================================
// API - QUASE ACIDENTES
// ============================================
const AcidentesAPI = {
    listar: () => apiRequest('/acidentes/'),
    criar: (dados) => apiRequest('/acidentes/', 'POST', dados),
    atualizar: (id, dados) => apiRequest(`/acidentes/${id}`, 'PUT', dados),
    deletar: (id) => apiRequest(`/acidentes/${id}`, 'DELETE'),
    buscar: (id) => apiRequest(`/acidentes/${id}`),
};