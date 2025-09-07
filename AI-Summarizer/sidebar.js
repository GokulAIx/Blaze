
document.getElementById("brandEmblem").addEventListener("click", () => {
    document.getElementById("options").classList.toggle("hidden");
});

document.getElementById("summarizeBtn").addEventListener("click", handleSummarize);
document.getElementById("chatBtn").addEventListener("click", setupChatUI);


let chatState = {
    sessionId: null
};


function resetChatSession() {
    chatState.sessionId = null;
    const chatMessages = document.getElementById("chatMessages");
    if (chatMessages) {
        chatMessages.innerHTML = ''; // Clear the chat window
        addMessage("system", "Chat has been reset. Your next message will analyze the current page.");
    }
}


function setupChatUI() {
    const contentArea = document.getElementById("contentArea");
    contentArea.innerHTML = `
        <div id="chatHeader">
            <button id="resetBtn" title="New Page? Click to Reset">🔄</button>
        </div>
        <div id="chatMessages"></div>
        <div id="chatInputContainer">
            <input type="text" id="chatInput" placeholder="Ask a question...">
            <button id="sendBtn">Send</button>
        </div>
    `;

    document.getElementById("resetBtn").addEventListener("click", resetChatSession);
    document.getElementById("sendBtn").addEventListener("click", sendChatMessage);
    document.getElementById("chatInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendChatMessage();
    });

    sendChatMessage(true); 
}

/**
 * Handles sending a message. Can be a user message or the initial setup message.
 * @param {boolean} isInitialMessage - True if this is the first message to start the chat.
 */
async function sendChatMessage(isInitialMessage = false) {
    const input = document.getElementById("chatInput");
    const question = input.value.trim();


    if (!isInitialMessage && !question) return;

    if (!chatState.sessionId) {
        const pageText = await getPageText();
        if (!pageText) {
            addMessage("system", "Could not read page content.");
            return;
        }

        addMessage("system", "Analyzing page for chat...");
        try {
            const response = await fetch("http://127.0.0.1:5000/index", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ page_content: pageText }),
            });
            const data = await response.json();
            chatState.sessionId = data.session_id;
            document.getElementById("chatMessages").lastChild.remove(); 
            addMessage("system", "Page analyzed! Ask me anything.");

            if (isInitialMessage) return;

        } catch (error) {
            addMessage("system", "Sorry, an error occurred during analysis.");
            return;
        }
    }

    addMessage("user", question);
    input.value = "";
    input.disabled = true;
    addMessage("system", "Thinking...");

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: chatState.sessionId, question: question }),
        });
        const data = await response.json();
        document.getElementById("chatMessages").lastChild.remove();
        addMessage("ai", data.answer);
    } catch (error) {
        document.getElementById("chatMessages").lastChild.remove();
        addMessage("system", "Sorry, an error occurred.");
    } finally {
        input.disabled = false;
        input.focus();
    }
}


async function handleSummarize() {
    const contentArea = document.getElementById("contentArea");
    contentArea.innerHTML = "<p>Getting page content for summary...</p>";
    const pageText = await getPageText();
    if (!pageText) {
        contentArea.innerHTML = "<p>Could not retrieve page content.</p>";
        return;
    }
    contentArea.innerHTML = "<p>Summarizing...</p>";
    try {
        const response = await fetch("http://127.0.0.1:5000/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: pageText }),
        });
        const data = await response.json();
        contentArea.innerHTML = `<div id="chatMessages">${data.summary}</div>`;
    } catch (error) {
        contentArea.innerHTML = "<p>Error creating summary.</p>";
    }
}

/**
 * Gets the page text from the content script.
 * @returns {Promise<string|null>}
 */
function getPageText() {
    return new Promise((resolve) => {
        if (typeof chrome !== "undefined" && chrome.tabs) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (!tabs || tabs.length === 0) { resolve(null); return; }
                chrome.tabs.sendMessage(tabs[0].id, { action: "getPageText" }, (response) => {
                    if (chrome.runtime.lastError) {
                        resolve(null);
                    } else {
                        resolve(response ? response.text : null);
                    }
                });
            });
        } else {
            resolve("This is dummy text for local testing.");
        }
    });
}

/**
 * Adds a message to the chat UI.
 * @param {'user'|'ai'|'system'} sender
 * @param {string} text
 */
function addMessage(sender, text) {
    const chatMessages = document.getElementById("chatMessages");
    if (!chatMessages) return;
    const messageElem = document.createElement("div");
    messageElem.className = `message ${sender}`;
    messageElem.innerText = text;
    chatMessages.appendChild(messageElem);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}