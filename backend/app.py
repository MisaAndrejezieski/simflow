import os

from database.conexao import db, init_db
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from routes.acidentes import acidentes_bp
from routes.auth import auth_bp, criar_usuarios_padrao
from routes.etiquetas import etiquetas_bp
from routes.ga import ga_bp
from routes.melhorias import melhorias_bp

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///simflow.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar banco de dados
init_db(app)

# CORS para permitir frontend
CORS(app, supports_credentials=True)

# ================================================================
# REGISTRAR ROTAS
# ================================================================

# Rota de saúde (teste)
@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "online", "mensagem": "SIMFlow API rodando!"})

# Registrar Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')      # 🔥 NOVO!
app.register_blueprint(etiquetas_bp, url_prefix='/api/etiquetas')
app.register_blueprint(ga_bp, url_prefix='/api/ga')
app.register_blueprint(melhorias_bp, url_prefix='/api/melhorias')
app.register_blueprint(acidentes_bp, url_prefix='/api/acidentes')

# ================================================================
# CRIAR USUÁRIOS PADRÃO (se não existirem)
# ================================================================
with app.app_context():
    criar_usuarios_padrao()

# ================================================================
# INICIAR SERVIDOR
# ================================================================
if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)