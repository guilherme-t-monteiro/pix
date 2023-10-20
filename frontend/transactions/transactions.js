let corpoTabela = document.getElementById('corpo-tabela');
let formConsulta = document.getElementById('form-pix');
let inputUsuario = document.getElementById('input-usuario');
let radioRecebido = document.getElementById('radio-recebido');
let radioEnviado = document.getElementById('radio-enviado');
let botaoExibirTodos = document.getElementById('botao-exibir-todos');

preencherSelect();
buscarDados();

botaoExibirTodos.addEventListener('click', (event) => {
   buscarDados();
   inputUsuario.value = 'Usuário';
   radioEnviado.checked = false;
   radioRecebido.checked = false;
});

formConsulta.addEventListener('submit', (event) => {
   event.preventDefault();
   event.stopPropagation();

   let id = inputUsuario.value;

   let tipo;

   if (radioRecebido.checked) {
      tipo = radioRecebido.value;
   } else if (radioEnviado.checked) {
      tipo = radioEnviado.value;
   }

   let consulta = {
      userId: id,
      type: tipo
   };

   buscarDados(consulta);
});

async function buscarDados (consulta) {

   let url = 'http://localhost:3000/pix/';

   if (consulta) {
      url += consulta.userId + '/' + consulta.type;
   }

   let resposta = await fetch(url);
   let dados = await resposta.json();

   while (corpoTabela.firstChild) {
      corpoTabela.removeChild(corpoTabela.firstChild);
   }
   
   for (pix of dados) {
      let tr = document.createElement('tr');

      let id = document.createElement('td');
      let remetente = document.createElement('td');
      let destinatario = document.createElement('td');
      let data = document.createElement('td');
      let valor = document.createElement('td');
      
      id.innerText = pix.id;
      tr.appendChild(id);
      
      remetente.innerText = pix.recipient.name;
      tr.appendChild(remetente);
      
      destinatario.innerText = pix.sender.name;
      tr.appendChild(destinatario);
      
      let dataHora = formatarDataHora(pix.createdAt)
      data.innerText = dataHora;
      tr.appendChild(data);
      
      let numero = parseFloat(pix.value);
      let formatoMoeda = numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      valor.innerText = formatoMoeda;
      tr.appendChild(valor);

      corpoTabela.appendChild(tr);
   }
}

async function preencherSelect () {
   let resposta = await fetch('http://localhost:3000/users');
   let usuarios = await resposta.json();

   for ( usuario of usuarios ) {
      let opcao = document.createElement('option');
      opcao.value = usuario.id;
      opcao.innerText = usuario.name;

      inputUsuario.appendChild(opcao);
   }
}

function formatarDataHora (data) {
   let dataBrt = new Date(data);

   dataBrt.setTime(dataBrt.getTime() - 3 * 60 * 60 * 1000);

   let options = {
   day: '2-digit',
   month: '2-digit',
   year: 'numeric',
   hour: '2-digit',
   minute: '2-digit',
   timeZoneName: 'short',
   timeZone: 'America/Sao_Paulo',
   };

   let formatter = new Intl.DateTimeFormat('pt-BR', options);

   let dataFormatada = formatter.format(dataBrt);
   dataFormatada = dataFormatada.replace(' BRT', '');
   dataFormatada = dataFormatada.replace(',', ' -');
   return dataFormatada;
}