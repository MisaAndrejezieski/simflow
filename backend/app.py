import os

from database.conexao import init_db
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from routes.acidentes import acidentes_bp
from routes.auth import (auth_bp,  # ← TEM QUE TER ESSA LINHA!
                         criar_usuarios_padrao)
from routes.etiquetas import etiquetas_bp
from routes.ga import ga_bp
from routes.melhorias import melhorias_bp

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///simflow.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

init_db(app)
CORS(app, supports_credentials=True)

@app.route('/health')
def health():
    return jsonify({"status": "online"})

# REGISTRAR ROTAS - TEM QUE TER ISSO!
app.register_blueprint(auth_bp, url_prefix='/api/auth')        # ← ESSA LINHA!
app.register_blueprint(etiquetas_bp, url_prefix='/api/etiquetas')
app.register_blueprint(ga_bp, url_prefix='/api/ga')
app.register_blueprint(melhorias_bp, url_prefix='/api/melhorias')
app.register_blueprint(acidentes_bp, url_prefix='/api/acidentes')

with app.app_context():
    criar_usuarios_padrao()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)