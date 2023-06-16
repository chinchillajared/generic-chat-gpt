const chatBody = document.getElementById("chat-container");
const message = document.getElementById("message");
const send = document.getElementById("send");

const apiKey = 'Your_API_key';
let messages = [];

send.addEventListener("click", () => {

    if (message.value === "") {
        alert("Please enter a message");
        return;
    }

    chat(message.value);
    message.value = "";
});


//----------------------------------- BOT 2 (using fetch) -----------------------------------

async function chat(message){ 

    renderUserMessage(message);
    
    messages.push({ role: 'user', content: message });
      
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    
      body: JSON.stringify({
        
        model: 'gpt-3.5-turbo',
        messages: messages,
    
      }),
    });
    
        const data = await response.json()

        let botMessage = data.choices[0].message.content;
        messages.push({ role: 'system', content: botMessage });
        
        renderBotMessage(botMessage);
    
    }


    // ------------------------------ Adding the messages to the HTML chat ------------------------------

    function renderUserMessage(message) {
        const userMessage = document.createElement("div");
        userMessage.innerText = message;
        userMessage.classList.add("user-message");
        chatBody.appendChild(userMessage);
    }

    function renderBotMessage(message) {
        const botMessage = document.createElement("div");
        botMessage.innerText = message;
        botMessage.classList.add("bot-message");
        chatBody.appendChild(botMessage);
    }


    
