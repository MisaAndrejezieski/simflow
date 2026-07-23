from datetime import datetime

from flask import Blueprint, jsonify, request
from models.reuniao_ga import ReuniaoGA

ga_bp = Blueprint('ga', __name__)

# Banco em memória
reunioes_db = []
contador_id = 1

# Listar todas as reuniões
@ga_bp.route('/', methods=['GET'])
def listar_reunioes():
    return jsonify([r.to_json() for r in reunioes_db])

# Criar nova reunião
@ga_bp.route('/', methods=['POST'])
def criar_reuniao():
    global contador_id
    dados = request.json
    
    reuniao = ReuniaoGA(
        id=contador_id,
        data=dados.get('data', datetime.now().strftime('%Y-%m-%d')),
        pauta=dados.get('pauta', ''),
        participantes=dados.get('participantes', ''),
        decisoes=dados.get('decisoes', ''),
        acoes_geradas=dados.get('acoes_geradas', 0)
    )
    
    reunioes_db.append(reuniao)
    contador_id += 1
    
    return jsonify(reuniao.to_json()), 201

# Buscar reunião por ID
@ga_bp.route('/<int:id>', methods=['GET'])
def buscar_reuniao(id):
    for reuniao in reunioes_db:
        if reuniao.id == id:
            return jsonify(reuniao.to_json())
    return jsonify({'erro': 'Reunião não encontrada'}), 404

# Atualizar reunião
@ga_bp.route('/<int:id>', methods=['PUT'])
def atualizar_reuniao(id):
    dados = request.json
    for reuniao in reunioes_db:
        if reuniao.id == id:
            if 'data' in dados:
                reuniao.data = dados['data']
            if 'pauta' in dados:
                reuniao.pauta = dados['pauta']
            if 'participantes' in dados:
                reuniao.participantes = dados['participantes']
            if 'decisoes' in dados:
                reuniao.decisoes = dados['decisoes']
            if 'acoes_geradas' in dados:
                reuniao.acoes_geradas = dados['acoes_geradas']
            return jsonify(reuniao.to_json())
    return jsonify({'erro': 'Reunião não encontrada'}), 404

# Deletar reunião
@ga_bp.route('/<int:id>', methods=['DELETE'])
def deletar_reuniao(id):
    global reunioes_db
    reunioes_db = [r for r in reunioes_db if r.id != id]
    return jsonify({'mensagem': 'Reunião deletada com sucesso'}), 200