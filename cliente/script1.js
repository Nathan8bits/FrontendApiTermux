const API = "http://localhost:3000";

const tabela = document.getElementById("tabelaUsuarios");

const formulario = document.getElementById("usuarioForm");

const inputId = document.getElementById("usuarioId");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");

const mensagem = document.getElementById("mensagem");

// ===============================
// MENSAGEM
// ===============================

function mostrarMensagem(texto, tipo = "sucesso") {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

// ===============================
// GET /usuarios
// ===============================

async function listarUsuarios() {
  try {
    const resposta = await fetch(`${API}/usuarios`);

    if (!resposta.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    const usuarios = await resposta.json();

    mostrarUsuarios(usuarios);
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

// ===============================
// GET /usuarios/:id
// ===============================

async function buscarUsuario(id) {
  try {
    const resposta = await fetch(`${API}/usuarios/${id}`);

    if (!resposta.ok) {
      throw new Error("Usuário não encontrado");
    }

    const usuario = await resposta.json();

    mostrarUsuarios([usuario]);

    mostrarMensagem(`Usuário ${id} encontrado`);
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

// ===============================
// MOSTRAR NA TABELA
// ===============================

function mostrarUsuarios(usuarios) {
  tabela.innerHTML = "";

  usuarios.forEach((usuario) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `

            <td>
                ${usuario.id}
            </td>

            <td>
                ${usuario.nome}
            </td>

            <td>
                ${usuario.idade}
            </td>

            <td>

                <div class="acoes">

                    <button
                        class="editar"
                        onclick="editarUsuario(${usuario.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="excluir"
                        onclick="deletarUsuario(${usuario.id})"
                    >
                        Excluir
                    </button>

                </div>

            </td>
        `;

    tabela.appendChild(linha);
  });
}

// ===============================
// POST /usuarios
// ===============================

async function criarUsuario(nome, idade) {
  const resposta = await fetch(`${API}/usuarios`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nome: nome,
      idade: idade,
    }),
  });

  if (!resposta.ok) {
    throw new Error("Erro ao criar usuário");
  }

  return await resposta.json();
}

// ===============================
// PUT /usuarios/:id
// ===============================

async function atualizarUsuario(id, nome, idade) {
  const resposta = await fetch(`${API}/usuarios/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nome: nome,
      idade: idade,
    }),
  });

  if (!resposta.ok) {
    throw new Error("Erro ao atualizar usuário");
  }

  return await resposta.json();
}

// ===============================
// FORMULÁRIO
// ===============================

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const id = inputId.value;

  const nome = inputNome.value;

  const idade = Number(inputIdade.value);

  try {
    if (id) {
      await atualizarUsuario(id, nome, idade);

      mostrarMensagem("Usuário atualizado com sucesso!");
    } else {
      await criarUsuario(nome, idade);

      mostrarMensagem("Usuário criado com sucesso!");
    }

    limparFormulario();

    listarUsuarios();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
});

// ===============================
// PREPARAR EDIÇÃO
// ===============================

async function editarUsuario(id) {
  try {
    const resposta = await fetch(`${API}/usuarios/${id}`);

    if (!resposta.ok) {
      throw new Error("Usuário não encontrado");
    }

    const usuario = await resposta.json();

    inputId.value = usuario.id;

    inputNome.value = usuario.nome;

    inputIdade.value = usuario.idade;

    inputNome.focus();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

// ===============================
// DELETE /usuarios/:id
// ===============================

async function deletarUsuario(id) {
  const confirmar = confirm(`Deseja excluir o usuário ${id}?`);

  if (!confirmar) {
    return;
  }

  try {
    const resposta = await fetch(`${API}/usuarios/${id}`, {
      method: "DELETE",
    });

    if (!resposta.ok) {
      throw new Error("Erro ao excluir usuário");
    }

    mostrarMensagem("Usuário excluído com sucesso!");

    listarUsuarios();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

// ===============================
// LIMPAR FORMULÁRIO
// ===============================

function limparFormulario() {
  inputId.value = "";

  inputNome.value = "";

  inputIdade.value = "";
}

// ===============================
// BUSCAR POR ID
// ===============================

document.getElementById("btnBuscar").addEventListener("click", () => {
  const id = document.getElementById("buscarId").value;

  if (!id) {
    mostrarMensagem("Digite um ID.", "erro");

    return;
  }

  buscarUsuario(id);
});

// ===============================
// MOSTRAR TODOS
// ===============================

document.getElementById("btnTodos").addEventListener("click", listarUsuarios);

// ===============================
// CANCELAR
// ===============================

document.getElementById("cancelar").addEventListener("click", limparFormulario);

// ===============================
// INICIALIZAÇÃO
// ===============================

listarUsuarios();
