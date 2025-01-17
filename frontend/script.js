const API_URL = "http://127.0.0.1:5000";

// Função para exibir mensagens de feedback
function exibirMensagem(elemento, mensagem, tipo) {
    elemento.textContent = mensagem;
    elemento.style.color = tipo === "sucesso" ? "green" : "red";
    setTimeout(() => (elemento.textContent = ""), 3000); // Limpa a mensagem após 3 segundos
}

// Função para listar clientes
async function listarClientes() {
    const response = await fetch(`${API_URL}/clientes`);
    const clientes = await response.json();
    const listaClientes = document.getElementById("lista-clientes");
    listaClientes.innerHTML = "";

    clientes.forEach(cliente => {
        const li = document.createElement("li");
        li.textContent = `ID: ${cliente.id}, Nome: ${cliente.nome}, Email: ${cliente.email}`;
        listaClientes.appendChild(li);
    });
}

// Função para listar tarefas
async function listarTarefas() {
    const response = await fetch(`${API_URL}/tarefas`);
    const tarefas = await response.json();
    const listaTarefas = document.getElementById("lista-tarefas");
    listaTarefas.innerHTML = "";

    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.textContent = `ID: ${tarefa.id}, Título: ${tarefa.titulo}, Descrição: ${tarefa.descricao}`;
        listaTarefas.appendChild(li);
    });
}

// Adicionar Cliente
document.getElementById("form-clientes").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("cliente-id").value;
    const nome = document.getElementById("cliente-nome").value;
    const email = document.getElementById("cliente-email").value;
    const mensagemClientes = document.getElementById("mensagem-clientes");

    try {
        const response = await fetch(`${API_URL}/clientes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: parseInt(id), nome, email }),
        });

        if (response.ok) {
            exibirMensagem(mensagemClientes, "Cliente cadastrado com sucesso!", "sucesso");
            listarClientes(); // Atualiza a lista de clientes
        } else {
            const error = await response.json();
            exibirMensagem(mensagemClientes, `Erro: ${error.error}`, "erro");
        }
    } catch (err) {
        exibirMensagem(mensagemClientes, "Erro ao cadastrar cliente.", "erro");
    }
});

// Adicionar Tarefa
document.getElementById("form-tarefas").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("tarefa-id").value;
    const titulo = document.getElementById("tarefa-titulo").value;
    const descricao = document.getElementById("tarefa-descricao").value;
    const mensagemTarefas = document.getElementById("mensagem-tarefas");

    try {
        const response = await fetch(`${API_URL}/tarefas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: parseInt(id), titulo, descricao }),
        });

        if (response.ok) {
            exibirMensagem(mensagemTarefas, "Tarefa cadastrada com sucesso!", "sucesso");
            listarTarefas(); // Atualiza a lista de tarefas
        } else {
            exibirMensagem(mensagemTarefas, "Erro ao cadastrar tarefa.", "erro");
        }
    } catch (err) {
        exibirMensagem(mensagemTarefas, "Erro ao cadastrar tarefa.", "erro");
    }
});

// Inicializa as listas
listarClientes();
listarTarefas();
