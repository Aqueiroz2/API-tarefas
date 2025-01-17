from flask import Flask, jsonify, request

app = Flask(__name__)

clientes = []
tarefas = []


@app.route('/clientes', methods=['GET'])
def listar_clientes():
    return jsonify(clientes)


@app.route('/clientes', methods=['GET'])
def criar_cliente():
    data = request.get_json()
    if any(c['id'] == data['id'] for c in clientes):
        return jsonify({"error": "ID já existe"})
    clientes.append(data)
    return jsonify(data), 201


@app.route('/clientes/<int:id>', methods=['DELETE'])
def remover_cliente(id):
    global clientes
    clientes = [c for c in clientes if c['id'] != id]
    return jsonify({"message": "Cliente removido"}), 200


@app.route('/tarefas', methods=['GET'])
def listar_tarefas():
    return jsonify(tarefas)


@app.route('/tarefas', methods['POST'])
def criar_tarefa():
    data = request.get_json()
    tarefas.append(data)
    return jsonify(data), 201
