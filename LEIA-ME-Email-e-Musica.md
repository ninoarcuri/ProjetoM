
# Guia rápido: E-mail (EmailJS) e Música

Atualizado: 2025-08-29 00:09 UTC

## 1) Configurar envio de e-mail com EmailJS
1. Crie uma conta em https://www.emailjs.com/ e faça login.
2. No dashboard:
   - **Add new service** → escolha Gmail, Outlook ou outro provedor (ou SMTP).
   - Anote o **SERVICE_ID**.
3. Vá em **Email Templates** → **Create new template**:
   - Adicione variáveis no corpo do e-mail, por exemplo:
     - `resposta` (texto: "Sim" ou "Não (forçado em Sim)")
     - `user_agent` (opcional: navegador de quem respondeu)
     - `timestamp` (opcional: data/hora)
   - Anote o **TEMPLATE_ID**.
4. Em **Account** ou **Integration**, pegue seu **Public Key (USER_ID)**.
5. No seu `index.html`, mantenha:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
   <script>
     (function(){{ emailjs.init("SEU_USER_ID"); }})();
   </script>
   ```
6. No seu `script.js`, ajuste:
   ```js
   function enviarEmail(resposta) {{
     emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {{
       resposta: resposta,
       user_agent: navigator.userAgent,
       timestamp: new Date().toISOString(),
       to_email: "SEU_EMAIL_AQUI"
     }})
     .then(() => console.log("Email enviado!"))
     .catch(err => console.error("Falha no envio de email:", err));
   }}
   ```
7. Publique no GitHub Pages e teste clicando **Sim/Não**. Verifique se o e-mail chega.

> Dica: se usar Gmail, pode ser necessário ajustar permissões/segurança da conta
> ou usar **App Password** quando estiver com 2FA ativado.

---

## 2) Trocar a música
Coloque o arquivo de áudio na raiz do projeto (mesma pasta do `index.html`).

### Opção A — usar os dois formatos (recomendado)
Edite o seu `index.html` para usar múltiplas fontes (o navegador escolhe o que suportar):
```html
<audio id="musica" preload="auto">
  <source src="musica.mp3" type="audio/mpeg">
  <source src="musica.wav" type="audio/wav">
  Seu navegador não suporta áudio HTML5.
</audio>
```
- Se você **ainda não tem o `musica.mp3`**, usei um `musica.wav` pronto (link abaixo).
- Depois, quando quiser, converta `musica.wav` para `musica.mp3` e mantenha os dois.

### Opção B — usar só um formato
Se quiser usar só MP3, basta manter:
```html
<audio id="musica" src="musica.mp3" preload="auto"></audio>
```
e enviar um `musica.mp3` seu.

### Como converter WAV → MP3 (três jeitos)
1. **FFmpeg (linha de comando)**:
   ```bash
   ffmpeg -i musica.wav -codec:a libmp3lame -qscale:a 2 musica.mp3
   ```
2. **Audacity (grátis, GUI)**: abra o WAV e exporte como MP3 (Qualidade alta).
3. **Conversor online**: pesquise por "wav to mp3 online", envie o arquivo e baixe o MP3.

---

## 3) Onde colocar os arquivos
- `index.html`, `style.css`, `script.js` na raiz do projeto.
- Coloque o `musica.wav` e/ou `musica.mp3` **na mesma pasta**.
- Ajuste os caminhos se usar subpastas (ex.: `assets/musica.mp3`).

---

## 4) Dicas extras
- O áudio só toca **após interação do usuário** (clique no "Sim"), por política dos navegadores.
- Para **testar local** com VS Code: instale a extensão *Live Server* e clique em "Open with Live Server".
- Em celulares, evite arquivos de música gigantes (otimize/comprima o MP3).

Boa sorte com o pedido 💖
