from flask import Flask, render_template

app = Flask(__name__)

# =====================================
# Rota principal (Página inicial)
# =====================================
@app.route("/")
def finops():
    return render_template("finops.html")

# =====================================
# Rota de segurança (Página de segurança)
# =====================================
@app.route("/seguranca")
def seguranca():
    """
    Página de segurança para gerenciar configurações.
    """
    return render_template("seguranca.html")

# =====================================
# Rota de usuários (Página para cada usuário)
# =====================================
@app.route("/usuarios/<nome_usuario>")
def usuarios(nome_usuario):
    """
    Página do usuário com o nome passado na URL.
    """
    return render_template("usuarios.html", nome_usuario=nome_usuario)

# =====================================
# Inicializar o servidor
# =====================================
if __name__ == "__main__":
    app.run(debug=True)