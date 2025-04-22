// Captura os elementos
const botaoGravidez = document.getElementById("acionar-gravidez");
const modal = document.getElementById("modal-gravidez");
const closeBtn = document.querySelector(".close");
const confirmarBtn = document.getElementById("confirmar-gravidez");

// Abre o modal ao clicar no botão
botaoGravidez.addEventListener("click", () => {
    modal.style.display = "flex"; // Mostra o modal
});

// Fecha o modal ao clicar no "X"
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fecha o modal ao clicar no botão "Confirmar"
confirmarBtn.addEventListener("click", () => {
    modal.style.display = "none";
    alert("Modo gravidez ativado com sucesso!"); // Feedback opcional
});

// Fecha o modal se clicar fora dele
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

//denuncia
const nameInput = document.getElementById('name');
const birthdayInput = document.getElementById('date');
const idUser = localStorage.getItem('idUser');

async function fetchUserDetails(id) {
    try {
        const response = await fetch(`http://localhost:3333/user/email/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta: ${response.status}`);
        }

        const data = await response.json();
        nameInput.value = data.nome || "Nome Indefinido";
        birthdayInput.value = data.data_nasc || "";
    } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
    }
}

async function updateUserBirthday(id, birthday) {
    try {
        const response = await fetch(`http://localhost:3333/birthday/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data_nasc: birthday }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar a data de nascimento: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data de nascimento atualizada com sucesso:', data);
        alert('Data de nascimento atualizada com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar a data de nascimento do usuário:', error);
    }
}

async function updateUserName(id, name) {
    try {
        const response = await fetch(`http://localhost:3333/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: name }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar o nome: ${response.status}`);
        }

        const data = await response.json();
        console.log('Nome atualizado com sucesso:', data);
        alert('Nome atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar o nome do usuário:', error);
    }
}

document.getElementById('salvar').addEventListener('click', function () {
    const newBirthday = birthdayInput.value.trim();
    const newName = nameInput.value.trim();
    const id = localStorage.getItem('idUser');

    if (newBirthday) {
        updateUserBirthday(id, newBirthday);
    } else {
        console.warn('A data de nascimento não pode ser vazia.');
    }

    if (newName) {
        updateUserName(id, newName);
    } else {
        console.warn('O nome não pode ser vazio.');
    }
});

document.getElementById('denuncia-button').addEventListener('click', function () {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    const closeBtn = document.querySelector('.close');
    closeBtn.onclick = function () {
        popup.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (idUser) {
        fetchUserDetails(idUser);
    }
});

//dark mode

// Modo Noturno
const modoNoturnoBtn = document.querySelector('.modo-noturno');
const indicador = document.querySelector('.indicador');
const body = document.body;

// Verifica se o modo noturno estava ativo
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    modoNoturnoBtn.classList.add('ativo');
}

// Adiciona o evento de clique
modoNoturnoBtn.addEventListener('click', function() {
    // Alterna o modo
    const isDark = body.classList.toggle('dark-mode');
    
    // Atualiza o botão
    modoNoturnoBtn.classList.toggle('ativo', isDark);
    
    // Salva a preferência
    localStorage.setItem('darkMode', isDark);
});

// Adicione também o CSS para o modo dark (se ainda não tiver)
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .dark-mode {
            --fundo: #43393D;
            --botoes: #D9D9D9;
            --botoes-hover: #c9c4c8;
            --botao-gravidez: #E3C3D8;
            --botao-gravidez-hover:rgb(250, 216, 238);
            --botao-confirmacao: #333;
            --botao-confirmacao-hover: #444;
            color: #fff;
        }
        .dark-mode header {
            background-color: #1a1a1a;
            border-bottom: 1px solid #444;
        }
        .dark-mode h1 {
            border-bottom-color: #fff;
        }
        .dark-mode .footer {
            background-color: #333;
            color: #fff;
        }
        /* Adicione outros estilos necessários para o modo escuro */
    </style>
`);