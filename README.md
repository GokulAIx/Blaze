# Blaze 🔥

Blaze is an AI-powered Chrome extension that instantly summarizes any webpage and allows you to have a conversation with its content. Get the gist in seconds or dive deep with specific questions, right from your browser toolbar.

![Blaze in Action](placeholder.gif)
![Recording 2025-09-08 at 12 33 06](https://github.com/user-attachments/assets/a823700d-8717-40c2-9b90-9a9d272505f1)


## 🌟 Features

* **One-Click Summarization:** Get a concise and accurate summary of the entire webpage with a single click.
* **Interactive Chat:** Ask specific questions about the content on the page and get answers instantly.
* **Seamless Integration:** Works as a Chrome extension, integrating directly into your browsing workflow.
* **Powered by Advanced AI:** Utilizes state-of-the-art Large Language Models (LLMs) to understand context and provide relevant information.

## 🛠️ Tech Stack

Blaze is built with a modern, powerful stack:

* **Backend:** Python, Flask
* **AI / LLM Orchestration:** LangChain
* **Core LLM:** Google Gemini API
* **Embeddings / RAG:** Hugging Face API
* **Frontend:** JavaScript (as a Chrome Extension)

## 🤔 How It Works

Blaze uses a **Retrieval-Augmented Generation (RAG)** architecture to provide accurate, context-aware answers.

1.  **Content Fetching:** The Chrome extension sends the current page's content securely to your self-hosted backend.
2.  **Indexing (Retrieval):** The backend uses LangChain to process the text, create vector embeddings via a Hugging Face model, and store them in a temporary index.
3.  **Querying (Generation):** When you ask a question in the extension, it's sent to the backend. The system finds the most relevant text chunks and passes them, along with your question, to the Gemini LLM.
4.  **Response:** The Gemini model generates an answer based *only* on the page's context, which is then displayed back to you in the extension.

## 🚀 Getting Started

Blaze uses a separate backend for AI processing and a frontend Chrome extension for the user interface. You'll need to set up both.
---

### Part 1: Setting Up the Backend

The backend server handles all the AI-heavy lifting.

1.  **Fork & Clone the Backend Repository:**
    First, navigate to the backend repository and click "Fork". Then, clone your forked repository to your local machine.

    * **Backend Repository Link:** `[https://github.com/GokulAIx/Blaze-Backend.git]`

    ```sh
    fork the above repository [https://github.com/GokulAIx/Blaze-Backend.git]
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/blaze-backend.git
    cd AI-SUMMARIZER-BACKEND
    ```

2.  **Set Up Environment:**
    ```sh
    # Create and activate a virtual environment
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate

    # Install Python dependencies
    pip install -r requirements.txt
    ```

3.  **Add API Keys:**
    Create a `.env` file inside the `AI-SUMMARIZER-BACKEND` folder. 
    ```
    # AI-SUMMARIZER-BACKEND/.env

    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    HUGGINGFACEHUB_ACCESS_KEY="YOUR_HUGGINGFACEHUB_API_TOKEN"
    ```

4.  **Run the Backend Server:**
    ```sh
     run the **backend.py** file
    ```
    Keep this terminal window open. The backend is now running and ready to receive requests from the extension.

---

### Part 2: Setting Up the Frontend (Chrome Extension)

This repository contains the code for the Chrome extension.

1.  **Fork & Clone This Repository:**
    If you haven't already, fork this repository and clone it to a convenient location, like your Desktop.
    ```sh
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/Blaze.git
    ```

2.  **Load the Extension in Chrome:**
    * Open your Chrome browser and navigate to `chrome://extensions`.
    * Enable the **"Developer mode"** toggle, usually found in the top-right corner.
        
    * Click the **"Load unpacked"** button that appears.
    * In the file selection window, navigate to and select the entire `Blaze` folder that you just cloned.
    * Done! The Blaze extension icon should now appear in your browser's toolbar. Pin it and right click on it and then click on open side panel.

You are all set! Navigate to any article or webpage, right click on the Blaze icon, and start summarizing and chatting.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
