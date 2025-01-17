const API_URL = "http://127.0.0.1:5000";

async function listarClientes() {
    const response = await fetch(`${API_URL}/clientes`);
    const clientes = await response.json();
    const lista = document.getElementById("lista-clientes");
    lista.innerHTML = "";
    clientes.forEach(cliente => {
        const li = document.createElement("li");
        li.textContent = `${cliente.id}: ${cliente.nome} (${cliente.email})`;
        lista.appendChild(li);

    });
}

document.getElementById("form-clientes").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("cliente-id").value;
    const nome = document.getElementById("cliente-nome").value;
    const email = document.getElementById("cliente-email").value;

    await fetch(`${API_URL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: parseInt(id), nome, email }),
    });
    listarClientes();
});

// Funções para lidar com Tarefas
async function listarTarefas() {
    const response = await fetch(`${API_URL}/tarefas`);
    const tarefas = await response.json();
    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = "";
    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.textContent = `${tarefa.id}: ${tarefa.titulo} - ${tarefa.descricao}`;
        lista.appendChild(li);
    });
}

document.getElementById("form-tarefas").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("tarefa-id").value;
    const titulo = document.getElementById("tarefa-titulo").value;
    const descricao = document.getElementById("tarefa-descricao").value;

    await fetch(`${API_URL}/tarefas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: parseInt(id), titulo, descricao, concluida: false }),
    });
    listarTarefas();
});

// Inicializa as listas
listarClientes();
listarTarefas();