import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__)
CORS(app)  # Permite frontend consumir API

# Rota de saúde (teste)
@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "online", "mensagem": "SIMFlow API rodando!"})

# Importar e registrar as rotas
try:
    from routes.acidentes import acidentes_bp
    from routes.etiquetas import etiquetas_bp
    from routes.ga import ga_bp
    from routes.melhorias import melhorias_bp
    
    app.register_blueprint(etiquetas_bp, url_prefix='/api/etiquetas')
    app.register_blueprint(ga_bp, url_prefix='/api/ga')
    app.register_blueprint(melhorias_bp, url_prefix='/api/melhorias')
    app.register_blueprint(acidentes_bp, url_prefix='/api/acidentes')
    
    print("✅ Todas as rotas registradas com sucesso!")
    
except ImportError as e:
    print(f"❌ Erro ao importar rotas: {e}")
    print("Verifique se todos os arquivos existem e têm os Blueprints corretos")

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
    