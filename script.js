// Inicializa EmailJS
(function() { emailjs.init("SEU_USER_ID"); })();

// Título digitando
const titulo = "Um Pedido Muito Especial... 💖";
let i = 0;
function digitarTitulo() {
  if (i < titulo.length) {
    document.getElementById("titulo").innerHTML += titulo.charAt(i);
    i++;
    setTimeout(digitarTitulo, 100);
  }
}
window.onload = digitarTitulo;

// Botões e elementos
const btnSim = document.getElementById("btnSim");
const btnNao = document.getElementById("btnNao");
const resultado = document.getElementById("resultado");
const carrossel = document.getElementById("carrossel");
const musica = document.getElementById("musica");

const mensagensNao = [
  "Tem certeza? 🥺",
  "Pensa melhor... 😳",
  "Isso não está certo 🤨",
  "Tenta de novo, vai 😘",
  "Só existe uma resposta 💖"
];

let tentativaNao = 0;
let pararBtnNao = false;

// Função para mostrar mensagem do "Não"
function mostrarMensagemNao() {
  if (pararBtnNao) return;

  if (tentativaNao < mensagensNao.length) {
    resultado.textContent = mensagensNao[tentativaNao];

    // Se for a última mensagem, travar o botão "Não" por 3 segundos
    if (mensagemAtual() === "Só existe uma resposta 💖") {
      pararBtnNao = true;
      setTimeout(() => { pararBtnNao = false; }, 3000);
    }

    tentativaNao++;
  }

  btnNao.style.position = "absolute";
  btnNao.style.top = Math.random() * window.innerHeight * 0.8 + "px";
  btnNao.style.left = Math.random() * window.innerWidth * 0.8 + "px";
}

function mensagemAtual() {
  return mensagensNao[Math.min(tentativaNao, mensagensNao.length - 1)];
}

// Evento hover do botão "Não"
btnNao.addEventListener("mouseover", mostrarMensagemNao);

// Clique no botão "Não"
btnNao.addEventListener("click", () => {
  btnNao.remove();
  resultado.textContent = "Vai namora sim nessa porra e aperta logo o sim! 💘";

  // Mantém o botão "Sim" visível e em posição normal
  btnSim.style.position = "relative";
});

// Clique no botão "Sim"
btnSim.addEventListener("click", () => {
  resultado.textContent = "Você fez a melhor escolha! 💘";
  musica.play();
  fogosTop();
  mostrarCarrossel();
  enviarEmail("Sim");
});

// Carrossel de imagens
function mostrarCarrossel() {
const fotos = ["imagens/download (1).jpg", "imagens/download (2).jpg", "imagens/download.jpg"];
  carrossel.innerHTML = "";
  fotos.forEach((src, idx) => {
    setTimeout(() => {
      const img = document.createElement("img");
      img.src = src;
      carrossel.appendChild(img);
    }, idx * 1500);
  });
}

// Corações
function criarCoracao() {
  const coracao = document.createElement("div");
  coracao.classList.add("coracao");
  coracao.textContent = "❤️";
  coracao.style.left = Math.random() * window.innerWidth + "px";
  coracao.style.top = window.innerHeight + "px";
  document.body.appendChild(coracao);
  setTimeout(() => coracao.remove(), 4000);
}

// Fogos top (realistas)
function fogosTop() {
  // Corações
  for (let i = 0; i < 25; i++) setTimeout(criarCoracao, i * 100);

  // Fogos explosivos
  for (let i = 0; i < 10; i++) {
    setTimeout(() => criarFogoSuper(Math.random() * window.innerWidth, Math.random() * window.innerHeight / 2), i * 300);
  }
}

function criarFogoSuper(x, y) {
  const cores = ["#ff0033", "#ff9900", "#ffff33", "#33ff33", "#33ccff", "#9933ff"];
  const particulas = [];

  for (let i = 0; i < 50; i++) {
    const part = document.createElement("div");
    part.classList.add("fogo-particula");
    part.style.width = "6px";
    part.style.height = "6px";
    part.style.background = cores[Math.floor(Math.random() * cores.length)];
    part.style.left = x + "px";
    part.style.top = y + "px";
    document.body.appendChild(part);

    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 6 + 2;
    const gravity = 0.1;
    particulas.push({el: part, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, alpha:1, g: gravity});
  }

  const anim = setInterval(() => {
    particulas.forEach(p => {
      p.vy += p.g;
      p.el.style.left = parseFloat(p.el.style.left) + p.vx + "px";
      p.el.style.top = parseFloat(p.el.style.top) + p.vy + "px";
      p.alpha -= 0.02;
      p.el.style.opacity = p.alpha;
    });
    if (particulas.every(p => p.alpha <= 0)) {
      particulas.forEach(p => p.el.remove());
      clearInterval(anim);
    }
  }, 30);
}

// Enviar e-mail
function enviarEmail(resposta) {
  emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
    resposta: resposta,
    user_agent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    to_email: "SEU_EMAIL_AQUI"
  })
  .then(() => console.log("Email enviado!"))
  .catch(err => console.error("Erro ao enviar email:", err));
}
