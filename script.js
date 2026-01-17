const WEBHOOK_URL = "YOUR_WEBHOOK_URL";

function addMessage(text, sender) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("message");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  try {
    const res = await fetch("https://n8ndeepak.app.n8n.cloud/webhook/641ad789-3c62-416c-977f-b3a19a32d97e", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.text();
    addMessage(data, "bot");

  } catch (err) {
    addMessage("Error connecting to server", "bot");
  }
}
