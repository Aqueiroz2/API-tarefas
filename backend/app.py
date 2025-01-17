from flask import Flask, request, jsonify
import logging

app = Flask(__name__)

# Configuração de logging
logging.basicConfig(
    filename='app.log',
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Lista para armazenar clientes e tarefas
clientes = []
tarefas = []

# Rota para adicionar clientes


@app.route('/clientes', methods=['POST'])
def adicionar_cliente():
    data = request.get_json()
    try:
        # Verificar duplicidade
        if any(cliente['id'] == data['id'] for cliente in clientes):
            mensagem = f"Erro: Cliente com ID {data['id']} já existe."
            logging.warning(mensagem)
            return jsonify({"error": mensagem}), 400

        # Adicionar cliente
        clientes.append(data)
        logging.info(f"Cliente adicionado com sucesso: {data}")
        return jsonify({"message": "Cliente adicionado com sucesso"}), 201
    except Exception as e:
        logging.error(f"Erro ao adicionar cliente: {e}", exc_info=True)
        return jsonify({"error": "Erro ao adicionar cliente"}), 500

# Rota para obter todos os clientes


@app.route('/clientes', methods=['GET'])
def listar_clientes():
    logging.info("Clientes listados com sucesso.")
    return jsonify(clientes)

# Rota para adicionar tarefas


@app.route('/tarefas', methods=['POST'])
def adicionar_tarefa():
    data = request.get_json()
    try:
        # Verificar duplicidade
        if any(tarefa['id'] == data['id'] for tarefa in tarefas):
            mensagem = f"Erro: Tarefa com ID {data['id']} já existe."
            logging.warning(mensagem)
            return jsonify({"error": mensagem}), 400

        # Adicionar tarefa
        tarefas.append(data)
        logging.info(f"Tarefa adicionada com sucesso: {data}")
        return jsonify({"message": "Tarefa adicionada com sucesso"}), 201
    except Exception as e:
        logging.error(f"Erro ao adicionar tarefa: {e}", exc_info=True)
        return jsonify({"error": "Erro ao adicionar tarefa"}), 500

# Rota para obter todas as tarefas


@app.route('/tarefas', methods=['GET'])
def listar_tarefas():
    logging.info("Tarefas listadas com sucesso.")
    return jsonify(tarefas)


if __name__ == '__main__':
    logging.info("Aplicação iniciada")
    app.run(debug=True)
