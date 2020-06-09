/*

Projeto:  Teste de JavaScript - Lello
Autor: Marcelo B. Vilas Boas
Data: 09/06/2020

*/

'use strict';

let inputSearch, buttonSearch, panelMembers, panelInfo = null;
let members =[];

window.addEventListener('load', async () => {
  mapDOMElements();
})

function mapDOMElements() {
  inputSearch = document.querySelector('#inputSearch');
  buttonSearch = document.querySelector('#buttonSearch');
  panelMembers = document.querySelector('#panelMembers');
  panelInfo = document.querySelector('#panelInfo');
}