let corpoTabela = document.getElementById('corpo-tabela');
let formConsulta = document.getElementById('form-pix');
let inputRemetente = document.getElementById('input-remetente');
let radioRecebido = document.getElementById('radio-recebido');
let radioEnviado = document.getElementById('radio-enviado');

buscarDados();

formConsulta.addEventListener('submit', (event) => {
   event.preventDefault();
   event.stopPropagation();

   let id = inputRemetente.value;

   let tipo;

   if (radioRecebido.checked) {
      tipo = radioRecebido.value;
   } else {
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

   if (consulta && resposta.ok) {
      while (corpoTabela.firstChild) {
         corpoTabela.removeChild(corpoTabela.firstChild);
      }
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
      
      data.innerText = pix.createdAt;
      tr.appendChild(data);
      
      valor.innerText = pix.value;
      tr.appendChild(valor);

      corpoTabela.appendChild(tr);
   }
}