const API_URL = "http://127.0.0.1:5000";

// Exibir mensagem de feedback
function exibirMensagem(elemento, mensagem, tipo) {
    elemento.textContent = mensagem;
    elemento.style.color = tipo === "sucesso" ? "green" : "red";
    setTimeout(() => (elemento.textContent = ""), 3000);
}

// Atualizar a tabela de clientes
async function listarClientes() {
    const tabelaClientes = document.getElementById("tabela-clientes").querySelector("tbody");
    tabelaClientes.innerHTML = ""; // Limpar a tabela antes de preencher novamente

    try {
        const response = await fetch(`${API_URL}/clientes`);
        if (!response.ok) throw new Error(`Erro ao listar clientes: ${response.statusText}`);

        const clientes = await response.json();
        clientes.forEach(cliente => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
            `;
            tabelaClientes.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
    }
}

// Atualizar a tabela de tarefas
async function listarTarefas() {
    const tabelaTarefas = document.getElementById("tabela-tarefas").querySelector("tbody");
    tabelaTarefas.innerHTML = ""; // Limpar a tabela antes de preencher novamente

    try {
        const response = await fetch(`${API_URL}/tarefas`);
        if (!response.ok) throw new Error(`Erro ao listar tarefas: ${response.statusText}`);

        const tarefas = await response.json();
        tarefas.forEach(tarefa => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${tarefa.id}</td>
                <td>${tarefa.titulo}</td>
                <td>${tarefa.descricao}</td>
            `;
            tabelaTarefas.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao listar tarefas:", error);
    }
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

        const result = await response.json();

        if (response.ok) {
            exibirMensagem(mensagemClientes, result.message, "sucesso");
            listarClientes();
        } else {
            exibirMensagem(mensagemClientes, result.error, "erro");
        }
    } catch (error) {
        console.error("Erro ao adicionar cliente:", error);
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

        const result = await response.json();

        if (response.ok) {
            exibirMensagem(mensagemTarefas, result.message, "sucesso");
            listarTarefas();
        } else {
            exibirMensagem(mensagemTarefas, result.error, "erro");
        }
    } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
        exibirMensagem(mensagemTarefas, "Erro ao conectar ao servidor.", "erro");
    }
});

// Carregar dados ao iniciar
listarClientes();
listarTarefas();
