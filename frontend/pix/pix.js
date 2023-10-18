let formPix = document.getElementById("form-pix");
let inputRemetente = document.getElementById("input-remetente");
let inputDestinatario = document.getElementById("input-destinatario");
let inputValor = document.getElementById("input-valor");
let botaoCancelar = document.getElementById("btn-cancelar");

botaoCancelar.addEventListener('click', () => {
   inputRemetente.value = '';
   inputDestinatario.value = '';
   inputValor.value = '';
})

formPix.addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopPropagation();

  let idRemetente = inputRemetente.value;
  let idDestinatario = inputDestinatario.value;
  let valor = inputValor.value;

  await mandarPix(idRemetente, idDestinatario, valor);
});

async function mandarPix( senderId, recipientId, value ) {
  let payload = { senderId, recipientId, value };

   let resposta = await fetch("http://localhost:3000/pix", {
      method: "POST",
      headers: { "Content-type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
   });

   if (resposta.ok) {
      alert("Pix enviado com sucesso!");
      window.location.href = "../home/home.html";
   } else {
      alert('Ops, algo deu errado!');
   }
}
