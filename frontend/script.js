const API_URL = "http://127.0.0.1:5000";

// Exibir mensagem de feedback
function exibirMensagem(elemento, mensagem, tipo) {
    elemento.textContent = mensagem;
    elemento.style.color = tipo === "sucesso" ? "green" : "red";
    setTimeout(() => (elemento.textContent = ""), 3000);
}

// Exibir mensagem de erro no console
function exibirMensagemErro(mensagem) {
    console.error(mensagem);
}

// Atualizar a tabela de clientes
async function listarClientes() {
    const response = await fetch(`${API_URL}/clientes`);
    const clientes = await response.json();

    const tabelaClientes = document.getElementById("tabela-clientes").querySelector("tbody");
    tabelaClientes.innerHTML = "";

    clientes.forEach(cliente => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
        `;
        tabelaClientes.appendChild(row);
    });
}

// Atualizar a tabela de tarefas
async function listarTarefas() {
    const response = await fetch(`${API_URL}/tarefas`);
    const tarefas = await response.json();

    const tabelaTarefas = document.getElementById("tabela-tarefas").querySelector("tbody");
    tabelaTarefas.innerHTML = "";

    tarefas.forEach(tarefa => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tarefa.id}</td>
            <td>${tarefa.titulo}</td>
            <td>${tarefa.descricao}</td>
        `;
        tabelaTarefas.appendChild(row);
    });
}

// Adicionar cliente
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
            listarClientes();
        } else {
            const error = await response.json();
            exibirMensagemErro(`Erro no backend: ${error.error}`);
            exibirMensagem(mensagemClientes, `Erro: ${error.error}`, "erro");
        }
    } catch (err) {
        exibirMensagemErro(`Erro ao conectar ao servidor: ${err}`);
        exibirMensagem(mensagemClientes, "Erro ao conectar ao servidor.", "erro");
    }
});

// Adicionar tarefa
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
            listarTarefas();
        } else {
            const error = await response.json();
            exibirMensagemErro(`Erro no backend: ${error.error}`);
            exibirMensagem(mensagemTarefas, `Erro: ${error.error}`, "erro");
        }
    } catch (err) {
        exibirMensagemErro(`Erro ao conectar ao servidor: ${err}`);
        exibirMensagem(mensagemTarefas, "Erro ao conectar ao servidor.", "erro");
    }
});

// Carregar dados ao iniciar
listarClientes();
listarTarefas();
