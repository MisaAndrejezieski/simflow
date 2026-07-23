from datetime import datetime

class Melhoria:
    def __init__(self, id, titulo, descricao, categoria, imagem_antes=None, imagem_depois=None):
        self.id = id
        self.titulo = titulo
        self.descricao = descricao
        self.categoria = categoria  # 'Ver & Agir' ou 'LUP'
        self.imagem_antes = imagem_antes
        self.imagem_depois = imagem_depois
        self.data_criacao = datetime.now().isoformat()
    
    def to_json(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'categoria': self.categoria,
            'imagem_antes': self.imagem_antes,
            'imagem_depois': self.imagem_depois,
            'data_criacao': self.data_criacao
        }