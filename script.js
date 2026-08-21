const inputUrl = document.querySelector("#inputUrl");
const btnUrl = document.querySelector("#btnUrl");

const numeroUsuario = document.getElementById("idUsuario");
const btnGet = document.getElementById("btnGet");
const btnGetTodos = document.getElementById("btnGetTodos");
const content = document.getElementById("context");
const consoleHtml = document.getElementById("console");
const listaUsuarios = document.querySelector("#listaUsuarios");

const btnPost = document.querySelector("#btnPost");
const nome = document.querySelector("#nome");
const idade = document.querySelector("#idade");

const btnUpdate = document.querySelector("#btnUpdate");

//const URL = "http://localhost:3000/usuarios";

let URL = "http://localhost:3000/usuarios";

const fetchApi = (value) => {
  const result = fetch(`${URL}${value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return result;
};

const postApi = (dados) => {
  const result = fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return result;
};

const updateApi = (value, dados) => {
  const result = fetch(`${URL}${value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return result;
};

const deleteApi = (value) => {
  const result = fetch(`${URL}${value}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return result;
};

btnGet.addEventListener("click", async (event) => {
  event.preventDefault();
  GetUsuariosId(numeroUsuario.value);
});

btnGetTodos.addEventListener("click", async (event) => {
  event.preventDefault();
  GetTodos();
});

btnPost.addEventListener("click", async (event) => {
  event.preventDefault();

  const dados = {
    nome: nome.value,
    idade: idade.value,
  };

  PostUsuario(dados);
});

btnUrl.addEventListener("click", () => {
  URL = `${inputUrl.value}/usuarios`;
  content.textContent = inputUrl.value;
})

const render = (lista) => {
  listaUsuarios.innerHTML = "";

  lista.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `nome: ${item.nome}, idade: ${item.idade}`;
    listaUsuarios.appendChild(li);
  });
};

const GetTodos = async () => {
  consoleHtml.textContent = URL;

  const result = await fetchApi("");
  content.textContent = `${JSON.stringify(result, undefined, 2)}`;
  render(result);
};

const GetUsuariosId = async (value) => {
  consoleHtml.textContent = `${URL}/${value}`;

  const result = await fetchApi(`/${value}`);
  content.textContent = `${JSON.stringify(result, undefined, 2)}`;

  render(result);
};

const PostUsuario = async (dados) => {
  const result = await postApi(dados);

  content.textContent = JSON.stringify(result, undefined, 2);
  render(result);
};

const UpdateUsuario = async (value) => {
  consoleHtml.textContent = `${URL}/${value}`;

  const dados = {
    nome: nomeUsuario.value,
    idade: idadeUsuario.value,
  };

  const result = await updateApi(`/${value}`, dados);

  content.textContent = JSON.stringify(result, undefined, 2);
};

const DeleteUsuario = async (value) => {
  consoleHtml.textContent = `${URL}/${value}`;

  const result = await deleteApi(`/${value}`);

  content.textContent = JSON.stringify(result, undefined, 2);
};
