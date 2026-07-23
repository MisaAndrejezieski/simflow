from database.conexao import db
from datetime import datetime

class Etiqueta(db.Model):
    __tablename__ = 'etiquetas'
    
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    tipo = db.Column(db.String(20), nullable=False)  # 'Vermelha' ou 'Azul'
    status = db.Column(db.String(30), default='Aberta')  # Aberta, Em Análise, Em Execução, Concluída
    linha = db.Column(db.String(50))  # TREPKO, SERAC
    responsavel = db.Column(db.String(100))
    data_abertura = db.Column(db.DateTime, default=datetime.utcnow)
    data_fechamento = db.Column(db.DateTime, nullable=True)
    via = db.Column(db.String(20))  # Controle ou Manutenção (apenas para Vermelhas)
    observacoes = db.Column(db.Text)
    
    def to_json(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'tipo': self.tipo,
            'status': self.status,
            'linha': self.linha,
            'responsavel': self.responsavel,
            'data_abertura': self.data_abertura.isoformat() if self.data_abertura else None,
            'data_fechamento': self.data_fechamento.isoformat() if self.data_fechamento else None,
            'via': self.via,
            'observacoes': self.observacoes
        }