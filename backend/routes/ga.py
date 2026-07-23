from datetime import datetime

from flask import Blueprint, jsonify, request

# Cria o Blueprint com o nome correto
ga_bp = Blueprint('ga', __name__)

# Rota para listar reuniões do GA
@ga_bp.route('/', methods=['GET'])
def listar_ga():
    return jsonify([
        {
            'id': 1,
            'data': '2026-08-15',
            'pauta': 'Revisão do CIP da máquina',
            'participantes': 'Operadores, Manutenção',
            'decisoes': 'Implementar novo checklist',
            'acoes_geradas': 3
        }
    ])

# Rota para criar nova reunião GA
@ga_bp.route('/', methods=['POST'])
def criar_ga():
    dados = request.json
    return jsonify({
        'id': 2,
        'data': dados.get('data', datetime.now().isoformat()),
        'pauta': dados.get('pauta', ''),
        'participantes': dados.get('participantes', ''),
        'decisoes': dados.get('decisoes', ''),
        'acoes_geradas': 0
    }), 201