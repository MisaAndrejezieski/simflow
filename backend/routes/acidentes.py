from flask import Blueprint, request, jsonify
from datetime import datetime

# Cria o Blueprint com o nome correto
acidentes_bp = Blueprint('acidentes', __name__)

# Rota para listar quase acidentes
@acidentes_bp.route('/', methods=['GET'])
def listar_acidentes():
    return jsonify([
        {
            'id': 1,
            'descricao': 'Queda de caixa de pudim',
            'data': datetime.now().isoformat(),
            'local': 'Linha TREPKO',
            'status': 'Reportado'
        }
    ])

# Rota para criar novo quase acidente
@acidentes_bp.route('/', methods=['POST'])
def criar_acidente():
    dados = request.json
    return jsonify({
        'id': 2,
        'descricao': dados.get('descricao', ''),
        'data': datetime.now().isoformat(),
        'status': 'Reportado'
    }), 201