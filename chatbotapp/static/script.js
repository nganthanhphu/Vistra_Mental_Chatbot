document.addEventListener("DOMContentLoaded", () => {
    const CONFIG = {
        API_URL: 'http://127.0.0.1:5000/predict',
        THEME:{
            LIGHT: 'light',
            DARK: 'dark',
            STORAGE_KEY: 'theme',
            ATTRIBUTE: 'data-theme'
        },
        SENDER:{
            USER: 'user',
            BOT: 'bot'
        },
        CSS_CLASSES:{
            LISTENING: 'listening'
        },
        SPEECH: {
            LANG: 'vi-VN',
            PLACEHOLDERS: {
                LISTENING: 'Hãy nói cho tôi nghe đi...',
                DEFAULT: 'Tôi ở đây để giúp bạn...',
                ERROR: 'Bạn có thể nói lại được không?'
            }
        },
        MESSAGES:{
            SERVER_ERROR: 'Error: Could not reach the server.'
        }
    };

    const DOM = {
        inputMessage: document.getElementById("inputMessage"),
        sendBtn: document.getElementById("sendBtn"),
        chatbox: document.getElementById("chatbox"),
        themeToggle: document.getElementById("themeToggle"),
        themeIcon: document.querySelector("#themeToggle i"),
        micButton: document.getElementById("btnRecord")
    };

    function updateThemeIcon(theme) {
        if (theme === CONFIG.THEME.DARK) {
            DOM.themeIcon.classList.remove('fa-moon');
            DOM.themeIcon.classList.add('fa-sun');
        } else {
            DOM.themeIcon.classList.remove('fa-sun');
            DOM.themeIcon.classList.add('fa-moon');
        }
    }
    function initTheme() {
        const savedTheme = localStorage.getItem(CONFIG.THEME.STORAGE_KEY) || CONFIG.THEME.LIGHT;
        document.documentElement.setAttribute(CONFIG.THEME.ATTRIBUTE, savedTheme);
    }


    function toggleTheme(){
        const currentTheme = document.documentElement.getAttribute(CONFIG.THEME.ATTRIBUTE);
        const newTheme = currentTheme === CONFIG.THEME.DARK ? CONFIG.THEME.LIGHT : CONFIG.THEME.DARK;
        document.documentElement.setAttribute(CONFIG.THEME.ATTRIBUTE, newTheme);
        localStorage.setItem(CONFIG.THEME.STORAGE_KEY, newTheme);
        updateThemeIcon(newTheme);
    }

    function appendMessage(text,sender) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", sender);
        const textBubble = document.createElement("span");
        textBubble.classList.add("text-bubble");
        textBubble.textContent = text;

        if (sender === CONFIG.SENDER.BOT) {
            const iconImg = document.createElement("img");
            iconImg.src = "/static/icon.png";
            iconImg.classList.add("bot-chat-logo");
            iconImg.alt = "MentalHealth Chatbot Logo";
            msgDiv.appendChild(iconImg);
        }
        msgDiv.appendChild(textBubble);
        DOM.chatbox.appendChild(msgDiv);
        DOM.chatbox.scrollTop = DOM.chatbox.scrollHeight;
    }

    async function sendMessage() {
        const message = DOM.inputMessage.value.trim();
        if (!message) return;
        
        appendMessage(message, CONFIG.SENDER.USER);
        DOM.inputMessage.value = '';
        DOM.sendBtn.disabled = true;
        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: CONFIG.SENDER.USER, content: message }),
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok (status: ${response.status})`);
            }

            const data = await response.json();
            appendMessage(data.content, CONFIG.SENDER.BOT);

        } catch (error) {
            console.error('Fetch Error:', error);
            appendMessage(CONFIG.MESSAGES.SERVER_ERROR, CONFIG.SENDER.BOT);
        } finally {
            DOM.sendBtn.disabled = false;
            DOM.inputMessage.focus();
        }
    }

    function setupSpeechRecognition(){
        const SpeechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition){
            DOM.micButton.style.display = "none";
            console.warn("Speech Recognition API không được hỗ trợ trên trình duyệt này.");
            return;
        }

        const recognition=new SpeechRecognition();
        recognition.lang=CONFIG.SPEECH.LANG;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            DOM.micButton.classList.add(CONFIG.CSS_CLASSES.LISTENING);
            DOM.inputMessage.placeholder=CONFIG.SPEECH.PLACEHOLDERS.LISTENING;
        };

        recognition.onend = () => {
            DOM.micButton.classList.remove(CONFIG.CSS_CLASSES.LISTENING);
            DOM.inputMessage.placeholder = CONFIG.SPEECH.PLACEHOLDERS.DEFAULT;
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            DOM.inputMessage.value = transcript;
        };

        recognition.onerror = (event) => {
            console.error('Speech Recognition Error:', event.error);
            DOM.micButton.classList.remove(CONFIG.CSS_CLASSES.LISTENING);
            DOM.inputMessage.placeholder = CONFIG.SPEECH.PLACEHOLDERS.ERROR;
        };

        DOM.micButton.addEventListener('click', () => {
            if (!DOM.micButton.classList.contains(CONFIG.CSS_CLASSES.LISTENING)) {
                try {
                    recognition.start();
                } catch (e) {
                    console.error("Lỗi khi bắt đầu nhận diện giọng nói:", e);
                }
            } else {
                recognition.stop();
            }
        });
    }
    function setupAll() {
        DOM.themeToggle.addEventListener('click',toggleTheme);
        DOM.sendBtn.addEventListener("click",sendMessage);
        DOM.micButton.addEventListener('click',() => {});
        DOM.inputMessage.addEventListener("keypress",(e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
            }
        });
        initTheme();
        setupSpeechRecognition();
    }
    setupAll();
});