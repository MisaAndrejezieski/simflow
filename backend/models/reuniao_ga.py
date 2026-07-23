from datetime import datetime


class ReuniaoGA:
    def __init__(self, id, data, pauta, participantes, decisoes, acoes_geradas=0):
        self.id = id
        self.data = data
        self.pauta = pauta
        self.participantes = participantes
        self.decisoes = decisoes
        self.acoes_geradas = acoes_geradas
        self.criado_em = datetime.now().isoformat()
    
    def to_json(self):
        return {
            'id': self.id,
            'data': self.data,
            'pauta': self.pauta,
            'participantes': self.participantes,
            'decisoes': self.decisoes,
            'acoes_geradas': self.acoes_geradas,
            'criado_em': self.criado_em
        }