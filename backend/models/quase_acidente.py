from datetime import datetime


class QuaseAcidente:
    def __init__(self, id, descricao, local, responsavel, status='Reportado'):
        self.id = id
        self.descricao = descricao
        self.local = local
        self.responsavel = responsavel
        self.status = status  # Reportado, Em Análise, Resolvido
        self.data = datetime.now().isoformat()
    
    def to_json(self):
        return {
            'id': self.id,
            'descricao': self.descricao,
            'local': self.local,
            'responsavel': self.responsavel,
            'status': self.status,
            'data': self.data
        }