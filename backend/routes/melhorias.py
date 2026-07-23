from flask import Blueprint, request, jsonify
from datetime import datetime

# Cria o Blueprint com o nome correto
melhorias_bp = Blueprint('melhorias', __name__)

# Rota para listar melhorias (Ver & Agir/LUP'S)
@melhorias_bp.route('/', methods=['GET'])
def listar_melhorias():
    return jsonify([
        {
            'id': 1,
            'titulo': 'Melhoria na solda da linha',
            'descricao': 'Soldagem corrigida na junção',
            'categoria': 'Ver & Agir',
            'data_criacao': datetime.now().isoformat()
        }
    ])

# Rota para criar nova melhoria
@melhorias_bp.route('/', methods=['POST'])
def criar_melhoria():
    dados = request.json
    return jsonify({
        'id': 2,
        'titulo': dados.get('titulo', ''),
        'descricao': dados.get('descricao', ''),
        'categoria': dados.get('categoria', ''),
        'data_criacao': datetime.now().isoformat()
    }), 201