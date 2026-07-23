from datetime import datetime

from database.conexao import db
from flask import Blueprint, jsonify, request
from models.etiqueta import Etiqueta

etiquetas_bp = Blueprint('etiquetas', __name__)

# Listar todas as etiquetas
@etiquetas_bp.route('/', methods=['GET'])
def listar():
    etiquetas = Etiqueta.query.order_by(Etiqueta.data_abertura.desc()).all()
    return jsonify([e.to_json() for e in etiquetas])

# Criar nova etiqueta
@etiquetas_bp.route('/', methods=['POST'])
def criar():
    dados = request.json
    
    etiqueta = Etiqueta(
        titulo=dados.get('titulo'),
        descricao=dados.get('descricao'),
        tipo=dados.get('tipo'),
        linha=dados.get('linha'),
        responsavel=dados.get('responsavel'),
        via=dados.get('via'),
        observacoes=dados.get('observacoes')
    )
    
    db.session.add(etiqueta)
    db.session.commit()
    
    return jsonify(etiqueta.to_json()), 201

# Atualizar status
@etiquetas_bp.route('/<int:id>', methods=['PUT'])
def atualizar(id):
    etiqueta = Etiqueta.query.get_or_404(id)
    dados = request.json
    
    if 'status' in dados:
        etiqueta.status = dados['status']
        if dados['status'] == 'Concluída':
            etiqueta.data_fechamento = datetime.utcnow()
    
    if 'observacoes' in dados:
        etiqueta.observacoes = dados['observacoes']
    
    db.session.commit()
    return jsonify(etiqueta.to_json())