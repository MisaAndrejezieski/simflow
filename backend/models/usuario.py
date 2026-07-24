from datetime import datetime

from database.conexao import db


class Usuario(db.Model):
    __tablename__ = 'usuarios'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    usuario = db.Column(db.String(50), unique=True, nullable=False)
    senha = db.Column(db.String(200), nullable=False)
    perfil = db.Column(db.String(20), nullable=False)  # operador, tecnico, manutentor, gestor
    setor = db.Column(db.String(50))
    ativo = db.Column(db.Boolean, default=True)
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_json(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'usuario': self.usuario,
            'perfil': self.perfil,
            'setor': self.setor,
            'ativo': self.ativo
        }