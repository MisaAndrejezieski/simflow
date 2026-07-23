from datetime import datetime

from flask import Blueprint, jsonify, request

# Cria o Blueprint com o nome correto
etiquetas_bp = Blueprint('etiquetas', __name__)

# Dados em memória (depois substituir por banco de dados)
etiquetas_db = []
contador_id = 1

# Rota para listar todas as etiquetas
@etiquetas_bp.route('/', methods=['GET'])
def listar_etiquetas():
    return jsonify(etiquetas_db)

# Rota para criar nova etiqueta
@etiquetas_bp.route('/', methods=['POST'])
def criar_etiqueta():
    global contador_id
    
    dados = request.json
    etiqueta = {
        'id': contador_id,
        'titulo': dados.get('titulo', ''),
        'descricao': dados.get('descricao', ''),
        'tipo': dados.get('tipo', 'Azul'),
        'status': 'Aberta',
        'linha': dados.get('linha', ''),
        'responsavel': dados.get('responsavel', ''),
        'via': dados.get('via', ''),
        'observacoes': dados.get('observacoes', ''),
        'data_abertura': datetime.now().isoformat(),
        'data_fechamento': None
    }
    
    etiquetas_db.append(etiqueta)
    contador_id += 1
    
    return jsonify(etiqueta), 201

# Rota para atualizar etiqueta
@etiquetas_bp.route('/<int:id>', methods=['PUT'])
def atualizar_etiqueta(id):
    dados = request.json
    
    for etiqueta in etiquetas_db:
        if etiqueta['id'] == id:
            if 'status' in dados:
                etiqueta['status'] = dados['status']
                if dados['status'] == 'Concluída':
                    etiqueta['data_fechamento'] = datetime.now().isoformat()
            
            if 'observacoes' in dados:
                etiqueta['observacoes'] = dados['observacoes']
            
            return jsonify(etiqueta)
    
    return jsonify({'erro': 'Etiqueta não encontrada'}), 404

# Rota para buscar etiqueta por ID
@etiquetas_bp.route('/<int:id>', methods=['GET'])
def buscar_etiqueta(id):
    for etiqueta in etiquetas_db:
        if etiqueta['id'] == id:
            return jsonify(etiqueta)
    
    return jsonify({'erro': 'Etiqueta não encontrada'}), 404