from flask import Blueprint, jsonify, request
from models.melhoria import Melhoria

melhorias_bp = Blueprint('melhorias', __name__)

# Banco em memória
melhorias_db = []
contador_id = 1

# Listar todas as melhorias
@melhorias_bp.route('/', methods=['GET'])
def listar_melhorias():
    return jsonify([m.to_json() for m in melhorias_db])

# Criar nova melhoria
@melhorias_bp.route('/', methods=['POST'])
def criar_melhoria():
    global contador_id
    dados = request.json
    
    melhoria = Melhoria(
        id=contador_id,
        titulo=dados.get('titulo', ''),
        descricao=dados.get('descricao', ''),
        categoria=dados.get('categoria', 'Ver & Agir'),
        imagem_antes=dados.get('imagem_antes'),
        imagem_depois=dados.get('imagem_depois')
    )
    
    melhorias_db.append(melhoria)
    contador_id += 1
    
    return jsonify(melhoria.to_json()), 201

# Buscar melhoria por ID
@melhorias_bp.route('/<int:id>', methods=['GET'])
def buscar_melhoria(id):
    for melhoria in melhorias_db:
        if melhoria.id == id:
            return jsonify(melhoria.to_json())
    return jsonify({'erro': 'Melhoria não encontrada'}), 404

# Atualizar melhoria
@melhorias_bp.route('/<int:id>', methods=['PUT'])
def atualizar_melhoria(id):
    dados = request.json
    for melhoria in melhorias_db:
        if melhoria.id == id:
            if 'titulo' in dados:
                melhoria.titulo = dados['titulo']
            if 'descricao' in dados:
                melhoria.descricao = dados['descricao']
            if 'categoria' in dados:
                melhoria.categoria = dados['categoria']
            if 'imagem_antes' in dados:
                melhoria.imagem_antes = dados['imagem_antes']
            if 'imagem_depois' in dados:
                melhoria.imagem_depois = dados['imagem_depois']
            return jsonify(melhoria.to_json())
    return jsonify({'erro': 'Melhoria não encontrada'}), 404

# Deletar melhoria
@melhorias_bp.route('/<int:id>', methods=['DELETE'])
def deletar_melhoria(id):
    global melhorias_db
    melhorias_db = [m for m in melhorias_db if m.id != id]
    return jsonify({'mensagem': 'Melhoria deletada com sucesso'}), 200