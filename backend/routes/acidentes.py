from flask import Blueprint, jsonify, request
from models.quase_acidente import QuaseAcidente

acidentes_bp = Blueprint('acidentes', __name__)

# Banco em memória
acidentes_db = []
contador_id = 1

# Listar todos os quase acidentes
@acidentes_bp.route('/', methods=['GET'])
def listar_acidentes():
    return jsonify([a.to_json() for a in acidentes_db])

# Criar novo quase acidente
@acidentes_bp.route('/', methods=['POST'])
def criar_acidente():
    global contador_id
    dados = request.json
    
    acidente = QuaseAcidente(
        id=contador_id,
        descricao=dados.get('descricao', ''),
        local=dados.get('local', ''),
        responsavel=dados.get('responsavel', ''),
        status=dados.get('status', 'Reportado')
    )
    
    acidentes_db.append(acidente)
    contador_id += 1
    
    return jsonify(acidente.to_json()), 201

# Buscar quase acidente por ID
@acidentes_bp.route('/<int:id>', methods=['GET'])
def buscar_acidente(id):
    for acidente in acidentes_db:
        if acidente.id == id:
            return jsonify(acidente.to_json())
    return jsonify({'erro': 'Quase acidente não encontrado'}), 404

# Atualizar quase acidente
@acidentes_bp.route('/<int:id>', methods=['PUT'])
def atualizar_acidente(id):
    dados = request.json
    for acidente in acidentes_db:
        if acidente.id == id:
            if 'descricao' in dados:
                acidente.descricao = dados['descricao']
            if 'local' in dados:
                acidente.local = dados['local']
            if 'responsavel' in dados:
                acidente.responsavel = dados['responsavel']
            if 'status' in dados:
                acidente.status = dados['status']
            return jsonify(acidente.to_json())
    return jsonify({'erro': 'Quase acidente não encontrado'}), 404

# Deletar quase acidente
@acidentes_bp.route('/<int:id>', methods=['DELETE'])
def deletar_acidente(id):
    global acidentes_db
    acidentes_db = [a for a in acidentes_db if a.id != id]
    return jsonify({'mensagem': 'Quase acidente deletado com sucesso'}), 200