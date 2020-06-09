/*

Projeto:  Teste de JavaScript - Lello
Autor: Marcelo B. Vilas Boas
Data: 09/06/2020

*/

'use strict';

let inputSearch,
  buttonSearch,
  panelMembers,
  panelInfo = null;
let members = [];

const baseAPI_URL = 'https://api.github.com';

window.addEventListener('load', async () => {
  mapDOMElements();
  await getAllAngularembers();
});

function mapDOMElements() {
  inputSearch = document.querySelector('#inputSearch');
  buttonSearch = document.querySelector('#buttonSearch');
  panelMembers = document.querySelector('#panelMembers');
  panelInfo = document.querySelector('#panelInfo');
}

//Método para busca de membros Angular do GitHub utilizando Promise
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
