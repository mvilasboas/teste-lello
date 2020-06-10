/*

Projeto:  Teste de JavaScript - Lello
Autor: Marcelo B. Vilas Boas
Data: 09/06/2020

*/

'use strict';

let inputSearch,
  buttonSearch,
  panelMembers,
  panelInfo,
  divSpinner,
  divHidden = null;
let members = [];

const baseAPI_URL = 'https://api.github.com';

window.addEventListener('load', async () => {
  mapDOMElements();
  await getAllAngularembers();
  keyupEvent();
  buttonEvent();
  showSearch();
});

function mapDOMElements() {
  inputSearch = document.querySelector('#inputSearch');
  buttonSearch = document.querySelector('#buttonSearch');
  panelMembers = document.querySelector('#panelMembers');
  panelInfo = document.querySelector('#panelInfo');
  divSpinner = document.querySelector("#spinner");
  divHidden = document.querySelector("#hidden");
}

/* 
Método para busca de membros Angular do GitHub utilizando Promise
Params: none;
Return: array de membros mapeados
*/
async function getAllAngularembers() {
  await fetch(`${baseAPI_URL}/orgs/angular/public_members`)
    .then((res) => {
      res.json().then((data) => {
        members = data
          .map(({ id, login, avatar_url, url }) => {
            return {
              id: id,
              login: login,
              avatar: avatar_url,
              info: url,
            };
          })
          .sort((a, b) => {
            return a.login.localeCompare(b.login);
          });
        renderMembersPanel(members);
      });
    })
    .catch(function (error) {
      console.error(
        `Falha na requisição de getAllAngularMembers() : ${error.message}`
      );
    });
}

function renderMembersPanel(members) {
  panelMembers.innerHTML = '';

  const h5 = document.createElement('h5');
  h5.textContent = `${members.length} membro(s) encontrado(s)`;

  const ul = document.createElement('ul');

  members.forEach((member) => {
    const li = document.createElement('li');
    li.innerHTML = `<div class="flex-row clickable" onclick='getMemberInfo("${member.login}")'>
                      <img src="${member.avatar}" alt="${member.login} avatar"/>${member.login}
                    </div>`;

    ul.appendChild(li);
  });

  panelMembers.appendChild(h5);
  panelMembers.appendChild(ul);
}

/* 
Método para busca de membro Angular do GitHub utilizando async/await
Params: login;
Return: array de informações do membro
*/
async function getMemberInfo(member) {
  try {
    const res = await fetch(`${baseAPI_URL}/users/${member}`);
    renderInfoPanel(await res.json())
  } catch (error) {
    console.error(`Falha na requisição de getMemberInfo(): ${error.message}`);
  }
}

function renderInfoPanel(info) {
  const {name, public_repos, followers, created_at} = info;

  let signupDate = new Date(created_at);
  signupDate = new Intl.DateTimeFormat('pt-BR').format(signupDate);

  panelInfo.innerHTML = `
  <h5>Informações</h5>
  <ul>
    <li>Nome do membro: <span class="bold">${name || null ? name : 'Não informado'}</span></li>
    <li>Quantidade de repositórios: <span class="bold">${public_repos}</span></li>
    <li>Quantidade de seguidores: <span class="bold">${followers}</span></li>
    <li>Data de entrada GitHub: <span class="bold">${signupDate}</span></li>
  </ul>
  `;
}

function buttonEvent() {
  buttonSearch.addEventListener('click', () => {
    const typedLogin = inputSearch.value;

    filterMembers(typedLogin);
  });
}

//Valida se há dado inputado para filtrar através da ação da tecla 'Enter'
function keyupEvent() {
  inputSearch.addEventListener('keyup', (event) => {
    const currentKey = event.key;
    const typedLogin = event.target.value;

    if (currentKey !== 'Enter') return;

    filterMembers(typedLogin);
  })
}

//Valida se há dado inputado para filtrar busca através do botão de busca
function filterMembers(typedLogin) {
  if (typedLogin.trim() == '') {
    getAllAngularembers();
  }

  let filteredMembers = members.filter((member) => {
    return member.login.toLowerCase().includes(typedLogin.toLowerCase());
  }) ;

  renderMembersPanel(filteredMembers);
}

function showSearch() {
  setTimeout(() => {
    divSpinner.classList.add('hidden');
    divHidden.classList.remove('hidden');
  }, 2000);
}